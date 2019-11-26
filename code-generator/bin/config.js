module.exports = {
    output:[
    //后端模板文件
        {
            template: 'condition.tem',
            path:'../web-java/src/main/java/com/<%= projectName %>/<%= tableUpperName %>/model',
            fileName:'<%= tableBigUpperName %>Condition.java',
            name: 'condition.tem'
        },{
            template: 'controller.tem',
            path:'../web-java/src/main/java/com/<%= projectName %>/<%= tableUpperName %>/controller',
            fileName:'<%= tableBigUpperName %>Controller.java',
            name: 'controller.tem'
        },{
            template: 'dao.tem',
            path:'../web-java/src/main/java/com/<%= projectName %>/<%= tableUpperName %>/dao',
            fileName:'<%= tableBigUpperName %>Dao.java',
            name: 'dao.tem'
        },{
            template: 'model.tem',
            path:'../web-java/src/main/java/com/<%= projectName %>/<%= tableUpperName %>/model',
            fileName:'<%= tableBigUpperName %>.java',
            name: 'model.tem'
        },{
            template: 'mybatis.tem',
            path:'../web-java/src/main/java/com/<%= projectName %>/<%= tableUpperName %>/mapper',
            fileName:'<%= tableBigUpperName %>Mapper.xml',
            name: 'mybatis.tem'
        },{
            template: 'service.tem',
            path:'../web-java/src/main/java/com/<%= projectName %>/<%= tableUpperName %>/service',
            fileName:'<%= tableBigUpperName %>Service.java',
            name: 'service.tem'
        },{
            template: 'service_impl.tem',
            path:'../web-java/src/main/java/com/<%= projectName %>/<%= tableUpperName %>/service/impl',
            fileName:'<%= tableBigUpperName %>ServiceImpl.java',
            name: 'service_impl.tem'
        },
    //前端模板文件
    {
        template: 'list.tem',
        path:'../web-vue/src/views/<%= tableName %>',
        fileName:'<%= tableName %>-list.vue',
        name: 'list.tem'
    },{
        template: 'info.tem',
        path:'../web-vue/src/views/<%= tableName %>',
        fileName:'<%= tableName %>-info.vue',
        name: 'info.tem'
    },{
        template: 'mock.tem',
        path:'../web-vue/src/mock',
        fileName:'<%= tableName %>.js',
        name: 'mock.tem'
    },
    //前端路由，菜单，mock,请求路径的配置文件，单文件覆盖
    {
        path:'../web-vue/src/router/router.js',
        name: 'router.js'
    },{
        path:'../web-vue/src/mock/index.js',
        name: 'mock-index.js'
    },{
        path:'../web-vue/src/mock/menu.js',
        name: 'menu.js'
    },{
        path:'../web-vue/src/api/path.js',
        name: 'path.js'
    }],
    /*routers*/
    coverFun:{
        models(table){
            return `'${table.tableUpperName}',\r\n\t`
        },
        menus(table){
            return `{
        name: "${table.name}",
        url: "/${table.tableUpperName}",
        icon:""
    },`
        },
        useMock(table){
            return `Mock.mock(/\\/${table.tableUpperName}\\//,(options)=>{
    let urls = options.url.split('/');
    return ${table.tableUpperName}[urls[urls.length-1]](options);
});\r\n`
        },
        importMock(table){
            return `import ${table.tableUpperName} from "./${table.tableName}-mock";\r\n`
        },
        routers(table){
            let name = table.tableUpperName;
            let tableName = table.tableName;
            return `{
        path: '${name}',
        name: '${name}',
        meta:{
          title:"${table.name}"
        },
        component: () => import('@/views/${tableName}/${tableName}-list.vue')
      },`
        },
    },
    temFun:{
    },
}
