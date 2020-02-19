
/**
 * 封装
 * 'mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile'
 * 'appendFile', 'writeFile'
 *
 *
 * */
const path = require('path')
const fs = require('fs')

class GeneratorPromise{
    constructor(){
        this.arr = ['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile']
        this.writeClass = ['appendFile', 'writeFile']
        this.box = []
    }
    init() {
        this.arr.forEach(item => {
            exports[item] = (mypath, newFilePath = '') => { // 挂载到exports对象上，导出的是一个对象
                const PATH = this.newpath(mypath, newFilePath) // 处理路径
                if( PATH instanceof Array ) {
                    return this.promise(item, PATH[0], PATH[1])
                }else {
                    return this.promise(item, PATH)
                }
            }
        })
        this.writeClass.forEach(writeitem => {
            exports[writeitem] = (PATH, content) => {
                return this.promise(writeitem, PATH, content)
            }
        })
    }
    promise(item, PATH, powerfulParam = '') {
        return new Promise((resolve, reject) => {
            const fn = (err, res) =>{
                if (err) reject(err)
                resolve(res || '')
            }
            this.box = []
            item === 'readFile' ? this.box.push('utf-8') : null
            if( item === 'copyFile' || item === 'appendFile' || item === 'writeFile' ){
                this.box.push(powerfulParam)
            }
            fs[item](PATH, ...this.box, fn)
        })
    }
    newpath(mypath, newFilePath) {
        if(newFilePath){
            return [path.resolve(path.resolve(), mypath), path.resolve(path.resolve(), newFilePath)]
        }else{
            return path.resolve(path.resolve(), mypath)
        }
    }
}
new GeneratorPromise().init()


/**
 * 调用
 *
 *
   const { readFile } = requrie('commonModule.js')
    readFile('./https/https.txt').then((res) => {
        console.log(res)
    })
 *
 * */







