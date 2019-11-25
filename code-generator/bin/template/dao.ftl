package com.${projectName}.${classInfo.className?uncap_first}.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import com.${projectName}.common.DropDownList;
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className};
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className}Condition;

import java.util.List;

/**
* ${classInfo.classComment}
*
* Created by xuxiang on '${.now?string('yyyy-MM-dd HH:mm:ss')}'.
*/
@Component
public interface ${classInfo.className}Dao {

    /**
    * 新增
    */
    public int insert(@Param("${classInfo.className?uncap_first}") ${classInfo.className} ${classInfo.className?uncap_first});

    /**
    * 删除
    */
    public int delete(@Param("id") String id);

    /**
    * 更新
    */
    public int update(@Param("${classInfo.className?uncap_first}") ${classInfo.className} ${classInfo.className?uncap_first});

    /**
    * Load查询
    */
    public ${classInfo.className} load(@Param("id") String id);

    /**
    * 分页查询Data
    */
	public List<${classInfo.className}> pageList(@Param("condition") ${classInfo.className}Condition ${classInfo.className?uncap_first}Condition);

    /**
    * 分页查询Count
    */
    public int pageListCount(@Param("condition") ${classInfo.className}Condition ${classInfo.className?uncap_first}Condition);

    List<DropDownList> getDownList();
}
