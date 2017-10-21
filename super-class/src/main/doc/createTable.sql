--建库
CREATE USER 'super_class'@'%' IDENTIFIED BY 'saga123'; 
CREATE DATABASE super_class CHARACTER SET utf8 COLLATE utf8_bin; 
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, INDEX ON super_class.* TO 'super_class'@'%' IDENTIFIED BY 'saga123'; 
flush privileges; 


--建表
create table t_user(
	user_id	varchar(32) NOT NULL COMMENT '用户id',
    nickname	varchar(30) COMMENT '昵称',
    phone_num	varchar(20) NOT NULL COMMENT '手机号',
    head_portrait	varchar(50) COMMENT '系统头像',
    create_time	datetime NOT NULL COMMENT '创建时间',
    update_time	datetime COMMENT '修改时间',
    valid	varchar(2) NOT NULL default '1' COMMENT '有效状态,1-有效，0-无效',
    PRIMARY KEY (user_id),
    UNIQUE KEY phone_num (phone_num)
) DEFAULT CHARSET=UTF8 comment='用户表';

create table t_user_custom(
	user_id	varchar(32) NOT NULL COMMENT '用户id',
    last_team_id	varchar(32) COMMENT '上一次所在团队id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    update_time	datetime COMMENT '修改时间',
    PRIMARY KEY (user_id)
) DEFAULT CHARSET=UTF8 comment='用户习惯表';

create table t_team(
	team_id	varchar(32) NOT NULL COMMENT '主键id',
    team_name	varchar(50) COMMENT '团队名称',
    team_num	varchar(10) NOT NULL COMMENT '团队号码',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    update_time	datetime COMMENT '修改时间',
    valid	varchar(2) NOT NULL default '1' COMMENT '有效状态,1-有效，0-无效',
    PRIMARY KEY (team_id),
    UNIQUE KEY phone_num (team_num)
) DEFAULT CHARSET=UTF8 comment='团队表';

create table t_team_user_rel(
	team_user_id	varchar(32) NOT NULL COMMENT '主键id',
    team_id	varchar(32) NOT NULL  COMMENT '团队id',
    user_id	varchar(32) NOT NULL COMMENT '用户id',
    user_type	varchar(2) NOT NULL default '2' COMMENT '用户类型,1-管理员，2-成员',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (team_user_id)
) DEFAULT CHARSET=UTF8 comment='团队人员关系表';

create table t_team_shift(
	shift_id	varchar(32) NOT NULL COMMENT '主键id',
    team_id	varchar(32) NOT NULL  COMMENT '团队id',
    shift_name	varchar(20) NOT NULL COMMENT '班次名称',
    short_name	varchar(20) NOT NULL COMMENT '班次简称',
    start_time	varchar(20) NOT NULL COMMENT '开始时间，hhmm',
    end_time	varchar(20) NOT NULL COMMENT '结束时间，hhmm',
    max_user_num	varchar(10) COMMENT '最多人数',
    min_user_num	varchar(10) default '1' COMMENT '最少人数',
    is_min_rest_day	varchar(2) NOT NULL default '0' COMMENT '完成本班次后至少休息1天,1-是，0-否',
    is_must_join	varchar(2) NOT NULL default '0' COMMENT '有必须参加本班次的成员,1-是，0-否',
    min_join_num	varchar(10) COMMENT '必须参加成员中至少人数',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (shift_id)
) DEFAULT CHARSET=UTF8 comment='班次表';

create table t_special_day(
	special_day_id	varchar(32) NOT NULL COMMENT '主键id',
    team_id	varchar(32) NOT NULL  COMMENT '团队id',
    special_day_name varchar(50) NOT NULL COMMENT '特殊日名称',
    special_day_type varchar(2) NOT NULL COMMENT '特殊日类型，1-单日、2-日期段',
    start_time	date NOT NULL COMMENT '开始时间',
    end_time	date COMMENT '结束时间',
    shifts	varchar(4000) COMMENT '班次',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (special_day_id)
) DEFAULT CHARSET=UTF8 comment='特殊日表';

create table t_schedule(
	schedule_id	varchar(32) NOT NULL COMMENT '主键id',
    team_id	varchar(32) NOT NULL  COMMENT '团队id',
    shifts	varchar(2000) NOT NULL COMMENT '班次',
    is_turn_shift varchar(2) NOT NULL default '0' COMMENT '是否采用轮班制度，1-是，0-否',
    turn_shift_cycle varchar(10) COMMENT '轮班周期，单位天',
    turn_shifts	varchar(4000) COMMENT '轮转班次',
    is_weekend_rest varchar(2) NOT NULL default '1' COMMENT '是否周末休息，1-是，0-否',
    is_holiday_rest varchar(2) NOT NULL default '1' COMMENT '是否法定节假日休息，1-是，0-否',
    is_special_day_shift varchar(2) NOT NULL default '0' COMMENT '是否特殊日单独排班，1-是，0-否',
    special_day_ids	varchar(2000) COMMENT '特殊日id串，id之间用","分割',
    start_time date COMMENT '开始时间',
    end_time date COMMENT '结束时间',
    day_num varchar(10) COMMENT '排班天数，包括开始时间和结束时间',
    min_work_days varchar(10) COMMENT '最少工作的天数',
    max_weekend_rest_days varchar(10) COMMENT '最多能在周末休息的天数',
    max_consecutive_rest_days varchar(10) COMMENT '每周最多允许连休的天数',
    status varchar(2) NOT NULL default '1' COMMENT '进度状态，1-设置排班、2-生成日历、3-已开始排班、4-已生效',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    update_time	datetime NOT NULL COMMENT '更新时间',
    PRIMARY KEY (schedule_id)
) DEFAULT CHARSET=UTF8 comment='排班配置表';

