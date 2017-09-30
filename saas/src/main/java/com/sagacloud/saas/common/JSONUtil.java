package com.sagacloud.saas.common;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;

public class JSONUtil {
    /**
     * 转换更新参数
     * @param jsonObject    用户接口参数,除了过滤项，其它项默认为新增项
     * @return              数据平台接口参数
     */
    public static JSONObject getAddParamJson(JSONObject jsonObject){
        JSONObject paramJson = new JSONObject();
        paramJson.put("insertObject", jsonObject);
        return paramJson;
    }

    /**
     * 转换主键查询参数
     * @param jsonObject    用户接口数据
     * @param majors         主键
     * @return                数据平台接口参数
     */
    public static JSONObject getKeyWithMajors(JSONObject jsonObject, String... majors){
        JSONObject paramJson = new JSONObject();
        JSONObject keyJson = new JSONObject();
        Object value;
        for(String major : majors){
            value = jsonObject.get(major);
            if(value != null && !"".equals(value.toString())){
                keyJson.put(major, value);
            }
        }
        paramJson.put("Key", keyJson);
        return paramJson;
    }

    /**
     * 转换更新参数
     * @param jsonObject    用户接口参数,除了过滤项，其它项默认为修改项
     * @param majors        过滤项
     * @return              数据平台接口参数
     */
    public static JSONObject getUpdateParamJson(JSONObject jsonObject, String... majors){
        JSONObject paramJson = new JSONObject();
        JSONObject criteriaJson = new JSONObject();
        Object value;
        for(String major : majors){
            value = jsonObject.get(major);
            if(value != null && !"".equals(value.toString())){
                criteriaJson.put(major, value);
            }
            jsonObject.remove(major);
        }
        paramJson.put("criteria", criteriaJson);
        paramJson.put("set", jsonObject);

        return paramJson;
    }

    /**
     * 获得除去某些项的条件
     * @param jsonObject    用户接口参数
     * @param majors        过滤项
     * @return              数据平台接口参数
     */
    public static JSONObject getCriteriaRemoveMajors(JSONObject jsonObject, String... majors){
        JSONObject paramJson = new JSONObject();
        for(String major : majors){
            jsonObject.remove(major);
        }
        paramJson.put("criteria", jsonObject);
        return paramJson;
    }

    /**
     * 获得指定项的条件
     * @param jsonObject    用户接口参数
     * @param majors        过滤项
     * @return              数据平台接口参数
     */
    public static JSONObject getCriteriaWithMajors(JSONObject jsonObject, String... majors){
        JSONObject paramJson = new JSONObject();
        JSONObject criteria = new JSONObject();
        for(String major : majors){
            criteria.put(major, jsonObject.get(major));
        }
        paramJson.put("criteria", criteria);
        return paramJson;
    }

    /**
     * 获得指定项的条件-用于批量查询
     * @param jsonArray    用户接口参数
     * @param key           参数的code码
     * @param code          用户接口参数code码
     * @return              数据平台接口参数
     */
    public static JSONObject getCriteriasWithMajors(JSONArray jsonArray, String key, String code){
        JSONObject paramJson = new JSONObject();
        JSONArray criterias = new JSONArray();
        JSONObject criteria, json;
        for(int i=0; i<jsonArray.size(); i++){
            json = jsonArray.getJSONObject(i);
            criteria = new JSONObject();
            criteria.put(code, json.get(key));
            criterias.add(criteria);
        }
        paramJson.put("criterias", criterias);
        return paramJson;
    }

    /**
     * 获得指定项的条件-用于批量查询
     * @param jsonObject    用户接口参数
     * @param key           参数的code码
     * @param code          用户接口参数code码
     * @return              数据平台接口参数
     */
    public static JSONObject getCriteriasWithMajors(JSONObject jsonObject, String key, String code){
        JSONObject paramJson = new JSONObject();
        JSONArray criterias = new JSONArray();
        JSONObject criteria = new JSONObject();
        criteria.put(code, jsonObject.get(key));
        criterias.add(criteria);
        paramJson.put("criterias", criterias);
        return paramJson;
    }
    
