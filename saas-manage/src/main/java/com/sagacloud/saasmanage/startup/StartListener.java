package com.sagacloud.saasmanage.startup;

import com.sagacloud.json.JSONArray;
import com.sagacloud.json.JSONObject;
import com.sagacloud.json.JSONValue;
import com.sagacloud.saasmanage.cache.*;
import com.sagacloud.saasmanage.dao.DBAgent;
import com.sagacloud.saasmanage.dao.DBConst;
import com.zillion.database.agent.ZillionAgent;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by guosongchao on 2017/9/6.
 */
@Service
public class StartListener implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger log = Logger.getLogger(StartListener.class);

    @Autowired
    private ProjectCache projectCache;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if(event.getApplicationContext().getParent() == null){
            new Thread(){
                public void run(){
                    initTablesAndData();
                    while(true){
                        try {
                            projectCache.synCache();
                            CustomerCache.synCache();
                            BuildingCache.synCache();
                            ComponentRelationCache.synCache();
                            InfoComponentCache.synCache();

                        } catch (Exception e) {
                            e.printStackTrace();
                            log.error(e);
                        }finally {
                            try {
                                Thread.sleep(10 * 60 * 1000L);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }

                    }
                }
            }.start();
        }
    }

    /**
     *
     * 功能描述： 初始化数据库的表和数据
     * @创建者 wanghailong
     * @邮箱 wanghailong@persagy.com
     * @修改描述
     */
    private void initTablesAndData() {
        ZillionAgent agent = DBAgent.GetAgent();
        boolean isExist = false;
        String jsonStr = "{\"QueryType\":\"database_list\"}";
        JSONObject json = (JSONObject) JSONValue.parse(jsonStr);
        JSONObject resJson = null;
        try {
            resJson = agent.Query(json);
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSONArray arr = (JSONArray) resJson.get("Content");
        for (int i = 0; i < arr.size(); i++) {
            if (arr.get(i).toString().equals(DBConst.DATABASE_NAME)) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            return;
        }
        try {
            agent.NDL_AddDatabase(DBConst.DATABASE_NAME);
        } catch (Exception e) {
            e.printStackTrace();
        }
        InputStream inputStream = Thread.currentThread().getContextClassLoader()
                .getResourceAsStream(("tableSchema.txt"));
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String jsonBody = "";
        String line;
        try {
            line = reader.readLine();
            while (line != null) {
                if (line.trim().startsWith("//")) {
                    if (!jsonBody.trim().isEmpty()) {
                        log.info(jsonBody);
                        json = (JSONObject) JSONValue.parse(jsonBody);
                        JSONObject result = agent.Query(json);
                        log.info(result.toString());
                        jsonBody = "";
                    }
                } else {
                    jsonBody = jsonBody + line;
                }
                line = reader.readLine();
            }
            log.info(jsonBody);
            json = (JSONObject) JSONValue.parse(jsonBody);
            JSONObject result = agent.Query(json);
            log.info(result.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
