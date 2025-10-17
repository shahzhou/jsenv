
//重写WebGL API（补环境）需要重写WebGL渲染上下文的方法，返回固定的、常见的硬件信息
(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;

    HTMLCanvasElement.prototype.getContext = function(type, attributes) {
        if (type === 'webgl' || type === 'webgl2') {
            const context = originalGetContext.call(this, type, attributes);

            // 重写getParameter方法
            context.getParameter = function(p) {
                const overrides = {
                    0x1F00: 'Google Inc. (Apple)', // VENDOR
                    0x1F01: 'Apple M1', // RENDERER
                    // ... 其他需要覆盖的参数
                };
                return overrides[p] || originalGetParameter.call(this, p);
            };

            // 重写getExtension方法
            const originalGetExtension = context.getExtension;
            context.getExtension = function(name) {
                // 返回null禁用某些高级扩展
                if (name === 'WEBGL_debug_renderer_info') {
                    return null;
                }
                return originalGetExtension.call(this, name);
            };
            return context;
        }
        return originalGetContext.call(this, type, attributes);
    };
})();


// 在页面加载前执行此代码（如通过CDP或addInitScript）
// 在页面执行前，通过注入JS代码来重写HTMLCanvasElement的相关方法，返回一个固定的、常见的图片哈希值
(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, attributes) {
        if (type === '2d') {
            const context = originalGetContext.call(this, type, attributes);
            // 重写toDataURL方法，返回固定图像
            const originalToDataURL = context.toDataURL;
            context.toDataURL = function(type, encoderOptions) {
                // 判断是否是用于指纹的小Canvas
                if (this.canvas.width > 200 || this.canvas.height > 200) {
                    return originalToDataURL.call(this, type, encoderOptions);
                }
                // 返回一个预设的、真实的Canvas数据URL Base64
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAIi0lEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmQIBgAQh6AgQIFg9AgACBFRAL6AkQIFg8AAECBFZALKAnQIBg8QAECBBYAbGAngABgsUDECBAYAXEAnoCBAgWD0CAAIEFEAvoCRAgWDwAAQIEFkAsoCdAgGDxAAQIEFgBsYCeAAGCxQMQIECAANECBAgQIFo8AAECBIgWIECAwAqIBfQECBAsHoAAAQIrIBbQEyBAsHgAAgQIrIBYQE+AAMHiAQgQILACYgE9AQIEiwcgQIDA';
            };
            return context;
        }
        return originalGetContext.call(this, type, attributes);
    };
})();




