function HTMLDocument() {
}
function obj_toString(obj,name) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: name
    });
}
function HTMLElement() {
    // this.div = new HTMLDivElement()
    this.getItem = function() {
        console.log("HTMLElement.getItem")
    }
}
Object.defineProperty(HTMLElement.prototype, 'getElementsByTagName', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(tagname) {
        console.log("document.getElementsByTagName('" + tagname + "')")
    }
})

Object.setPrototypeOf(HTMLDivElement.prototype, HTMLElement.prototype)
function HTMLDivElement() {
    this.nodeName="DIV"
    this.offsetHeight = 0;
    this.offsetLeft = 0;
    this.offsetTop = 0;
    this.offsetWidth = 0;
}


// console.log(11111111111, HTMLElement.prototype, new HTMLDivElement().getElementsByTagName)

r = function(){
return 1+1,3, 6
}
// console.log(r())

// console.dir(HTMLDivElement, {
//     showHidden: true
// })
div = new HTMLDivElement()
div.toString = function() {
    return '[object HTMLDivElement]'
}
obj_toString(HTMLDivElement, "HTMLDivElement")
HTMLDivElement.toString = function() {
    return "function HTMLDivElement() { [native code] }"
}
console.dir(HTMLDivElement,  {Hidden: true})
console.log(999,HTMLDivElement.toString())
obj_toString(div, 'HTMLDivElement')  //[Symbol(Symbol.toStringTag)]: 'HTMLDivElement'
// console.dir(div, {
//     showHidden: true
// })
// console.log(555, div.toString())
// console.log(222, HTMLDivElement.toString())
obj_toString(HTMLElement,'HTMLElement')
console.log(666, HTMLElement.toString())
// 对obj进行toString属性定义


// obj_toString(new r(), "Function")
// console.log(333, r.toString())

console.log(div.getElementsByTagName(123)) //true
console.log(HTMLElement.prototype.getElementsByTagName(666)) //true
console.log(new HTMLElement().getElementsByTagName(11111)) //true
// console.log(HTMLElement.getElementsByTagName(999)) //false
// console.log(HTMLDivElement.getElementsByTagName(888)) //false
// console.log(HTMLElement.getItem()) //false
// console.log(HTMLElement.prototype.getItem()) //false
// console.log(div.getItem()) //false
console.log(new HTMLElement().getItem()) //true