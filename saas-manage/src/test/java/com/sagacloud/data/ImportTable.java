package com.sagacloud.data;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.io.Files;
import com.sagacloud.saasmanage.dao.DBCommonMethods;

import java.io.File;
import java.io.IOException;

/**
 * Created by DOOM on 2017/8/28.
 */
public class ImportTable {
    public static void main(String[] args) throws Exception {
        importTable("saas", "customer", false, "customer.json");
//        importTable("saas", "building", false, "building.json");
        importTable("saas", "operate_module", false, "operate_module.json");
        importTable("saas", "function_pack", false, "function_pack.json");
        importTable("saas", "dynamic_component", false, "dynamic_component.json");
        importTable("saas", "component_relation", false, "component_relation.json");
        importTable("saas", "info_component", false, "info_component.json");
    }

    /**
     * 导入表
     * @param dataBase          数据库名
     * @param tableName         表名
     * @param onlyValid         是否全量导入 true:只导入valid为true的数据  false:为全量导入
     * @param importFileName   导入文件名称，查找文件是会在文件前默认加上"table/"+dataBase路径  同导出
     * @throws IOException
     */
    public static void importTable(String dataBase, String tableName, boolean onlyValid, String importFileName) throws IOException {
        File file = new File("table" + "/" + dataBase + "/" + importFileName);
        String fileContent = new String(Files.toByteArray(file));
        JSONObject json = JSONObject.parseObject(fileContent);
        JSONArray content = json.getJSONArray("Content");
        content = content == null ? new JSONArray() : content;
        if(onlyValid){
            JSONObject item;
            for(int i=0; i<content.size(); i++){
                item = content.getJSONObject(i);
                if(!item.getBooleanValue("valid")){
                    content.remove(item);
                }
            }
        }
        JSONObject param = new JSONObject();
        param.put("insertObjects", content);
        String result = DBCommonMethods.insertBatchRecord(dataBase, tableName, param.toJSONString());
        System.out.println("导入"+dataBase+"的"+tableName+"表中的数据"+(result.contains("success")?"成功":"失败"));
    }
}
