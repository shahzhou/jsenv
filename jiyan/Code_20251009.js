const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

class JavaScriptDeobfuscator {
    constructor() {
        this.stringArray = [];
        this.stringArrayName = null;
    }

    /**
     * 主函数：解混淆JavaScript代码
     */
    deobfuscate(code) {
        try {
            const ast = parse(code, {
                sourceType: 'script',
                plugins: ['jsx']
            });

            // 第一步：检测并提取字符串数组
            this.detectStringArray(ast);

            // 第二步：执行各种解混淆操作
            this.restoreStringArrayReferences(ast);
            this.decodeHexAndUnicode(ast);
            this.constantFolding(ast);
            this.simplifyExpressions(ast);
            this.removeDeadCode(ast);

            // 第三步：生成清理后的代码
            const { code: deobfuscatedCode } = generate(ast, {
                comments: false,
                compact: false
            });

            return deobfuscatedCode;
        } catch (error) {
            console.error('Deobfuscation error:', error);
            return code;
        }
    }

    /**
     * 检测字符串数组（常见混淆技术）
     */
    detectStringArray(ast) {
        traverse(ast, {
            VariableDeclarator(path) {
                const { id, init } = path.node;

                if (init && init.type === 'ArrayExpression' &&
                    init.elements.length > 10) { // 假设数组长度大于10可能是字符串数组
                    const elements = init.elements;
                    const allStrings = elements.every(el =>
                        el && (el.type === 'StringLiteral' || el.type === 'Literal')
                    );

                    if (allStrings) {
                        this.stringArray = elements.map(el => el.value);
                        this.stringArrayName = id.name;
                        path.remove(); // 移除数组声明
                    }
                }
            }
        });
    }

    /**
     * 还原字符串数组引用
     */
    restoreStringArrayReferences(ast) {
        if (!this.stringArrayName) return;

        traverse(ast, {
            MemberExpression(path) {
                const { object, property } = path.node;

                if (object.name === this.stringArrayName &&
                    property && property.type === 'NumericLiteral') {
                    const index = property.value;
                    if (index >= 0 && index < this.stringArray.length) {
                        path.replaceWith(t.stringLiteral(this.stringArray[index]));
                    }
                }
            }
        });
    }

    /**
     * 解码十六进制和Unicode字符串
     */
    decodeHexAndUnicode(ast) {
        traverse(ast, {
            StringLiteral(path) {
                let value = path.node.value;

                // 解码十六进制序列
                value = value.replace(/\\x([0-9A-Fa-f]{2})/g, (match, p1) => {
                    return String.fromCharCode(parseInt(p1, 16));
                });

                // 解码Unicode序列
                value = value.replace(/\\u([0-9A-Fa-f]{4})/g, (match, p1) => {
                    return String.fromCharCode(parseInt(p1, 16));
                });

                path.node.value = value;
            }
        });
    }

    /**
     * 常量折叠：计算常量表达式
     */
    constantFolding(ast) {
        traverse(ast, {
            BinaryExpression(path) {
                const { left, right, operator } = path.node;

                if (t.isLiteral(left) && t.isLiteral(right)) {
                    const leftVal = left.value;
                    const rightVal = right.value;
                    let result;

                    try {
                        switch (operator) {
                            case '+': result = leftVal + rightVal; break;
                            case '-': result = leftVal - rightVal; break;
                            case '*': result = leftVal * rightVal; break;
                            case '/': result = leftVal / rightVal; break;
                            case '%': result = leftVal % rightVal; break;
                            case '|': result = leftVal | rightVal; break;
                            case '&': result = leftVal & rightVal; break;
                            case '^': result = leftVal ^ rightVal; break;
                            case '==': result = leftVal == rightVal; break;
                            case '===': result = leftVal === rightVal; break;
                            case '!=': result = leftVal != rightVal; break;
                            case '!==': result = leftVal !== rightVal; break;
                            default: return;
                        }

                        path.replaceWith(t.valueToNode(result));
                    } catch (e) {
                        // 忽略计算错误
                    }
                }
            }
        });
    }

    /**
     * 简化表达式
     */
    simplifyExpressions(ast) {
        traverse(ast, {
            UnaryExpression(path) {
                const { operator, argument } = path.node;

                if (operator === '!' && t.isUnaryExpression(argument) &&
                    argument.operator === '!') {
                    path.replaceWith(argument.argument); // !!a → a
                }
            },

            ConditionalExpression(path) {
                const { test, consequent, alternate } = path.node;

                if (t.isLiteral(test)) {
                    if (test.value) {
                        path.replaceWith(consequent);
                    } else {
                        path.replaceWith(alternate);
                    }
                }
            },

            SequenceExpression(path) {
                const expressions = path.get('expressions');
                if (expressions.length === 1) {
                    path.replaceWith(expressions[0].node);
                }
            }
        });
    }

    /**
     * 移除死代码（如永远不会执行的if语句）
     */
    removeDeadCode(ast) {
        traverse(ast, {
            IfStatement(path) {
                const test = path.get('test');

                if (test.isLiteral()) {
                    if (test.node.value) {
                        // if(true) { ... } → ...
                        if (path.node.alternate) {
                            path.replaceWith(path.node.consequent);
                        } else {
                            path.replaceWith(t.emptyStatement());
                        }
                    } else {
                        // if(false) { ... } else { ... } → ...
                        if (path.node.alternate) {
                            path.replaceWith(path.node.alternate);
                        } else {
                            path.replaceWith(t.emptyStatement());
                        }
                    }
                }
            }
        });
    }

    /**
     * 保存解混淆后的代码到文件
     */
    saveToFile(code, outputPath) {
        fs.writeFileSync(outputPath, code, 'utf-8');
        console.log(`Deobfuscated code saved to: ${outputPath}`);
    }
}

// 使用示例
function main() {
    const deobfuscator = new JavaScriptDeobfuscator();

    // 读取混淆的代码
    const inputFile = path.join(__dirname, './demo.js');
    const outputFile = path.join(__dirname, 'deobfuscated.js');

    try {
        const obfuscatedCode = fs.readFileSync(inputFile, 'utf-8');
        const cleanCode = deobfuscator.deobfuscate(obfuscatedCode);
        deobfuscator.saveToFile(cleanCode, outputFile);

        console.log('Deobfuscation completed successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = JavaScriptDeobfuscator;