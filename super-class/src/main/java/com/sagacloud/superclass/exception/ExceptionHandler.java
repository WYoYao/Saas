package com.sagacloud.superclass.exception;

import java.util.Arrays;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.apache.log4j.Logger;

import com.sagacloud.superclass.common.ToolsUtil;


@Provider
public class ExceptionHandler implements ExceptionMapper<Exception> {
	private static final Logger log = Logger.getLogger(ExceptionHandler.class);
    
	@Override
	public Response toResponse(Exception exception) {
		// TODO Auto-generated method stub
		String message = "请求异常：";
		log.error(message,exception); 
		String exMsg = exception.toString()+"--"+Arrays.toString(exception.getStackTrace());
		return Response.ok(ToolsUtil.errorJsonMsg(exMsg), MediaType.APPLICATION_JSON).build();  
	}

}