//隐藏代码 让toString()跟浏览器返回值一样
(()=>{
//取原型链上的toString
const $toString = Function.toString;
//取方法名 reload
const myFunction_toString_symbol = Symbol('('.concat('',')_',(Math.random()+'').toString(36)));
const myToString =function() {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    }
function set_native(func,key,value){
    Object.defineProperty(func,key,{
        "enumerable":false, //不可枚举
        "configurable":true,//可配置
        "writable":true, //可写
        "value": value
        })
}
delete Function.prototype['toString'];//删除原型链上的toString
set_native(Function.prototype, "toString",myToString);//自定义一个getter方法，其实就是一个hook
// 套个娃，保护一下我们定义的toString，避免js对toString再次toString，如:location.reload.tostring.toString()否则就暴了
set_native(Function.prototype.toString, myFunction_toString_symbol, "function tostring() { [native code] }");
globalThis.safefunction=(func) =>{
set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol,func.name || ''}() { [native code] }`);
};//导出函数到globalThis，更改原型上的tosting为自己的toString。这个方法相当于过掉func的toString检测点
}).call(globalThis);

Function.prototype.bind.toString = function bind(){
    return "function bind() { [native code] }"
}
function get_enviroment(proxy_array) {
    for (var i = 0; i < proxy_array.length; i++) {
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return target[property];\n' +
            '    },\n' +
            '    set: function(target, property, value, receiver) {\n' +
            '        console.log("方法:", "set  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return Reflect.set(...arguments);\n' +
            '    }\n' +
            '}'
        eval('try{\n' + proxy_array[i] + ';\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
    }
}
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen']

console.log(123456)

//对所有对象都可以进行检测
//0.1版本
function watch(obj, name) {
    return new Proxy(obj, {
        //target 被代理的原始对象
        // property 被访问的属性名
        // receiver 最初被调用的对象（通常是代理实例或继承对象）
        get: function(target, property, receiver) {
            try {
                if (typeof target[property] === "function") {
                    console.log("对象 => " + name + ", 读取属性: " + property + ", 值为: function, 类型为: " + typeof target[property]);
                } else {
                    console.log("对象 => " + name + ", 读取属性: " + property + ", 值为: " + target[property] + ", 类型为: " + typeof target[property]);
                }
            } catch (e) {
                // 捕获错误但不处理（保持原代码逻辑）
            }
            return target[property];
        },
        set: function(target, property, newValue, receiver) {
            try {
                console.log("对象 => " + name + ", 设置属性: " + property + ", 值为: " + newValue + ", 类型为: " + typeof newValue);
            } catch (e) {
                // 捕获错误但不处理（保持原代码逻辑）
            }
            return Reflect.set(target, property, newValue, receiver);
        }
    });
}
// global = watch(global, 'global'); //先查看是否有global检测 有的话就不能直接使用window=global

//0.2
function watch(obj, name) {
    const isProxyActive = Symbol("isProxyActive");
    return new Proxy(obj, {
        get: function(target, property, receiver) {
            try {
                const value = target[property];
                if (value === undefined && !receiver[isProxyActive]) {
                    const protoChainNeeded = !Object.getPrototypeOf(target).hasOwnProperty(property);
                    const descriptor = Object.getOwnPropertyDescriptor(target, property) || {};
                    const toStringDesc = descriptor.toString || (descriptor.get && descriptor.get.toString());
                    console.log(`${name}.${property}  读取: ${String(value)} (${typeof value}), 补原型链: ${protoChainNeeded}, toString: ${toStringDesc || '无'}`);
                }
            } catch (e) {
                // 错误处理
            }
            return target[property];
        },

        set: (target, property, newValue, receiver) => {
            try {
                if (!receiver[isProxyActive]) {
                    const displayValue = String(newValue);
                    if (displayValue.length <= 50) {
                        const protoChainNeeded = !Object.getPrototypeOf(target).hasOwnProperty(property);
                        const descriptor = Object.getOwnPropertyDescriptor(target, property) || {};
                        const toStringDesc = descriptor.toString || (descriptor.get && descriptor.get.toString());
                        console.log(`${name}.${property} 设置: ${displayValue} (${typeof newValue}), 补原型链: ${protoChainNeeded}, toString: ${toStringDesc || '无'}`);
                    }
                }
            } catch (e) {
                // 错误处理
            }
            return Reflect.set(target, property, newValue, receiver);
        }
    });
}


//0.3
function watch(obj,name,visited  = new WeakSet()) {//防止循环引用导致无限递归
    if(obj === null || typeof obj !== 'object' || visited.has(obj)) {
        return obj;
        }
    visited.add(obj);
    //俭查原型链访问
    const checkPrototypeChain = (target,property) =>{
        let current = target; //属性直接存在于当前对象上
        while(current){
            if(Object.prototype.hasOwnProperty.call(current, property)){
                return false;
            }
            current = Object.getPrototypeOf(current);
            if(current && current !== Object.prototype && current !== null) {
                console.log(`原型链检测:true (对象:${name}，属性:${property})`);
                return true;
                }
                }
        return false;
    }

    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                //排除一些不常贝的或可能导致问题的属性
                if (typeof property === 'symbol' || property === 'constructor' || property === '__proto__') {
                    return Reflect.get(target, property, receiver);
                }
                // ***核心修改:针对 window.navigator.platform 的特殊处理 ***
                if (name === "navigator" && property === "platform") {
                    console.log(`对象 => ${name}，特殊处理属性: ${String(property)}, 模拟值为 Win32`);
                    return "Win32"; // 直接返回模拟值
                }

                const value = Reflect.get(target, property, receiver);

                //深度监听嵌套对象
                if (typeof value === 'object' && value !== null) {
                    //为嵌套对象生成一个更具体的名称
                    const nestedName = `${name}.${String(property)}`;
                    return watch(value, nestedName, visited);
                }
                //只在值为undefined 时打印属性访问信息
                if (value === undefined) {
                    console.log(`对象 =>${name}，读取属性:${String(property)}，值为: undefined`)
                }

                //检测原型链访问(无论值是否为undefined，都检测)
                //如果属性不在 target 上，但通过原型链访问到，则标记为true
                if (!Object.prototype.hasOwnProperty.call(target, property)) {
                    checkPrototypeChain(target, property);
                }
                return value;

                //检测描述符(无论值是否为undefined，都检测)
                const descriptor = Object.getOwnPropertyDescriptor(target, property);
                if (descriptor) {
                    if (descriptor.get || descriptor.set) {
                        console.log(`特殊检测:存在Getter/Setter (对象:${name}，属性:${String(property)})`);
                    }
                    if (!descriptor.writable && !descriptor.get) {
                        onsole.log(`特殊检测:只读属性 (对象:${name}，属性:${String(property)})`);
                    }
                    if (!descriptor.configurable) {
                        console.log(`特殊检测:不可配置属性 (对象:${name}，属性:${String(property)})`);
                    }
                }
            } catch (e) {
                console.error(`Error in get trap for ${name}.${String(property)}`, e);
            }
            return Reflect.get(target, property, receiver);
        },
        set: function (target, property, newValue, receiver) {
            try {
                console.log(`对象 => ${name}, 设置属性:${String(property)},值为:`, newValue);
                } catch (e) {
                    console.error(`Error in set trap for ${name}.${String(property)}:`, e);
            }
             return Reflect.set(target, property, newValue, receiver);
        },
        has: function(target, property) {
            console.log(`对象 => ${name}, in 操作符检测属性：${String(property)}`);
            return Reflect.has(target, property);
        },
        deleteProperty: function(target, property) {
            console.log(`对象 => ${name}, 删除属性：${String(property)}`);
            return Reflect.deleteProperty(target, property);
        },
        ownKeys:  function(target) {
            console.log(`对象 => ${name}, 获取自身属性键`);
            return Reflect.ownKeys(target);
        },
        defineProperty:  function(target, property, descriptor) {
            console.log(`对象 => ${name}, 定义属性：${String(property)}`);
            return Reflect.defineProperty(target, property, descriptor);
        },
        setPrototypeOf: function(target, property) {
            console.log(`特殊检测:setPrototypeOf 被调用 (对象: ${name}）`);
            return Reflect.setPrototypeOf(target, property);
        },
        getPrototypeOf: function(target) {
            console.log(`特殊检测:getPrototypeOf 被调用 (对象: ${name}）`)
            return Reflect.getPrototypeOf(target);
        }
    });
}
// 2.基于原型链补全环境
delete __filename
delete __dirname
delete global

window = globalThis

function Document() {}
Document.prototype.documentElement = watch({
    tagName : 'HTML',
    style:{},
    scrollHeigh:1896,
    scrollLeft:0,
    scroLLTop:0,
    scrollwidth: 1788,
    getAttribute:function(key) {
        return this.attributes(key) || null
    }}, 'Document.prototype.documentElement')
document = new Document()


navigator = {}
location = {}
history = {}

function Screen(){}

Screen.prototype = watch({
    availHeight: 450,
    availLeft: 2,
    availTop:0,
    availwidth: 1794,
    colorDepth: 24,
    height: 450,
    isExtended: false,
    onchange: null,
    pixelDepth: 24,
    width: 1794
}, 'Screen.prototype')
screen = new Screen()
// screen = {}

function storage(){}
//为了防止后面被覆盖 Object.defineProperty允许你定义或修改对象的属性特性 在原本基础上添加方法 比如getItem方法 等
//Object.defineProperty(obj, prop, descriptor)
// obj：要在其上定义属性的对象
// prop：要定义或修改的属性名称
// descriptor：属性描述符对象
Object.defineProperty(Storage.prototype,"getItem", {
    value: function getItem(key) {
        console.log("localstorage.getItem ===>", key)
    }
})
LocalStorage = new storage()
// localStorage = {}


window = watch(window,"window")
document = watch(document,"document")
navigator =watch(navigator,"navigator")
location =watch(location,"location")
history = watch(history,"history")
screen =watch(screen,"screen")
localStorage = watch(localstorage,"localstorage")





// 对obj进行toString属性定义
function obj_toString(obj,name) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: name
    });
}

// 检测是否有tostring 描述符 检测
(function () {
    const originalToString = Function.prototype.toString;
    Function.prototype.toString=function(){
    console.log('发现调用了toString-->',originalToString.apply(this));
    //debugger
    return originalToString.apply(this);
        };
})();

get_enviroment(proxy_array)

function Window(){
}
function HTMLDocument() {
}
function Screen() {
}
function Navigator() {
}
function Localtion() {
}
function History() {
    this.scrollRestoration = "manual"
    this.length = 2
    this.state = {idx: 0}
}