package com.sagacloud.superclass.common;

/** 
 * 功能描述： 数据请求路径工具类
 * @类型名称 DataRequestPathUtil
 * @创建者 wanghailong
 * @邮箱 wanghailong@persagy.com  
 * @修改描述 
 */
public class DataRequestPathUtil {
	/**** 短信平台请求路径 ***/
	//post：短信平台-发送验证码 
	public final static String smsPlat_send_code = "BASEPATH/restSmsService/sendCode?appCode=APPCODE";
	//post：短信平台-校验验证码 
	public final static String smsPlat_verify_code = "BASEPATH/restSmsService/verifyCode?appCode=APPCODE";
	//get：图文下载服务-下载文件
	public final static String image_service_file_get = "BASEPATH/common/file_get/KEY?systemId=SYSTEMID";
	//post：图文下载服务-上传图片
	public final static String image_service_image_upload = "BASEPATH/common/image_upload?systemId=SYSTEMID&secret=SECRET&key=KEY";
	//get：图文下载服务-下载图片
	public final static String image_service_image_get = "BASEPATH/common/image_get?systemId=SYSTEMID&key=KEY";
	
}
