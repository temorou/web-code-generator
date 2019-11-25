<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.${projectName}.${classInfo.className?uncap_first}.dao.${classInfo.className}Dao">

    <resultMap id="${classInfo.className}" type="com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className}" >
    <#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
    <#list classInfo.fieldList as fieldItem >
        <result column="${fieldItem.columnName}" property="${fieldItem.fieldName}" />
    </#list>
    </#if>
    </resultMap>

    <sql id="Base_Column_List">
    <#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
    <#list classInfo.fieldList as fieldItem >
        `${fieldItem.columnName}`<#if fieldItem_has_next>,</#if>
    </#list>
    </#if>
    </sql>

    <insert id="insert" parameterType="java.util.Map" >
        INSERT INTO ${classInfo.tableName} (
        <#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
        <#list classInfo.fieldList as fieldItem >
            <#if fieldItem.columnName != "Id" >
            `${fieldItem.columnName}`<#if fieldItem_has_next>,</#if>
            </#if>
        </#list>
        </#if>
        )
        VALUES(
        <#if classInfo.fieldList?exists && classInfo.fieldList?size gt 0>
        <#list classInfo.fieldList as fieldItem >
        <#if fieldItem.columnName != "Id" >
            <#if fieldItem.columnName="AddTime" || fieldItem.columnName="UpdateTime" >
            NOW()<#if fieldItem_has_next>,</#if>
            <#else>
            ${r"#{"}${classInfo.className?uncap_first}.${fieldItem.fieldName}${r"}"}<#if fieldItem_has_next>,</#if>
            </#if>
        </#if>
        </#list>
        </#if>
        )
    </insert>

    <delete id="delete" parameterType="java.util.Map" >
        DELETE FROM ${classInfo.tableName}
        WHERE `id` = ${r"#{id}"}
    </delete>

    <update id="update" parameterType="java.util.Map" >
        UPDATE ${classInfo.tableName}
        <set>
        <#list classInfo.fieldList as fieldItem >
        <#if fieldItem.columnName != "id" >
            <if test="${classInfo.className?uncap_first}.${fieldItem.fieldName} != null">
                ${fieldItem.columnName} = ${r"#{"}${classInfo.className?uncap_first}.${fieldItem.fieldName}${r"}"},
            </if>
        </#if>
        </#list>
        </set>
        WHERE `id` = ${r"#{"}${classInfo.className?uncap_first}.id${r"}"}
    </update>


    <select id="load" parameterType="java.util.Map" resultMap="${classInfo.className}">
        SELECT <include refid="Base_Column_List" />
        FROM ${classInfo.tableName}
        WHERE `id` = ${r"#{id}"}
    </select>

    <select id="pageList" parameterType="java.util.Map" resultMap="${classInfo.className}">
        SELECT <include refid="Base_Column_List" />
        FROM ${classInfo.tableName}
        LIMIT ${r"#{condition.begin}"}, ${r"#{condition.pageSize}"}
    </select>

    <select id="pageListCount" parameterType="java.util.Map" resultType="int">
        SELECT count(1)
        FROM ${classInfo.tableName}
    </select>

    <select id="getDownList" resultType="com.${projectName}.common.DropDownList">
        SELECT id as value , name as label
        FROM ${classInfo.tableName}
    </select>

</mapper>
