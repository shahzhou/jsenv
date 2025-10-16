var  my_parse  = JSON.parse;
JSON.parse = function (params) {
    console.log('json_parse:', params);
    return  my_parse(params);
};

function B(){
    this.c = 3
}
function A(){
    this.a = 1
}
A.prototype = {
    b : 2
}
// 设置原型链
Object.setPrototypeOf(A.prototype, B.prototype);

console.log(A.prototype)