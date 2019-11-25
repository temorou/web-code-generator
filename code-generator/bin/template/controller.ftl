package com.${projectName}.${classInfo.className?uncap_first}.controller;

import com.${projectName}.common.PageModle;
import com.${projectName}.common.ResultData;
import com.${projectName}.common.DropDownList;
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className};
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className}Condition;
import com.${projectName}.${classInfo.className?uncap_first}.service.${classInfo.className}Service;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;
import java.util.List;

/**
* ${classInfo.classComment}
*
* Created by xuxiang on '${.now?string('yyyy-MM-dd HH:mm:ss')}'.
*/
@Controller
@RequestMapping("api/${classInfo.className?uncap_first}")
public class ${classInfo.className}Controller {

    @Resource
    private ${classInfo.className}Service ${classInfo.className?uncap_first}Service;

    /**
    * 新增
    */
    @RequestMapping("/add")
    @ResponseBody
    public ResultData<String> add(@RequestBody ${classInfo.className} ${classInfo.className?uncap_first}){
        return ${classInfo.className?uncap_first}Service.insert(${classInfo.className?uncap_first});
    }

    /**
    * 删除
    */
    @RequestMapping("/remove")
    @ResponseBody
    public ResultData<String> remove(@RequestBody Map<String,String> idMap){
        return ${classInfo.className?uncap_first}Service.delete(idMap.get("id"));
    }

    /**
    * 更新
    */
    @RequestMapping("/edit")
    @ResponseBody
    public ResultData<String> edit(@RequestBody ${classInfo.className} ${classInfo.className?uncap_first}){
        return ${classInfo.className?uncap_first}Service.update(${classInfo.className?uncap_first});
    }

    /**
    * Load查询
    */
    @RequestMapping("/getDetail")
    @ResponseBody
    public ResultData getDetail(@RequestBody Map<String,String> idMap){
        ResultData result = ${classInfo.className?uncap_first}Service.load(idMap.get("id"));
        return result;
    }

    /**
    * 分页查询
    */
    @RequestMapping("/getList")
    @ResponseBody
    public ResultData<Object> getList(@RequestBody ${classInfo.className}Condition ${classInfo.className?uncap_first}Condition) {
         PageModle<${classInfo.className}> result = ${classInfo.className?uncap_first}Service.pageList(${classInfo.className?uncap_first}Condition);
         return new ResultData(result);
    }
    /**
    * 下拉框查询
    */
    @RequestMapping("/getDownList")
    @ResponseBody
    public ResultData<List> getDownList() {
           List<DropDownList> result = ${classInfo.className?uncap_first}Service.getDownList();
           return new ResultData(result);
    }
}
