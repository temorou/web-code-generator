package com.${projectName}.${classInfo.className?uncap_first}.service;

import com.${projectName}.common.PageModle;
import com.${projectName}.common.ResultData;
import com.${projectName}.common.DropDownList;
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className};
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className}Condition;

import java.util.List;
/**
* ${classInfo.classComment}
*
* Created by xuxiang on '${.now?string('yyyy-MM-dd HH:mm:ss')}'.
*/
public interface ${classInfo.className}Service {

    /**
    * 新增
    */
    public ResultData<String> insert(${classInfo.className} ${classInfo.className?uncap_first});

    /**
    * 删除
    */
    public ResultData<String> delete(String id);

    /**
    * 更新
    */
    public ResultData<String> update(${classInfo.className} ${classInfo.className?uncap_first});

    /**
    * Load查询
    */
    public ResultData load(String id);

    /**
    * 分页查询
    */
    public PageModle<${classInfo.className}> pageList(${classInfo.className}Condition ${classInfo.className?uncap_first}Condition);

    List<DropDownList> getDownList();
}
