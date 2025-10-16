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
set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");
globalThis.safefunction=(func) =>{
set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol,func.name || ''}() { [native code] }`);
};//导出函数到globalThis，更改原型上的toString为自己的toString。这个方法相当于过掉func的toString检测点
}).call(globalThis);

// function test1() { return "hello"; }

Function.prototype.bind.toString = function bind(){
    return "function bind() { [native code] }"
}

test123 = function test1() { return "hello"; };safefunction(test123)

// test1.toString = function (){
//     return 'function test1() { [native code] }'
// }
t = test123()
console.dir(t.toString(),{Hidden:true})
console.dir(test123.toString(),{Hidden:true}) //'function test1() { [native code] }'

function Navigator() {
    // 相当于时navigator.userAgent赋值，补环境不推荐这样写
    //this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64'
}
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64'
navigator = new Navigator()
// Object.getOwnPropertyDescriptor(Navigator.prototype, 'userAgent')
console.log(Object.getOwnPropertyDescriptor(navigator, 'userAgent'))
console.log(Object.getOwnPropertyDescriptor(Navigator.prototype, 'userAgent'))