const fs = require("fs");
let ejs = require('ejs')
let config = require("../config.js");
let temFun = config.temFun;
let coverFun = config.coverFun;
temFun = {
    projectName(table){
        return 'daxin'
    },
    tableComment(table){
        return table.name
    },
    tableKeys(table){
        return table.keys
    },
    tableName(table){
        return table.tableName
    },
    tableUpperName(table){
        return table.tableUpperName
    },
    tableBigUpperName(table){
        let name = table.tableUpperName;
        return name.replace(name[0],name[0].toUpperCase())
    },
    infoRules(table){
        let result = {};
        table.keys.filter(key=>key.pages.includes('info')).map(key=>{
            let rule = []
            if(key.required){
                rule.push('required')
            }
            result[key.key] = rule.join('|')
        })
        return JSON.stringify(result)
    },
    columnData(table){
        return JSON.stringify(table.keys.filter(key=>key.pages.includes('list')).map(key=>{
            return {
                prop:key.key,
                type:key.type,
                label:key.name
            }
        }))
    },
    ...temFun
}
let temData = {}
let coverData = {}
let output = config.output;
output.forEach(v=>{
    if(v.template){
        temData[v.template] = {
            source:fs.readFileSync(`bin/template/${v.template}`).toString(),
            ...v
        }
    }else{
        coverData[v.path] = {
            source:fs.readFileSync(`${v.path}`).toString(),
            ...v
        }
    }

})
module.exports = {
    genFile({data,disableFile=[]},callback){
        let tems={}
        let covers = {}
        data.forEach(v=>{
            tems[v.tableName] = {}
            Object.keys(temFun).forEach(z=>{
                tems[v.tableName][z] = temFun[z](v)
            })
            Object.keys(coverFun).forEach(z=>{
                covers[z] = covers[z]||''
                covers[z] += coverFun[z](v)
            })
        })
        data.forEach(d=>{
            Object.keys(temData).forEach(v=>{
                if(disableFile.includes(temData[v].name)){
                    return
                }

                let data = temData[v].source;
                let path = temData[v].path;

                path = ejs.render(path, tems[d.tableName]);
                data = ejs.render(data, tems[d.tableName]);
                let fileName = ejs.render(temData[v].fileName, tems[d.tableName]);
                fs.mkdirSync(`${path}`, { recursive: true })
                fileName = `${path}/${fileName}`
                fs.writeFile(fileName, data,()=>{})
            })
        })
        Object.keys(coverData).forEach(v=>{
            if(disableFile.includes(coverData[v].name)){
                return
            }
            let data = coverData[v].source
            Object.keys(covers).forEach(c=>{
                data = data.replace(new RegExp(`(\\/\\*${c}\\*\\/)`,'gm'),($0,$1)=>`${covers[c]}${$1}`)
            })
            fs.writeFile(v, data,()=>{})
        })
        callback()
    }
}

