#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""

@file    : scheduler.py
@Version : 1.0
@Date    : 2017/9/1 下午5:04
@Author  : Kmeans (shenkaiming@persagy.com)
@Link    : http://www.sagacloud.cn

"""


# from matplotlib.font_manager import FontProperties
# font_set = FontProperties(fname=r"/Users/chenkaiming/anaconda/lib/python2.7/site-packages/matplotlib/mpl-data/fonts/ttf/Microsoft YaHei.ttf")
from __future__ import division
import numpy as np
import pandas as pd
import itertools
import copy
from multiprocessing import Pool,cpu_count
import pickle
#每个班,人数>=4
#每人一天只上一个班?


class Planner():
    def __init__(self,
                 period=28,#设置为individual 周期,
                 n_shift=4,
                 n_people=23,

                 workload_constraint=[2,3,4,5],#若为None,用workload,shape=(period,n_shift)or(n_shift,)or(scalar)
                 restdays_constraint=8,#若为None,用restdays,shape=(n_people,)or(scalar)(如果人数不够,额外补充的人员restdays=其他人的平均值)
                 hard_constraint0=[(0,3),(10,20)],#(人,天)第几个人第几天=0(indexed from 0)
                 hard_constraint1=[(1,5,1),(8,21,3)],#(人,天,班)第几个人第几天第几个班次=1(indexed from 0)(可以deduce到hard_constraint0)

                 order_constraint={0:(0,1,2,3,4),1:(0,1,2,3,4),2:(1,2,3,4),3:(0,1,2,3,4),4:(0,)},#字典格式,x:[...]表示x班次后面可以安排的班次列表,必须把所有可能全部列出
                 fillrest=True,
                 ):


        self.period=period
        self.n_shift=n_shift
        self.n_people=n_people
        self.n_work=period*n_shift
        self.add_people=0#需要额外增加的人数
        self.fillrest=fillrest

        assert isinstance(workload_constraint,(np.ndarray,int,list)),'Wrong constraint data type.'
        assert isinstance(restdays_constraint,(np.ndarray,int,list)),'Wrong constraint data type.'
        workload_constraint=np.array(workload_constraint)
        restdays_constraint=np.array(restdays_constraint)

        if workload_constraint.ndim==0:
            self.workload_constraint=np.ones((period,n_shift),dtype=int)*workload_constraint
        elif workload_constraint.shape==(n_shift,):
            self.workload_constraint=workload_constraint[np.newaxis,:].repeat(period,axis=0)
        elif workload_constraint.shape==(period,n_shift):
            self.workload_constraint=workload_constraint
        else:
            raise ValueError('wrong shape.')

        if restdays_constraint.ndim==0:
            self.restdays_constraint=np.ones((n_people,),dtype=int)*restdays_constraint
        elif restdays_constraint.shape==(n_people,):
            self.restdays_constraint=restdays_constraint
        else:
            raise ValueError('wrong shape.')


        self.hard_constraint0={tuple(x) for x in hard_constraint0}
        self.hard_constraint1={tuple(x) for x in hard_constraint1}
        assert len(self.hard_constraint0.intersection({x[:2] for x in self.hard_constraint1}))==0,'constraint contradictory.'
        self._simplify_constraint()

        self.order_constraint=order_constraint
        self.get_orderdict()


        self.critical_people=self.get_critical_people()



    def _show_solution(self,solution=None,first_idx=0):
        if solution is None:solution=self.pre_sol
        index=['P'+str(i+first_idx) for i in range(self.n_people-self.add_people)]+['AP'+str(i+1) for i in range(self.n_people-self.add_people,self.n_people)]

        _trans = lambda x: ''.join(['W' + str(i+first_idx) for i, v in enumerate(x) if v]) if any(x) else 'R'
        solution=np.array(map(_trans,solution.reshape(-1,self.n_shift))).reshape(self.n_people,-1)

        colunms=['D'+str(i+first_idx) for i in range(self.period)]
        df = pd.DataFrame(solution,index=index,columns=colunms)
        df.to_csv('sol.csv')
        print(df.to_string())

    def _initialize_solution(self,method='dispersion',shuffle=True):#dispersion or centralization
        self.pre_sol = np.zeros((self.n_people,self.period,self.n_shift),dtype=int)

        # 班次不平均
        # for s in range(self.n_shift):
        #     self.pre_sol[s*self.workload:(s+1)*self.workload,:,s]=1

        #班次平均
        for _d in range(self.period):
            _option = np.concatenate([np.roll(np.append(1, [0] * (self.n_shift - 1)).astype(int), i) for i in
                                   range(self.n_shift)] * (1+self.workload_constraint[_d].max())).reshape(-1, self.n_shift)


            _idx=sorted(sum([[(k+_d)%self.n_shift+i*self.n_shift for i in range(l)] for k,l in enumerate(self.workload_constraint[_d])],[]))
            self.pre_sol[:len(_idx),_d,:]=np.roll(_option,_d,axis=0)[_idx]


        if shuffle:
            #随机交换人
            np.random.shuffle(self.pre_sol[:self.critical_people,:,:])

            #随机交换日期
            _key=lambda x:x[1]
            _list=[tuple(_x) for _x in self.workload_constraint]
            _group=[[_v[0] for _v in v] for k,v in  itertools.groupby(sorted(enumerate(_list),key=_key),key=_key)]
            _group_origin=copy.deepcopy(_group)
            [np.random.shuffle(g) for g in _group]
            for g_origin,g_random in zip(_group_origin,_group):
                self.pre_sol[:,g_origin,:]=self.pre_sol[:,g_random,:]



            # _date=range(self.period)
            # np.random.shuffle(_date)
            # self.pre_sol=self.pre_sol[:,_date,:]



    def get_solution(self):
        self._initialize_solution()
        self.adjust_solution()
        return self.pre_sol


    def adjust_solution(self):
        #调班(调休)
        adjust_idx=(self.gap_restdays<0).nonzero()[0]
        for p in adjust_idx:
            _workdays=self.pre_sol[p].any(axis=-1).nonzero()[0]
            _gap=self.period-len(_workdays)-self.restdays_constraint[p]
            for _d in _workdays:
                over_people=((self.gap_restdays[:self.critical_people]>0)&(~(self.pre_sol[:self.critical_people,_d,:].any(axis=-1)))).nonzero()[0]
                if len(over_people):
                    # switch_p=np.random.choice(over_people)
                    switch_p = over_people[0]
                    self.pre_sol[switch_p,_d]=self.pre_sol[p,_d]
                    self.pre_sol[p,_d]=0
                    _gap += 1
                    if _gap==0: break
            if _gap<0:print('need more people.')#如果猜想正确,不会发生



        #约束0(交换两次,一行一列) 尽可能换同样的班次(保证平均分布,不行就算了)
        for _p,_d in self.hard_constraint0:
            if self.pre_sol[_p,_d].any():
                _restdays=(~self.pre_sol[_p].any(axis=-1)).nonzero()[0]#_p休息的日期
                _restpeople=(~self.pre_sol[:,_d].any(axis=-1)).nonzero()[0]#_d天休息的人
                good_change=None
                _change=None
                for _d1 in _restdays:
                    if good_change!=None:
                        break
                    if (_p,_d1) in self.hard_constraint0:
                        continue
                    for _p1 in _restpeople:
                        if (_p1,_d) in self.hard_constraint0:
                            continue
                        if ~self.pre_sol[_p1,_d1].any():
                            continue
                        if _change==None:
                            _change=(_p1,_d1)
                        if (self.pre_sol[_p1,_d1]==self.pre_sol[_p,_d]).all():
                            good_change=(_p1,_d1)
                            break
                if (good_change==None)and(_change==None):
                    print('Failed in (%d,%d).'%(_p,_d))#如果猜想正确,不会发生
                else:
                    _final_choose=_change if good_change==None else good_change
                    self.exchange_work((_p,_final_choose[0]),(_d,_final_choose[1]))

        for x in self.hard_constraint1:
            self.pre_sol[x]=1



        self.adjust_order(_n_people=self.critical_people,method='backward',)
        self.adjust_order(_n_people=self.critical_people,method='both',)
        for _people in range(self.critical_people+1,self.n_people+1):
            self.adjust_order(_n_people=_people, method='both', )

        self.adjust_order(_n_people=self.n_people,method='both',)
        self.fill_restday()
        self.adjust_order(_n_people=self.n_people,method='both',)


    def adjust_order(self,_n_people,method='backward',):#or both
        for _p,_d in zip(*[_x.ravel() for _x in np.meshgrid(range(_n_people),range(self.period))]):
            _ddlist=range(self.period)
            _ddlist.remove(_d)
            if _d>0: _ddlist.remove(_d-1)
            if not self.replacable(self.pre_sol[_p,_d],_p,_d,method=method)and((_p,_d) not in self.hard_constraint0):
                good_change=None
                _change=None
                _expeople=[_tp for _tp in range(_n_people) if
                           (self.replacable(self.pre_sol[_tp,_d],_p,_d,method=method))and
                           (self.replacable(self.pre_sol[_p,_d],_tp,_d,method=method))and
                           ((_tp,_d) not in self.hard_constraint0)]

                for _pp in _expeople:
                    if (self.pre_sol[_p,_d].any())and(self.pre_sol[_pp,_d].any())and(_change==None):
                        _change=(_pp,_d)
                    if (not self.pre_sol[_p, _d].any())and((~self.pre_sol[_p].any(axis=-1)).sum()>self.restdays_constraint[_p])and(_change == None):
                        _change=(_pp,_d)
                    if (not self.pre_sol[_pp, _d].any())and((~self.pre_sol[_pp].any(axis=-1)).sum()>self.restdays_constraint[_pp])and(_change == None):
                        _change=(_pp,_d)


                    if good_change!=None:
                        break
                    for _dd in _ddlist:
                        if ((_p,_dd) in self.hard_constraint0)or((_pp,_dd) in self.hard_constraint0):#hard constraint 跳过
                            continue

                        if method=='backward':
                            if (not (self.replacable(self.pre_sol[_p, _dd], _pp, _dd)and
                                         (self.replacable(self.pre_sol[_pp, _dd], _p, _dd))))and(_dd<_d):
                                continue
                        else:
                            if (not (self.replacable(self.pre_sol[_p, _dd], _pp, _dd) and
                                         (self.replacable(self.pre_sol[_pp, _dd], _p, _dd)))):
                                continue
                        if ((self.pre_sol[_p, _d] == self.pre_sol[_pp, _dd]).all()) and \
                                ((self.pre_sol[_pp, _d] == self.pre_sol[_p, _dd]).all()):
                            good_change = (_pp, _dd)
                            break
                        if _change!=None:
                            continue
                        if (not self.pre_sol[_p,_d].any())and(not self.pre_sol[_pp,_dd].any())and(self.pre_sol[_p,_dd].any())and(_change==None):
                            _change=(_pp,_dd)
                        if (not self.pre_sol[_pp, _d].any()) and (not self.pre_sol[_p, _dd].any()) and (self.pre_sol[_pp, _dd].any()) and (_change == None):
                            _change = (_pp, _dd)
                _final_choose = _change if good_change == None else good_change
                if _final_choose==None:
                    continue
                # self._show_solution()
                # print (_p,_d),_final_choose

                if _final_choose[1]==_d:
                    self.exchange_work((_p,_final_choose[0]),(_d,))
                else:
                    self.exchange_work((_p,_final_choose[0]),(_d,_final_choose[1]))



    def exchange_work(self,p,d):#两人同时换两天工作(交换当天的工作)
        for _d in d:
            _switch=self.pre_sol[p[0],_d].copy()
            self.pre_sol[p[0],_d]=self.pre_sol[p[1],_d]
            self.pre_sol[p[1],_d]=_switch

    def fill_restday(self):
        opt=np.eye(self.n_shift,dtype=int)
        for _p,_d in zip(*[_x.ravel() for _x in np.meshgrid(range(self.n_people),range(self.period))]):
            if ((_p, _d) not in self.hard_constraint0)\
                and(self.pre_sol[_p,_d].any())\
                and(not self.replacable(self.pre_sol[_p, _d], _p, _d)):
                _opt=[x for x in opt if self.replacable(x,_p,_d)]
                if len(_opt)==0:
                    continue
                for _pp in range(self.n_people):
                    if ((_pp, _d) not in self.hard_constraint0) \
                            and (~self.pre_sol[_pp, _d].any()) \
                            and ((~self.pre_sol[_pp].any(-1)).sum() > self.restdays_constraint[_pp]) \
                            and (self.replacable(self.pre_sol[_p, _d], _pp, _d)):
                        self.pre_sol[_pp,_d]=self.pre_sol[_p,_d]
                        self.pre_sol[_p,_d]=_opt[0]
                        break


        if self.fillrest:
            for _p in range(self.n_people):
                for _d in range(self.period):

                    if ((_p, _d) not in self.hard_constraint0)\
                            and(~self.pre_sol[_p,_d].any())\
                            and((~self.pre_sol[_p].any(-1)).sum()>self.restdays_constraint[_p])\
                            and(not self.replacable(self.pre_sol[_p,_d],_p,_d,method='backward')):
                        np.random.shuffle(opt)
                        for x in opt:
                            if self.replacable(x,_p,_d,method='backward'):
                                self.pre_sol[_p,_d]=x
                                break
                self.adjust_order(_n_people=self.n_people, method='both', )

    @property
    def gap_restdays(self):
        return self.period-self.pre_sol.any(axis=-1).sum(axis=-1)-self.restdays_constraint


    def _simplify_constraint(self):
        _add_rest=set()
        for x in self.hard_constraint1:
            self.workload_constraint[x[1],x[2]] -= 1
            _add_rest.add((x[0],x[1]))
            self.hard_constraint0.add(x[:2])
        for _add_x in _add_rest:
            self.restdays_constraint[_add_x[0]] += 1
        self.workload_constraint=np.maximum(self.workload_constraint,0)


        restdays_clone=self.restdays_constraint.copy()
        for _p,_ in self.hard_constraint0:
            restdays_clone[_p] -= 1
        self.restdays_constraint -= np.where(restdays_clone<0,restdays_clone,0)

    def get_orderdict(self):
        self.forward_dict={}
        for i in range(2**self.n_shift):
            k=tuple([int(x) for x in bin(i).replace('0b','').zfill(self.n_shift)])
            _v=set.intersection(*[set(self.order_constraint[i+1]) for i,_w in enumerate(k) if _w]) if any(k) else set(self.order_constraint[0])
            if len(_v):
                v = []
                if 0 in _v:
                    v.append(tuple([0]*self.n_shift))
                    _v.discard(0)
                _comb=sum([tuple(itertools.combinations(_v,n+1)) for n in range(len(_v))],())
                [v.append(self._translate(x)) for x in _comb]
                self.forward_dict[k]=tuple(v)

        self.backward_dict={}
        for k,v in self.forward_dict.items():
            for _v in v:
                try:
                    self.backward_dict[_v].add(k)
                except:
                    self.backward_dict[_v]={k}
        self.backward_dict={k:tuple(v) for k,v in self.backward_dict.items()}

    def check_orderdict(self,p,d):#检查p,d 和 p,d+1顺序是否正确
        if tuple(self.pre_sol[p,d]) not in self.forward_dict:
            raise ValueError('constraint contradictory.')
        return tuple(self.pre_sol[p,d+1]) in self.forward_dict[tuple(self.pre_sol[p,d])]

    def replacable(self,x,p,d,method='both'):
        x = tuple(x)
        if method=='both':
            if d==0:
                return tuple(self.pre_sol[p,d+1]) in self.forward_dict[x]
            if d==self.period-1:
                return tuple(self.pre_sol[p,d-1]) in self.backward_dict[x]
            return (tuple(self.pre_sol[p,d+1]) in self.forward_dict[x])and(tuple(self.pre_sol[p,d-1]) in self.backward_dict[x])
        if method=='forward':
            if d==self.period-1:
                return tuple(self.pre_sol[p,d-1]) in self.backward_dict[x]
            return tuple(self.pre_sol[p, d + 1]) in self.forward_dict[x]
        if method=='backward':
            if d==0:
                return tuple(self.pre_sol[p,d+1]) in self.forward_dict[x]
            return tuple(self.pre_sol[p, d - 1]) in self.backward_dict[x]


    def get_critical_people(self):
        _demand=self.workload_constraint.sum()
        _supply=(self.period-self.restdays_constraint).cumsum()
        if (_supply>_demand).any():
            _critical_people=(_supply > _demand).nonzero()[0][0] + 1
            if _critical_people<self.n_people:
                print('too many people!(critical people %d)' % _critical_people)
            return _critical_people
        else:
            self.mean_restdays=np.floor(self.restdays_constraint.mean())
            add_people = int(np.ceil((_demand-_supply[-1])/(self.period-self.mean_restdays)))
            self.n_people += add_people
            self.add_people=add_people
            self.restdays_constraint=np.append(self.restdays_constraint,[self.mean_restdays]*add_people).astype(int)
            print('too few people!(critical people %d)' % self.n_people)
            return self.n_people
    @property
    def badpoint(self):
        _count=0
        for p in range(self.n_people):
            for d in range(self.period):
                if not self.replacable(self.pre_sol[p,d],p,d):
                    _count+=1
        return _count


    @property
    def usepeople(self):
        return (self.pre_sol.any(axis=(1,2))).sum()


    def expand_one_person(self):
        self.add_people += 1
        self.n_people += 1
        self.pre_sol = np.concatenate([self.pre_sol,np.zeros((1,self.period,self.n_shift),dtype=int)])
        self.restdays_constraint = np.append(self.restdays_constraint, [self.mean_restdays]).astype(int)

    def _translate(self,x):
        y=np.zeros(self.n_shift,dtype=int)
        for i in x:
            y[i-1]=1
        return tuple(y)





def random_search(period=28,
                  n_shift=4,
                  n_people=23,
                  workload_constraint=[2,3,4,5],
                  restdays_constraint=8,
                  hard_constraint0=[(0,3),(10,20)],
                  hard_constraint1=[(1,5,1),(8,21,3)],
                  order_constraint={0:(0,1,2,3,4),1:(0,1,2,3,4),2:(1,2,3,4),3:(0,1,2,3,4),4:(0,)},
                  steps=100,
                  printdf=True,
                  fillrest=True,
                  ):
    tst=Planner(period=period,
                n_shift=n_shift,
                n_people=n_people,
                workload_constraint=workload_constraint,
                restdays_constraint=restdays_constraint,
                hard_constraint0=hard_constraint0,
                hard_constraint1=hard_constraint1,
                order_constraint=order_constraint,
                fillrest=fillrest,
                )
    bad_point=np.inf
    use_people=np.inf
    for _ in range(steps):
        tst.get_solution()
        if tst.badpoint<bad_point:
            solution=tst.pre_sol
            bad_point=tst.badpoint
            use_people=tst.usepeople
        if (tst.badpoint==bad_point)and(tst.usepeople<use_people):
            solution=tst.pre_sol
            use_people=tst.usepeople
        if (tst.badpoint==0):#and(tst.usepeople==tst.critical_people):
            break
    if printdf: tst._show_solution(solution)
    return solution,use_people,bad_point


def main_search(period=28,
                n_shift=4,
                n_people=23,
                workload_constraint=[2,3,4,5],
                restdays_constraint=8,
                hard_constraint0=[(0,3),(10,20)],
                hard_constraint1=[(1,5,1),(1,5,2),(8,21,3)],
                order_constraint={0:(0,1,2,3,4),1:(0,1,2,3,4),2:(1,2,3,4),3:(0,1,2,3,4),4:(0,)},
                leader_set=[0,1,2,3,4,5],
                leader_workload_constraint=[2, 0, 1, 1],
                steps=100,
                ):
    n_leader=len(leader_set)
    leader_hard_constraint0=[x for x in hard_constraint0 if x[0] in leader_set]
    leader_hard_constraint1=[x for x in hard_constraint1 if x[0] in leader_set]

    restdays_constraint = np.array(restdays_constraint)
    if restdays_constraint.ndim == 0:
        restdays_constraint = np.ones((n_people,), dtype=int) * restdays_constraint
    elif restdays_constraint.shape == (n_people,):
         restdays_constraint = restdays_constraint
    else:
        raise ValueError('wrong shape.')

    leader_restdays_constraint=restdays_constraint[leader_set]

    leader_solution,leader_usepeople,leader_badpoints=random_search(period=period,
                                      n_shift=n_shift,
                                      n_people=n_leader,
                                      workload_constraint=leader_workload_constraint,
                                      restdays_constraint=leader_restdays_constraint,
                                      hard_constraint0=leader_hard_constraint0,
                                      hard_constraint1=leader_hard_constraint1,
                                      order_constraint=order_constraint,
                                      steps=min(10,steps),
                                      printdf=True,
                                      fillrest=False,
                                      )
    if (leader_usepeople>n_leader):#or(leader_badpoints>0):
        raise ValueError('need more leaders.')
    generated_constraint=zip(*leader_solution.nonzero())
    generated_constraint=[(leader_set[x[0]],x[1],x[2]) for x in generated_constraint]
    hard_constraint1 += generated_constraint
    solution,usepeople,badpoints=random_search(period=period,
                                               n_shift=n_shift,
                                               n_people=n_people,
                                               workload_constraint=workload_constraint,
                                               restdays_constraint=restdays_constraint,
                                               hard_constraint0=hard_constraint0,
                                               hard_constraint1=hard_constraint1,
                                               order_constraint=order_constraint,
                                               steps=steps,
                                               fillrest=True,
                                               )
    print('used people: %d'%usepeople)
    print('bad points: %d'%badpoints)



    #evaluation

    _workload_constraint = np.array(workload_constraint)
    _leader_workload_constraint = np.array(leader_workload_constraint)



    if _workload_constraint.shape == (n_shift,):
        _workload_constraint = _workload_constraint[np.newaxis, :].repeat(period, axis=0)

    if _leader_workload_constraint.shape == (n_shift,):
        _leader_workload_constraint = _leader_workload_constraint[np.newaxis, :].repeat(period, axis=0)

    evaluation={}
    evaluation['workload'] = (solution.sum(axis=0)<_workload_constraint).nonzero()
    evaluation['restday'] = ((~(solution.any(axis=-1))).sum(axis=-1)<restdays_constraint).nonzero()
    evaluation['leader_workload']=(solution[leader_set,:,:].sum(axis=0)<_leader_workload_constraint).nonzero()
    evaluation['order']=[]
    for i in range(n_people):
        for j in range(period-1):
            w = solution[i, j]
            w_ = solution[i, j + 1]
            if w.any():
                for l in w.nonzero()[0]:
                    if (not w_.any()) and (0 not in order_constraint[l+1]):
                        evaluation['order'].append([i, j])
                        break
                    else:
                        if not set(w_.nonzero()[0] + 1).issubset(order_constraint[l+1]):
                            evaluation['order'].append([i, j])
                            break
            else:
                if (not w_.any())and(0 not in order_constraint[0]):
                    evaluation['order'].append([i,j])
                else:
                    if not set(w_.nonzero()[0]+1).issubset(order_constraint[0]):
                        evaluation['order'].append([i, j])

    return solution,evaluation



if __name__ == '__main__':

    steps=100
    period = 28  # 设置为individual 周期,
    n_shift = 4
    n_people = 20

    workload_constraint = [2, 3, 4, 5] # 若为None,用workload,shape=(period,n_shift)or(n_shift,)or(scalar)
    restdays_constraint = 8  # 若为None,用restdays,shape=(n_people,)or(scalar)(如果人数不够,额外补充的人员restdays=其他人的平均值)
    hard_constraint0 = [(0, 3), (10, 20)] # (人,天)第几个人第几天=0(indexed from 0)
    hard_constraint1 = [(1, 5, 1),(1, 5, 0),(8, 21, 3),(6,12,3),(13,1,1),(17,25,2)] # (人,天,班)第几个人第几天第几个班次=1(indexed from 0)
    order_constraint = {0: (1, 2, 3, 4), 1: (0, 2, 3, 4), 2: (1, 3, 4), 3: (0, 1, 2, 4), 4: (0,)}
    leader_set = [0, 1, 2,3, 4,5,6]
    leader_workload_constraint = [1, 1, 1, 1]

    solution,evaluation=\
        main_search(
                    period=period,
                    n_shift=n_shift,
                    n_people=n_people,
                    workload_constraint=workload_constraint,
                    restdays_constraint=restdays_constraint,
                    hard_constraint0=hard_constraint0,
                    hard_constraint1=hard_constraint1,
                    order_constraint=order_constraint,
                    leader_set=leader_set,
                    leader_workload_constraint=\
                        leader_workload_constraint,
                    steps=steps,
                    )



