package com.${projectName}.${classInfo.className?uncap_first}.service.impl;

import com.${projectName}.common.Constant;
import com.${projectName}.common.PageModle;
import com.${projectName}.common.ResultData;
import com.${projectName}.common.DropDownList;
import com.${projectName}.${classInfo.className?uncap_first}.dao.${classInfo.className}Dao;
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className};
import com.${projectName}.${classInfo.className?uncap_first}.model.${classInfo.className}Condition;
import com.${projectName}.${classInfo.className?uncap_first}.service.${classInfo.className}Service;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;

import java.util.List;
import java.util.UUID;
import java.util.Date;

/**
* ${classInfo.classComment}
*
* Created by xuxiang on '${.now?string('yyyy-MM-dd HH:mm:ss')}'.
*/
@Service
public class ${classInfo.className}ServiceImpl implements ${classInfo.className}Service {

	@Resource
	private ${classInfo.className}Dao ${classInfo.className?uncap_first}Dao;

	/**
    * 新增
    */
	@Override
	public ResultData<String> insert(${classInfo.className} ${classInfo.className?uncap_first}) {

		// valid
		if (${classInfo.className?uncap_first} == null) {
			return new ResultData<String>(Constant.FAILURE_CODE, "必要参数缺失");
        }
		Date date =new Date();
		${classInfo.className?uncap_first}.setId(UUID.randomUUID().toString());
		${classInfo.className?uncap_first}.setCreateTime(date);
		${classInfo.className?uncap_first}.setUpdateTime(date);
		${classInfo.className?uncap_first}Dao.insert(${classInfo.className?uncap_first});
        return ResultData.SUCCESS;
	}

	/**
	* 删除
	*/
	@Override
	public ResultData<String> delete(String id) {
		int ret = ${classInfo.className?uncap_first}Dao.delete(id);
		return ret>0?ResultData.SUCCESS:ResultData.FAIL;
	}

	/**
	* 更新
	*/
	@Override
	public ResultData<String> update(${classInfo.className} ${classInfo.className?uncap_first}) {
		Date date =new Date();
		${classInfo.className?uncap_first}.setUpdateTime(date);
		int ret = ${classInfo.className?uncap_first}Dao.update(${classInfo.className?uncap_first});
		return ret>0?ResultData.SUCCESS:ResultData.FAIL;
	}

	/**
	* Load查询
	*/
	@Override
	public ResultData load(String id) {
		${classInfo.className} ${classInfo.className?uncap_first} = ${classInfo.className?uncap_first}Dao.load(id);
		return ${classInfo.className?uncap_first}==null?ResultData.FAIL:new ResultData(${classInfo.className?uncap_first});
	}

	/**
	* 分页查询
	*/
	@Override
	public PageModle<${classInfo.className}> pageList(${classInfo.className}Condition ${classInfo.className?uncap_first}Condition) {

		int currentPage = ${classInfo.className?uncap_first}Condition.getCurrentPage();
		int pageSize = ${classInfo.className?uncap_first}Condition.getPageSize();
		int begin = (currentPage-1)*pageSize;
		${classInfo.className?uncap_first}Condition.setBegin(begin);

		List<${classInfo.className}> pageList = ${classInfo.className?uncap_first}Dao.pageList(${classInfo.className?uncap_first}Condition);
		int totalCount = ${classInfo.className?uncap_first}Dao.pageListCount(${classInfo.className?uncap_first}Condition);

		// result
		PageModle<${classInfo.className}> result = new PageModle<${classInfo.className}>();

		result.setCount(totalCount);
		result.setList(pageList);
		return result;
	}

	@Override
	public List<DropDownList> getDownList() {
		return ${classInfo.className?uncap_first}Dao.getDownList();
	}
}