    /**
     * 获得批量查询参数
     * @param jsonObject 参数
     * @param arrayInfo 批量数组名
     * @param infoName  查询参数
     * @param marjors   非批量参数
     * @return
     */
    public static JSONObject getCriteriasWithMajors(JSONObject jsonObject, String arrayInfo, String infoName, String... marjors){
        JSONObject paramJson = new JSONObject();
        JSONArray criterias = new JSONArray();
        JSONObject criteria;
        JSONArray infos = jsonObject.getJSONArray(arrayInfo);
        if(infos != null) {
            for (int i=0; i<infos.size(); i++){
                criteria = new JSONObject();
                criteria.put(infoName, infos.get(i));
                for(String marjor : marjors){
                    if(!marjor.equals(infoName))
                        criteria.put(marjor, jsonObject.get(marjor));
                }
                criterias.add(criteria);
            }
        }
        paramJson.put("criterias", criterias);
        return paramJson;
    }

    /**
     * 获得数据平台查询条件
     * @param codeName
     * @param jsonObject
     * @param majors
     * @return
     */
    public static JSONObject getDataPlatCriteriaWithMajors(String codeName, JSONObject jsonObject, String... majors){
        JSONObject paramJson = new JSONObject();
        JSONObject criteria = new JSONObject();
        if(codeName != null){
            criteria.put("id", jsonObject.get(codeName));
        }
        for(String major : majors){
            criteria.put(major, jsonObject.get(major));
        }
        paramJson.put("criteria", criteria);
        return paramJson;
    }

    /**
     * filter info
     */
    public static IJSONOperator filter = (jsonObject, filters) -> {
        JSONObject returnJson = new JSONObject();
        for(String filter : filters){
            returnJson.put(filter, jsonObject.get(filter));
        }
        return returnJson;
    };

    /**
     * remove info
     */
    public static IJSONOperator removeInfo = (jsonObject, infos) -> {
        if(jsonObject != null){
            for(String info : infos){
                jsonObject.remove(info);
            }
        }
        return jsonObject;
    };

    /**
     * String to JSONObject/JSONArray
     */
    public static IJSONOperator processStringToJson = (jsonObject, marjors) ->{
        if(jsonObject != null){
            String content;
            for(String marjor : marjors){
                content = jsonObject.getString(marjor);
                if(content != null){
                    if(content.startsWith("{"))
                        jsonObject.put(marjor, JSONObject.parseObject(content));
                    else if(content.startsWith("["))
                        jsonObject.put(marjor, JSONObject.parseArray(content));
                }
            }
        }
        return jsonObject;
    };

    /**
     * tranfer infoValue of date type
     */
    public static IJSONOperator tranferTimeFormat = (jsonObject, marjors) ->{
        SimpleDateFormat fsdf = new SimpleDateFormat(CommonConst.data_format_save);
        SimpleDateFormat tsdf = new SimpleDateFormat(CommonConst.data_format_show);
        for(String marjor : marjors){
            if(jsonObject.containsKey(marjor))
                jsonObject.put(marjor, tsdf.format(fsdf.parse(jsonObject.getString(marjor))));
        }
        return jsonObject;
    };

    /**
     * process result : tranfer info of date type、 filter info、 process string to json
     * @param queryResult query result
     * @param tranferTimeFormat operation of tranfer info of date type
     * @param processStringToJson operation of process string to json
     * @param filter operation of filter info
     * @param dataInfo parameter of tranfer info of date type
     * @param jsonInfo parameter of process string to json
     * @param filters parameter of filter info
     * @return
     * @throws Exception
     */
    public static JSONObject processQueryResult(String queryResult, IJSONOperator tranferTimeFormat, IJSONOperator processStringToJson, IJSONOperator filter, String dataInfo, String[] jsonInfo, String... filters) throws Exception{
        JSONObject queryResultJson = JSONObject.parseObject(queryResult);
        if("failure".equals(queryResultJson.getString("Result")) || queryResultJson.getIntValue("Count") < 1)
            return queryResultJson;
        JSONArray queryResultArray = queryResultJson.getJSONArray("Content");
        JSONArray returnArray = new JSONArray();
        JSONObject item;
        for(int i=0; i<queryResultArray.size(); i++){
            item = queryResultArray.getJSONObject(i);
            if(tranferTimeFormat != null)
                item = tranferTimeFormat.operation(item, dataInfo);
            if(processStringToJson != null)
                item = processStringToJson.operation(item, jsonInfo);
            if(filter != null)
                item = filter.operation(item, filters);
            returnArray.add(item);
        }
        queryResultJson.put("Content", returnArray);
        queryResultJson.put("Count", returnArray.size());
        return queryResultJson;
    }