create table t_schedule_no_shift(
	no_shift_id	varchar(32) NOT NULL COMMENT '主键id',
    schedule_id	varchar(32) NOT NULL  COMMENT '排班配置id',
    user_ids varchar(4000) COMMENT '不上某些班次的成员id串，用户id，用","分割',
    shift_ids varchar(600) COMMENT '不上某些班次的id串，班次id，用","分割',
    shift_names varchar(600) COMMENT '不上某些班次的id串，班次id，班次name，用"、"分割',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (no_shift_id)
) DEFAULT CHARSET=UTF8 comment='排班配置-不上某些班次表';

create table t_schedule_no_weeks(
	no_weeks_id	varchar(32) NOT NULL COMMENT '主键id',
    schedule_id	varchar(32) NOT NULL  COMMENT '排班配置id',
    user_ids varchar(4000) COMMENT '不上某些班次的成员id串，用户id，用","分割',
    weeks_codes varchar(200) COMMENT '不上的周几code串，code用","分割，例如"1,2"',
    weeks_names varchar(200) COMMENT '不上的周几的name串，name，用"、"分割,例如"周一、周二"',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (no_weeks_id)
) DEFAULT CHARSET=UTF8 comment='排班配置-不上周几表';


create table t_schedule_join_user(
	join_user_id varchar(32) NOT NULL COMMENT '主键id',
    schedule_id	varchar(32) NOT NULL  COMMENT '排班配置id',
    user_id varchar(32) COMMENT '人员id',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (join_user_id)
) DEFAULT CHARSET=UTF8 comment='排班配置-参加班次的成员表';

create table t_work_calendar(
	work_cal_id	varchar(32) NOT NULL COMMENT '主键id',
    team_id	varchar(32) NOT NULL  COMMENT '所属团队id',
    schedule_id varchar(32) NOT NULL COMMENT '所属排班配置id',
    calendar_date date COMMENT '日历的天',
    day_type varchar(2) COMMENT '日类型，1-工作日，0-休息日',
    work_shifts varchar(4000) COMMENT '工作班次',
    valid varchar(2) NOT NULL default '0' COMMENT '生效状态，1-生效，0-未生效',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    update_time	datetime NOT NULL COMMENT '更新时间',
    PRIMARY KEY (work_cal_id)
) DEFAULT CHARSET=UTF8 comment='工作日历表';

create table t_work_calendar_user(
	work_cal_user_id	varchar(32) NOT NULL COMMENT '主键id',
    team_id	varchar(32) NOT NULL  COMMENT '所属团队id',
    schedule_id varchar(32) NOT NULL COMMENT '所属排班配置id',
    calendar_date date NOT NULL COMMENT '日历的天',
    day_type varchar(2) NOT NULL COMMENT '日类型，1-工作日，0-休假',
    shift_id varchar(32) COMMENT '班次id，休息日时该字段为空',
    user_id varchar(32) NOT NULL COMMENT '人员id',
    from_type varchar(2) NOT NULL default '1' COMMENT '来源类型，1-用户自己填报，2-管理员填报，3-一键填充',
    upload_addr varchar(4000) COMMENT '上传地址，地址之间，用","分割',
    valid varchar(2) NOT NULL default '0' COMMENT '生效状态，1-生效，0-未生效',
    creater_id	varchar(32) NOT NULL COMMENT '创建人id',
    create_time	datetime NOT NULL COMMENT '创建时间',
    update_time	datetime NOT NULL COMMENT '更新时间',
    PRIMARY KEY (work_cal_user_id)
) DEFAULT CHARSET=UTF8 comment='工作日历人员表';

create table t_holiday(
	holiday_id	varchar(32) NOT NULL COMMENT '主键id',
    day	date NOT NULL COMMENT '某日',
    day_type varchar(2) NOT NULL COMMENT '日类型，1-工作日，0-节假日',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (holiday_id)
) DEFAULT CHARSET=UTF8 comment='法定节假日表';

create table t_tweet(
	tweet_id varchar(32) NOT NULL COMMENT '主键id',
    page_num varchar(50) NOT NULL COMMENT '页面编号',
    user_id varchar(32) NOT NULL COMMENT '用户id',
    content varchar(600) NOT NULL COMMENT '内容',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (tweet_id)
) DEFAULT CHARSET=UTF8 comment='吐槽表';

create table t_inform(
	inform_id varchar(32) NOT NULL COMMENT '主键id',
    user_id	varchar(32) NOT NULL COMMENT '所属人id',
    inform_type varchar(2) NOT NULL COMMENT '通知类型',
    content varchar(400) COMMENT '内容',
    status varchar(2) default '0' COMMENT '状态,0-未读、1-已读',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (inform_id)
) DEFAULT CHARSET=UTF8 comment='通知表';

create table t_operate_log(
	log_id varchar(32) NOT NULL COMMENT '主键id',
    operate_person_id	varchar(32) NOT NULL COMMENT '操作人id',
    table_name varchar(80) NOT NULL COMMENT '操作表名',
    operate_type varchar(10) NOT NULL COMMENT '操作类型,I-新增，D-删除，U-更新，Q-查询',
    request_method varchar(100) COMMENT '请求方法',
    request_content varchar(4000) COMMENT '请求内容',
    operate_time datetime COMMENT '操作时间',
    operate_result varchar(2) COMMENT '操作结果,0-失败，1-成功',
    result_content varchar(4000) COMMENT '操作结果内容',
    create_time	datetime NOT NULL COMMENT '创建时间',
    PRIMARY KEY (log_id)
) DEFAULT CHARSET=UTF8 comment='操作日志表';