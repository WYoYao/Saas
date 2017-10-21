package com.sagacloud.superclass.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/** 
 * 功能描述： 日期工具类
 * @类型名称 DateUtil
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public class DateUtil {
	
	public static final String sdfMonth = "yyyyMM"; 
	public static final String sdfMonthDay = "MM月dd日"; 
	public static final String sdftime = "yyyyMMddHHmmss"; 
	public static final String sdfDay = "yyyyMMdd"; 
	public static final String sdf_Day = "yyyy-MM-dd"; 
	public static final String sdf_time = "yyyy-MM-dd HH:mm:ss"; 
	
    public static String getNowTimeStr() {
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(new Date());
    }
    
	/**
	 * 获取当前的UTC时间,精确到毫秒
	 */
	public static Long getUtcTimeNow(){
		Date dateNow = new Date();
		Long lRes = dateNow.getTime();
		return lRes;
	}

	/**
	 * 转换时间格式
	 * @param dateStr
	 * @param fromDateFormat
	 * @param toDateFormat
	 * @return
	 * @throws ParseException
	 */
	public static String transferDateFormat(String dateStr, String fromDateFormat, String toDateFormat) throws ParseException {
		SimpleDateFormat fromSdf = new SimpleDateFormat(fromDateFormat);
		SimpleDateFormat toSdf = new SimpleDateFormat(toDateFormat);
		return toSdf.format(fromSdf.parse(dateStr));
	}
	
	public static String formatStr(String pattern, Date date) {
		String str = new SimpleDateFormat(pattern).format(date);
		return str;
	}
	public static Date parseDate(String pattern, String str) throws ParseException {
		Date date = new SimpleDateFormat(pattern).parse(str);
		return date;
	}
	
}