    /**
     * get first record from query result
     * @param queryResult query result
     * @param tranferTimeFormat operation of tranfer info of date type
     * @param processStringToJson operation of process string to json
     * @param filter operation of filter info
     * @param dataInfo parameter of tranfer info of date type
     * @param jsonInfo parameter of process string to json
     * @param filters parameter of filter info
     * @return
     * @throws Exception
     */
    public static JSONObject getFirstRecordfromResult(String queryResult, IJSONOperator tranferTimeFormat, IJSONOperator processStringToJson, IJSONOperator filter, String[] dataInfo, String[] jsonInfo, String... filters) throws Exception{
        JSONObject queryResultJson = JSONObject.parseObject(queryResult);
        if("failure".equals(queryResultJson.getString("Result")) || queryResultJson.getIntValue("Count") < 1)
            return queryResultJson;
        JSONArray queryResultArray = queryResultJson.getJSONArray("Content");
        JSONObject item = queryResultArray.getJSONObject(0);
        if(tranferTimeFormat != null)
            item = tranferTimeFormat.operation(item, dataInfo);
        if(processStringToJson != null)
            item = processStringToJson.operation(item, jsonInfo);
        if(filter != null)
            item = filter.operation(item, filters);
        queryResultJson.put("Item", item);
        queryResultJson.remove("Content");
        queryResultJson.remove("Count");
        return queryResultJson;
    }

    /**
     *
     * 功能描述：处理查询返回结果，将结果中的内容项转化为JsonString
     * @param queryResult
     * @param majors
     * @return
     * @创建者 wanghailong
     * @邮箱 wanghailong@persagy.com 
     * @修改描述
     */
    public static String prossesResultToJsonString(String queryResult, String... majors){
        if(queryResult.contains("Result") && queryResult.contains("Content")){
            JSONObject resultJson = JSONObject.parseObject(queryResult);
            JSONArray array = (JSONArray) resultJson.get("Content");
            for(int i = 0 ; i < array.size() ; i++){
                JSONObject dataJson = array.getJSONObject(i);
                for(String major : majors){
                    String dataString = dataJson.getString(major);
                    if(!StringUtil.isNull(dataString)){
                        if(dataString.startsWith("{")){
                            dataJson.put(major, JSONObject.parseObject(dataJson.getString(major)));
                        }else if(dataString.startsWith("[")){
                            dataJson.put(major, JSONArray.parseArray(dataJson.getString(major)));
                        }
                    }
                }
                array.set(i, dataJson);
            }
            resultJson.put("Content", array);
            queryResult = resultJson.toString();
        }
        return queryResult;
    }

    /**
     *
     * 功能描述：处理插入参数，将参数中的内容项转化为JsonString
     * @param jsonObject
     * @param majors
     * @return
     * @创建者 wanghailong
     * @邮箱 wanghailong@persagy.com
     * @修改描述
     */
    public static JSONObject prossesParamToJsonString(JSONObject jsonObject, String... majors){
        for(String major : majors){
            if(jsonObject.containsKey(major)){
                jsonObject.put(major, JSON.toJSONString(jsonObject.get(major)));
            }
        }
        return jsonObject;
    }

    /**
     * 功能描述：处理查询返回结果，转换结果中Date类型的数据格式
     * @param queryResult
     * @param fromDateFormat
     * @param toDateFormat
     * @param majors
     * @return
     * @throws Exception
     */
    public static String prossesResultToDateString(String queryResult, String fromDateFormat, String toDateFormat , String... majors) throws Exception{
        if(queryResult.contains("Result") && queryResult.contains("Content")){
            JSONObject resultJson = JSONObject.parseObject(queryResult);
            JSONArray array = (JSONArray) resultJson.get("Content");
            SimpleDateFormat fsdf = new SimpleDateFormat(fromDateFormat);
            SimpleDateFormat tsdf = new SimpleDateFormat(toDateFormat);
            for(int i = 0 ; i < array.size() ; i++){
                JSONObject dataJson = array.getJSONObject(i);
                for(String major : majors){
                    String dataString = dataJson.getString(major);
                    if(!StringUtil.isNull(dataString)){
                        dataJson.put(major, tsdf.format(fsdf.parse(dataString)));
                    }
                }
                array.set(i, dataJson);
            }
            resultJson.put("Content", array);
            queryResult = resultJson.toString();
        }
        return queryResult;
    }

