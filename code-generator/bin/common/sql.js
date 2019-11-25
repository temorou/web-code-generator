let mysql=require('mysql');
let file = require('./file.js');

let pageConfig = {
    condition:{
        reg:/(name)|(status)|(date)/i
    },
    list:{
        ignoreReg:/id$/i
    },
    info:{
        ignoreReg:/(create)|(update)|(^id$)/i
    }
}

let comConfig = {
    date:{
        reg:/date/i
    },
    select:{
        reg:/id$/i
    },
    switch:{
        reg:/^status$/i
    }
}

module.exports = {
    getTables(data,callback){
        let connection = mysql.createConnection({
            host: data.host,
            user: data.user,
            password: data.password,
            database: data.database
        });
        connection.query('SHOW TABLE STATUS', function (error, results) {
            callback(results)
        });
        connection.end()
    },
    getConfigs({database,data},callback){
        let connection = mysql.createConnection({
            host: database.host,
            user: database.user,
            password: database.password,
            database: database.database
        });
        let tables = [];
        data.forEach(v=>{
            tables.push({
                tableName:v.Name,
                keys:[],
                primeKey:[],
                name:v.Comment
            })
        })
        let promises =[]
        tables.forEach(v=>{
            promises.push(new Promise(resolve => {
                connection.query(`SHOW FULL COLUMNS FROM ${v.tableName}`, function (r, tables) {
                    if (r) throw r;
                    v.tableUpperName = v.tableName.replace( /_([a-z])/g, function( $0, $1 ) {
                        return $1.toUpperCase();
                    });
                    v.tableName = v.tableName.replace(/_/g,'-');
                    tables.forEach(table=>{
                        let types = table.Type.match(/^([^\(]*)(\(.*\))?$/)
                        let type = types[1];
                        if (type.startsWith("int") || type.startsWith("tinyint") || type.startsWith("smallint")) {
                            type = 'Integer';
                        } else if (type.startsWith("bigint")) {
                            type = 'Long';
                        } else if (type.startsWith("float")) {
                            type = 'Float';
                        } else if (type.startsWith("double")) {
                            type = 'Double';
                        } else if (type.startsWith("datetime") || type.startsWith("timestamp")) {
                            type = 'Date';
                        } else if (type.startsWith("varchar") || type.startsWith("text") || type.startsWith("char")) {
                            type = 'String';
                        } else if (type.startsWith("decimal")) {
                            type = 'BigDecimal';
                        }
                        let pages = [],com='input';
                        let key = table.Field.replace( /_([a-z])/g, function( $0, $1 ) {
                            return $1.toUpperCase();
                        })
                        if(table.Key=='PRI'){
                            v.primeKey.push(key)
                        }
                        Object.keys(comConfig).forEach(comName=>{
                            if(comConfig[comName].reg.test(key)){
                                com=comName;
                            }
                        })
                        Object.keys(pageConfig).forEach(pageName=>{
                            let page = pageConfig[pageName]
                            if(page.reg&&!page.reg.test(key)){
                                return
                            }
                            if(page.ignoreReg&&page.ignoreReg.test(key)){
                                return
                            }
                            pages.push(pageName)
                        })
                        pages = pages.join(',');
                        v.keys.push({
                            key,
                            type,
                            field:table.Field,
                            name:table.Comment,
                            max:types[2]&&types[2].replace(/\(|\)/g,''),
                            required:table.Null!='YES',
                            pages,
                            com
                        })
                    })
                    resolve()
                });
            }))
        })
        Promise.all(promises).then(()=>{
            connection.end()
            callback(tables)
        })
    },
    genFile(data,callback){
        file.genFile(data,callback)
    }
}