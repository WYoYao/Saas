package com.sagacloud.data;

import com.alibaba.fastjson.JSONObject;
import com.google.common.io.Files;
import com.sagacloud.saasmanage.dao.DBCommonMethods;

import java.io.File;
import java.io.IOException;

/**
 * Created by DOOM on 2017/8/28.
 */
public class ExportTable {
    public static void main(String[] args) throws Exception {
//        exportTable("saas", "customer", true, "customer.json");
//        exportTable("saas", "building", true, "building.json");
//        exportTable("saas", "operate_module", true, "operate_module.json");
//        exportTable("saas", "function_pack", true, "function_pack.json");
//        exportTable("saas", "dynamic_component", true, "dynamic_component.json");
//        exportTable("saas", "component_relation", true, "component_relation.json");
//        exportTable("saas", "info_component", true, "info_component.json");
        exportTable("saas", "info_component", true, "temp_object.json");
    }

    /**
     * 导出表
     * @param dataBase          数据库名
     * @param tableName         表名
     * @param onlyValid         是否只导出valid为true的数据
     * @param exportFileName   导出数据存放文件名，会在文件名前面添加默认"table/"+dataBase
     * @throws IOException
     */
    public static void exportTable(String dataBase, String tableName, boolean onlyValid, String exportFileName) throws IOException {
        JSONObject param = new JSONObject();
        JSONObject criteria = new JSONObject();
        if(onlyValid){
            criteria.put("valid", true);
        }
        param.put("criteria", criteria);
        String resultStr = DBCommonMethods.queryRecordByCriteria(dataBase, tableName, param.toJSONString());
        File file = new File("table" + "/" + dataBase + "/" + exportFileName);
        if(!file.exists())
            Files.createParentDirs(file);
        Files.write(resultStr.getBytes(), file);
        System.out.println("导出"+dataBase+"下的"+tableName+"表" + (resultStr.contains("success")?"成功,数据保存在"+exportFileName:"失败"));
    }
}
