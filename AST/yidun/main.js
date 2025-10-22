const fs = require('fs'); // 文件处理
const path = require('path'); // 路径处理
const parse = require('@babel/parser').parse; // 解析
const traverse = require('@babel/traverse').default; // 遍历
const generate = require('@babel/generator').default; // 代码生成
const types = require('@babel/types'); // 类型判断
const { scope } = require('@babel/traverse/lib/cache');
const {call} = require("@babel/traverse/lib/path/context"); // 作用域

code = fs.readFileSync('encode.js', 'utf-8')
ast = parse(code);

//编写插件
function decrypt_code(AST) {
    let var_node = AST.program.body[0].expression.callee.body.body[0]
    let func_node = AST.program.body[0].expression.callee.body.body[1]
    let code_str = generate(var_node).code + generate(func_node).code
    // console.log(code_str)
    eval(code_str)
    traverse(ast, {
        //a0_0x1e60(312)
        CallExpression(path) { // 遍历所有调用方法
            node = path.node // 节点
            if(node.callee.name !== 'a0_0x1e60'){return}
            if (node.arguments.length !== 1) {
                return
            }
            if (!types.isNumericLiteral(node.arguments[0])) {
                return
            }
            jscode = generate(node.arguments[0]).code //
            result = eval(jscode)
            value = a0_0x1e60(result) //结果可能是数字或者字符串
            console.log(jscode, '=>', result, value)
            if (typeof value === 'string') {
               path.replaceWith(types.stringLiteral(value))
            }
        }
    })
}

decrypt_code(ast)

const { code: decode } = generate(ast) // 生成代码
fs.writeFileSync('decode.js', decode) // 写入文件
console.log('完成解密，解密后文件保存在decode.js')