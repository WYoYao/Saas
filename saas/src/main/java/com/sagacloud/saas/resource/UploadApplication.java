package com.sagacloud.saas.resource;  
  
import javax.ws.rs.ApplicationPath;  
import org.glassfish.jersey.media.multipart.MultiPartFeature;  
import org.glassfish.jersey.server.ResourceConfig;  
  
@ApplicationPath("/")  
public class UploadApplication extends ResourceConfig {  
    public UploadApplication() {  
    	register(MultiPartFeature.class);  
    }  
}  