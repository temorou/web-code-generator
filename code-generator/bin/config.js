module.exports = {
    output:[{
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
    },{
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