    /**
     *
     * 功能描述：返回查询结果中的第一条记录
     * @param queryResult
     * @return
     * @创建者 wanghailong
     * @邮箱 wanghailong@persagy.com 
     * @修改描述
     */
    public static String getFirstRecordfromResult(String queryResult){
        if(queryResult.contains("Result") && queryResult.contains("Content")){
            JSONObject resultJson = JSONObject.parseObject(queryResult);
            JSONArray array = (JSONArray) resultJson.get("Content");
            if(array.size() > 0 && null != array.get(0)) {
                resultJson.put("Item", JSONObject.parseObject(array.get(0).toString()));
                resultJson.remove("Content");
                resultJson.remove("Count");
            }

            queryResult = resultJson.toString();
        }
        return queryResult;
    }

    /**
     *
     * 功能描述：返回查询结果中的第一条记录,Json格式
     * @param queryResult
     * @return
     * @创建者 wanghailong
     * @邮箱 wanghailong@persagy.com 
     * @修改描述
     */
    public static JSONObject getFirstRecordfromResultWithJson(String queryResult){
        JSONObject firstJson = null;
        if(queryResult.contains("Result") && queryResult.contains("Content")){
            JSONObject resultJson = JSONObject.parseObject(queryResult);
            JSONArray array = (JSONArray) resultJson.get("Content");
            if(array.size() > 0 && null != array.get(0)) {
                firstJson = JSONObject.parseObject(array.get(0).toString());
            }
        }
        return firstJson;
    }

    /**
     * 排序
     * @param queryResult
     * @param field  排序的字段
     * @param order      -1:倒序  1:正序
     * @return
     */
    public static JSONObject sortByField(String queryResult, String field, int order){
        JSONObject resultJson = JSONObject.parseObject(queryResult);
        JSONArray contentArray = resultJson.getJSONArray("Content");
        if(contentArray != null){
            Collections.sort(contentArray, new Comparator<Object>(){
                public int compare(Object str1, Object str2){
                    JSONObject obj1 = JSONObject.parseObject(str1.toString());
                    JSONObject obj2 = JSONObject.parseObject(str2.toString());
                    if(obj1.getLongValue(field) > obj2.getLongValue(field)){
                        return order;
                    }
                    if(obj1.getLongValue(field) == obj2.getLongValue(field)){
                        return 0;
                    }
                    return -1 * order;
                }
            });
        }
        resultJson.put("Content", contentArray);
        return resultJson;
    }

    /**
     * 排序
     * @param array
     * @param field  排序的字段
     * @param order      -1:倒序  1:正序
     * @return
     */
    public static JSONArray sortByField(JSONArray array, String field, int order){
        if(array != null){
            Collections.sort(array, new Comparator<Object>(){
                public int compare(Object str1, Object str2){
                    JSONObject obj1 = JSONObject.parseObject(str1.toString());
                    JSONObject obj2 = JSONObject.parseObject(str2.toString());
                    if(obj1.getLongValue(field) > obj2.getLongValue(field)){
                        return order;
                    }
                    if(obj1.getLongValue(field) == obj2.getLongValue(field)){
                        return 0;
                    }
                    return -1 * order;
                }
            });
        }
        return array;
    }
    
    /**
     * 排序
     * @param array
     * @param field  排序的字段
     * @param order      -1:倒序  1:正序
     * @return
     */
    public static JSONArray sortByIntegerField(JSONArray array, String field, int order){
    	if(array != null){
    		Collections.sort(array, new Comparator<Object>(){
    			public int compare(Object str1, Object str2){
    				JSONObject obj1 = JSONObject.parseObject(str1.toString());
    				JSONObject obj2 = JSONObject.parseObject(str2.toString());
    				Integer order1 = Integer.valueOf(obj1.getString(field));
    				Integer order2 = Integer.valueOf(obj2.getString(field));
    				
    				if(order1 > order2){
    					return order;
    				}
    				if(order1 == order2){
    					return 0;
    				}
    				return -1 * order;
    			}
    		});
    	}
    	return array;
    }
    /**
     * 排序
     * @param array
     * @param field  排序的字段
     * @param order      -1:倒序  1:正序
     * @return
     */
    public static JSONArray sortByStringField(JSONArray array, String field, int order){
    	if(array != null){
    		Collections.sort(array, new Comparator<Object>(){
    			public int compare(Object str1, Object str2){
    				JSONObject obj1 = JSONObject.parseObject(str1.toString());
    				JSONObject obj2 = JSONObject.parseObject(str2.toString());
    				if(obj1.getString(field).compareTo(obj2.getString(field)) > -1){
    					return order;
    				}
    				return -1 * order;
    			}
    		});
    	}
    	return array;
    }

}
