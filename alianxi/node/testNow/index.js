const path = require("path");
const fs = require("fs");
module.exports = class testNow {

    genJsetSource(sourcePath=path.resolve("./")){
        const testPath = `${sourcePath}/__test__`;
        if(!fs.existsSync(testPath)){
            fs.mkdirSync(testPath);
        }
        let list = fs.readdirSync(sourcePath)
        list
            .map(v=>`${sourcePath}/${v}`)
            .filter(v=>fs.statSync(v).isFile())
            .filter(v=>v.indexOf(".spec")===-1)
            .map(v=>this.genTestFile(v));
    }

    genTestFile(filename){
        const textFileName = this.getTestFileName(filename);
        if(fs.existsSync(textFileName)){
            console.log('该测试代码已存在',textFileName);
            return
        }
        const mod = require(filename);
        let source;
        if(typeof mod ==="object"){
            source= Object.keys(mod).map(v=>this.getTestSource(v,path.basename(filename),true)).join("\n")
        }else if(typeof mod === "function"){
            const basename = path.basename(filename);
            source = this.getTestSource(basename.replace(".js",""),basename);
        }
        fs.writeFileSync(textFileName,source);
    }

    getTestSource(methodName, classFile, isClass = false) {
        console.log('methodName', methodName);
        return `test("TEST ${methodName}",()=>{
const ${isClass ? '{' + methodName + '}' : methodName}=require("../${classFile}")
const ret = ${methodName}();
// expect()
//      toBe("test return");
})
`
    }
    getTestFileName(fileName) {
        const dirName = path.dirname(fileName);
        const baseName = path.basename(fileName);
        const extName = path.extname(fileName);
        const testName = baseName.replace(extName, `.spec${extName}`)
        return path.format({
            root: dirName + "/__test__/",
            base: testName
        })
    }
}