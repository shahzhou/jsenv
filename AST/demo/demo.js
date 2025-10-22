const fs = require('fs'); // 文件处理
const path = require('path'); // 路径处理
const parse = require('@babel/parser').parse; // 解析
const traverse = require('@babel/traverse').default; // 遍历
const generate = require('@babel/generator').default; // 代码生成
const types = require('@babel/types'); // 类型判断
const { scope } = require('@babel/traverse/lib/cache'); // 作用域

const code = fs.readFileSync('encode.js', 'utf-8') // 源代码
const ast = parse(code); // 语法树

plugins = {
    Literal(path) {
        node = path.node // 节点
        value = node.value // 值
        if (typeof value === 'string') {  //把字符串类型的值替换成字符串字面量
            path.replaceWith(types.stringLiteral(value))
            console.log(value)  //一直在遍历这个节点，无限循环，得让它跳出
            path.skip()
        }
    }
}


plugins = {
    CallExpression(path) { // 遍历所有调用方法
        node = path.node // 节点
        if(node.callee.name !== 'o'){return}
        jscode = generate(node.arguments[0]).code //
        result = eval(jscode) // eval运行代码获得o方法传入的参数
        // res = eval(`o('${result}')`)  // 运行o方法，获得结果 undifined 这样用eval不行
        value = o(result) //结果可能是数字或者字符串
        console.log(jscode, '=>', result)
        if (typeof value === 'string') {
           path.replaceWith(types.stringLiteral(value))
        }
        if (typeof value === 'number') {
           path.replaceWith(types.numberLiteral(value))
        }

    }
}

// h = window
plugins = {
    VariableDeclarator(path) { // 遍历所有变量声明
        node = path.node
        if (node.id.name === "h" && types.isIdentifier(node.init, {name: "window"})) { // 判断h是否等于window node.init
            const binding = path.scope.getBinding("h") // 获取h的绑定
            //binding.referencePaths 获取h的所有引用
            if (binding) {
                binding.referencePaths.forEach(refPath => refPath.replaceWith(types.identifier("window"))) // 替换所有h的引用为window
                //删除掉这个 declarator
                path.remove(); //
            }
        }
    }
}

traverse(ast, plugins) // 遍历ast树
const { code: decode } = generate(ast) // 生成代码
fs.writeFileSync('decode.js', decode) // 写入文件
console.log('完成解密，解密后文件保存在decode.js')