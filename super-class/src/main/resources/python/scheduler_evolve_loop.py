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
from constraint import *
import numpy as np
import pandas as pd
from multiprocessing import Pool,cpu_count
import pickle
from collections import Counter
#每个班,人数>=4
#每人一天只上一个班?

class Planner():
    def __init__(self,
                 # period=15,#设置为individual 周期,
                 n_shift=4,
                 n_people=32,
                 loop=[1,2,3,4,0,0,4,3,2,1,0,1,2,0,3,4,0,0],
                 workload_constraint=[2, 3, 4, 5],  # 若为None,用workload,shape=(period,n_shift)or(n_shift,)or(scalar)
                 hard_constraint=[(0, 3,(0,)), (10, 6,(0,)),(1, 5, (1,2)),(8, 7, (3,4))],  # (人,天,班次选择)第几个人第几天可以选择的班次
                 steps=int(1e2),  #搜索次数
                 pop_size=int(1e4),
                 cross_rate=0.1,
                 mutate_rate=0.02,
                 ):
        self.period=len(loop)
        self.loop=loop
        self.n_people=n_people
        self.n_shift=n_shift

        self.hard_constraint=hard_constraint

        assert isinstance(workload_constraint,(np.ndarray,int,list)),'Wrong constraint data type.'
        workload_constraint=np.array(workload_constraint)

        if workload_constraint.ndim==0:
            self.workload_constraint=np.ones((self.period,n_shift),dtype=int)*workload_constraint
        elif workload_constraint.shape==(n_shift,):
            self.workload_constraint=workload_constraint[np.newaxis,:].repeat(self.period,axis=0)
        elif workload_constraint.shape==(self.period,n_shift):
            self.workload_constraint=workload_constraint
        else:
            raise ValueError('wrong shape.')

        self.get_critical_people()
        self.analysis_constraint()
        self.individual_domain=self._individual_domain()


        self.steps=steps
        self.pop_size=pop_size
        self.cross_rate=cross_rate
        self.mutate_rate=mutate_rate
        self.pop=np.array([[np.random.choice(self.roll_step[k]) for k in range(self.n_people)] for _ in range(pop_size)])



    def _show_solution(self,solution,first_idx=0):
        index=['P'+str(i+first_idx) for i in range(self.n_people-self.add_people)]+['AP'+str(i+1) for i in range(self.n_people-self.add_people,self.n_people)]

        _trans = lambda x: ''.join(['W' + str(i+first_idx) for i, v in enumerate(x) if v]) if any(x) else 'R'
        solution=np.array(map(_trans,solution.reshape(-1,self.n_shift))).reshape(self.n_people,-1)

        colunms=['D'+str(i+first_idx) for i in range(self.period)]
        df = pd.DataFrame(solution,index=index,columns=colunms)
        df.to_csv('sol.csv')
        print(df.to_string())

    def evaluate_solution(self,solution):
        #loop,hard_constraint 必然满足
        negative=np.where(solution.sum(axis=0)<self.workload_constraint)
        for i in zip(*negative):
            print('Day %d work %d not satisfied.'%i)
        return zip(*negative)





    def get_fitness(self):
        _sol=self.individual_domain[self.pop.ravel()].reshape(self.pop_size,self.n_people,-1)
        # fitness = (_sol.sum(axis=1)>=self.workload_constraint.ravel()).sum(axis=1)
        # fitness_adjust= 1/(self.n_shift*self.period-fitness+1)

        fitness = np.maximum(self.workload_constraint.ravel()-_sol.sum(axis=1),0).sum(axis=1)
        fitness_adjust= 1/(fitness+1)
        return fitness_adjust

    def select(self, fitness):
        idx = np.random.choice(np.arange(self.pop_size), size=self.pop_size, replace=True, p=fitness / fitness.sum())
        return self.pop[idx]

    def crossover(self, parent, pop):
        if np.random.rand() < self.cross_rate:
            i_ = np.random.randint(0, self.pop_size, size=1)[0]                        # select another individual from pop
            cross_points = np.random.randint(0, 2, self.n_people).astype(np.bool)   # choose crossover points
            parent=np.where(cross_points,parent,pop[i_])
        return parent

    def mutate(self,child):
        for point in range(self.n_people):
            if np.random.rand() < self.mutate_rate:
                child[point]=np.random.choice(self.roll_step[point])
        return child

    def evolve(self,fitness):
        pop = self.select(fitness)
        pop_copy = pop.copy()
        for parent in pop:  # for every parent
            child = self.crossover(parent, pop_copy)
            child = self.mutate(child)
            parent[:] = child
        self.pop = pop


    def get_solution(self):
        for step in range(self.steps):
            fitness=self.get_fitness()
            if fitness.max()==1:
                print('Solution Found at step:%d'%step)
                final_sol=self.individual_domain[self.pop[np.argmax(fitness)]].reshape(self.n_people, self.period,-1)
                self._show_solution(final_sol)
                return final_sol
            if step%50==0:
                print('Gen:', step, '| best fit: %.2f' % fitness.max(),)
                # best_idx = np.argmax(fitness)
                # best_sol= self.individual_domain[self.pop[best_idx]].reshape(self.n_people, -1)
                # self._show_solution(best_sol)
            self.evolve(fitness)
        fitness = self.get_fitness()
        final_sol=self.individual_domain[self.pop[np.argmax(fitness)]].reshape(self.n_people,self.period, -1)
        print('Solution not Found. The best solution(fitness=%.2f):\n'%fitness.max())

        self._show_solution(final_sol)
        return final_sol



    def get_critical_people(self):
        distribute=Counter(self.loop)
        distribute=[distribute[k+1] for k in range(self.n_shift)]
        critical_people=int(np.ceil((self.workload_constraint.sum(0)/distribute).max()))
        critical_people=max(critical_people,self.workload_constraint.max())
        self.critical_people=critical_people
        self.add_people=max(critical_people-self.n_people,0)
        if self.n_people<self.critical_people:
            print('too few people!(critical people %d)' % self.critical_people)
            self.n_people=self.critical_people


    def analysis_constraint(self):
        _constraint={}

        for x in self.hard_constraint:
            try:
                _constraint[x[0]].append((x[1],x[2]))
            except:
                _constraint[x[0]]=[(x[1],x[2])]

        roll_step={}
        for k,v in _constraint.items():
            roll_step[k]=[shift for shift in range(self.period) if all([np.roll(self.loop,shift)[x[0]] in x[1] for x in v])]
            if len(roll_step[k])==0:
                raise ValueError('constraint contradictory.')

        for k in range(self.n_people):
            if k not in roll_step:
                roll_step[k]=range(self.period)

        self.roll_step=roll_step


    def _individual_domain(self):
        _trans_func1=lambda x: np.eye(self.n_shift+1,dtype=int)[x,1:]
        _loop=np.apply_along_axis(_trans_func1,0,self.loop)
        domain = np.array([np.roll(_loop, shift=s, axis=0).ravel() for s in range(self.period)])
        return domain




def run_onetime():
    np.random.seed()
    tst=Planner()
    x=tst.get_solution()
    tst.evaluate_solution(x)
    print x



if __name__ == '__main__':
    n_cpu=cpu_count()*2
    p=Pool(n_cpu)
    for _ in range(n_cpu):
        p.apply_async(run_onetime,callback=lambda arg:p.terminate())
    p.close()
    p.join()
