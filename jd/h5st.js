const cryptoJS = require("crypto-js");
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

function EventTarget(){}
function Node(){}
Object.defineProperty(Node.prototype, 'removeChild', {
    value: function (tagname) {
        // console.log('removeChild>>>>>>', tagname)
    }
})
function WindowProperties(){}
function Window(){
}
Object.setPrototypeOf(Window.prototype, WindowProperties.prototype)
Object.setPrototypeOf(WindowProperties.prototype, EventTarget.prototype)
window = globalThis
window.window =  window
window.top =  window
window.self =  window
Object.setPrototypeOf(window, Window.prototype)


window = watch(window, 'window')



Element = function Element(){}
Object.setPrototypeOf(Element.prototype, Node.prototype)
Object.setPrototypeOf(Node.prototype, EventTarget.prototype)
function HTMLAllCollection(){}
function Document() {}
function HTMLHtmlElement(){}
function HTMLElement(){}
Object.setPrototypeOf(HTMLHtmlElement.prototype, HTMLElement.prototype)
Object.setPrototypeOf(HTMLElement.prototype, Element.prototype)
function HTMLBodyElement(){}
Object.setPrototypeOf(HTMLBodyElement.prototype, HTMLElement.prototype)
function HTMLDocument() {
    this.all = watch(new HTMLAllCollection(), 'document.all')
    this.documentElement = watch(new HTMLHtmlElement(), 'document.documentElement')
    this.cookie = 'unpl=JF8EAJhnNSttDElVBB9SEkUZGQ8BWwlYHh4KOmdSBFQNQ1FWHFcSEBV7XlVdWRRLFh9vZhRVWVNIUw4ZCysSEXteU11bD00VB2xXVgQFDQ8WUUtBSUt-Q1pVXFsNSxcDaVc1V11oS1U1GAMYGxJPX1NbXzhKJwRfVzVUW1pNVQwrAysTIAkJCFhfDk0SAiJkBFdUWk9WAh4AKxMgSA; __jdu=2028353643; __jdv=229668127|baidu-search|t_262767352_baidusearch|cpc|9603741117_0_e3005a8f8ccd4ead88d1fa8d94b6d834|1760046285425; areaId=19; PCSYCityID=CN_440000_440300_0; shshshfpa=14e169bc-866f-cf5d-c370-0439d9152e9a-1760046339; shshshfpx=14e169bc-866f-cf5d-c370-0439d9152e9a-1760046339; ipLoc-djd=19-1607-4773-62123; jcap_dvzw_fp=nOs1NeU2rKOfuY6vzEpHI3vRM6da9N9xeOfCC28uLVZcc7oWJh_3TaWJM0z3XTA-YElKVLTQ6cBgkX04eDO5QM66e0M=; _pst=jd_79b129b9ff1e4; _tp=2zvLvEl2mzU0PwqqIn4GR%2B8teRlheJ6Uj8VdesZT3pE%3D; pinId=FSVhe0Y_A63pRBSl5e5zwLV9-x-f3wj7; mail_times=4%2C2%2C1760048451523; mba_muid=2028353643; mba_sid=1760077490395390709517.1; 3AB9D23F7A4B3CSS=jdd036EUFB7RNSHAVBG2Q33LXNPQSFOYOZOXA7Q7IUWPQYPAVCQIZFEE77WS4LYT7QGFOTSQLWEJLXNJQRENJO2EYOJVFMUAAAAMZZTFSNRYAAAAACLPMYLLLIH2MTYX; _gia_d=1; wlfstk_smdl=s989a1e8ztqgppobprmyxuryg9g6mske; TrackID=1M1Zb9dxchACdrv7cRuOmwp6Sl8g3sZJhbHjLxJF89AySjQPcp_bZkfxjrIvbIXtSRTTXnnUpxut5fso8Qakl_n2mShibROFIoBPCRkPqseU; thor=FC75B3E3A94BAE8F9E6382AF53704931E525C451E12253A361B86E5ECDD4FCB0A96765F9368A4F38B7DEE12EFA2B23B3437E09957943B131FC3142A170ED25716E5E27F2B170BEC51B222996004F95CFD6C6CEDFBC2793E7348D97AE1D7D4B596A04635DF9509ED412B01A46353A79A6A8AB631B847AED92982039711C59541DFC8B00C944DAAE8F48F7D989B35A7C2848A6C6BD6AFB0102E0CE9EE25A6FB0A6; light_key=AASBKE7rOxgWQziEhC_QY6yacY8LneoAlrfS9OfQRxNpr6pQ0jkg8u4iKbJG81F4h2tzQmI4; pin=jd_79b129b9ff1e4; unick=jd_l2g81gkp57p474; ceshi3.com=000; __jda=143920055.2028353643.1760045198.1760069438.1760076633.5; __jdc=143920055; shshshfpb=BApXSBQLDz_xAF8esdCgh6XG5bU5i059ABiJFZBZo9xJ1MrUW9Y62; cn=0; flash=3_zb_iGdGLEjWbgs2NcjzpG_CdjY6kZ2L8WUhBaJHfQ67aaUsBtBO-aBrXSHMG1YjDMsa8zRvzTEz4BAOPzPl9iQTWqN9KFbP4clL9j_6Zo2EHZxvy8USEQlZ3AqUcVHkdEvMe0gOJqs7FnnK1Be7HjYcpRW6QCEaiooHqBKbUh-cXaWMjHix_SV**; 3AB9D23F7A4B3C9B=6EUFB7RNSHAVBG2Q33LXNPQSFOYOZOXA7Q7IUWPQYPAVCQIZFEE77WS4LYT7QGFOTSQLWEJLXNJQRENJO2EYOJVFMU; __jdb=143920055.7.2028353643|5.1760076633; sdtoken=AAbEsBpEIOVjqTAKCQtvQu170nx3KjjGZoF7VtJcDIzAy5r39S6b9hbj1jwqyGasOC5ZlopBAXvfrkOz0CeHg8nloIzjW-HWMojeNJprkxlAeX5FbDP7dvY-mv-F6n1fiR0hGvgOGMrkMtNX042IwQ'
    this.body = watch(new HTMLBodyElement(), 'document.body')
    this.referrer = 'https://www.jd.com/'
}
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype)
function HTMLHeadElement() {
 //removeChild是node层，补在Node里
}

Object.setPrototypeOf(HTMLHeadElement.prototype, HTMLElement.prototype)
function HTMLScriptElement(){
    //到网页找到创建script的父标签
    this.parentNode = watch(new HTMLHeadElement() , 'document.createElement.script.parentNode')
}
function HTMLCanvasElement(){
}
Object.setPrototypeOf(HTMLCanvasElement.prototype, HTMLElement.prototype)
Object.setPrototypeOf(HTMLScriptElement.prototype, HTMLElement.prototype)
//createElement 方法不在HTMLDocument层 而在Document
Object.defineProperty(Document.prototype, 'createElement', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(tagName) {
        console.log("document.createElement('" + tagName + "')")
        if (tagName === 'script') {
            return watch(new HTMLScriptElement(), 'document.createElement("script")')
        }
        if (tagName === 'canvas') {
            return watch(new HTMLCanvasElement(), 'document.createElement("canvas")')
        }
    }
})
Object.defineProperty(Document.prototype, 'getElementsByTagName', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(tagName) {
        console.log("document.getElementsByTagName('" + tagName + "')")
    }
})
Object.defineProperty(Document.prototype, 'querySelector', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(tagName) {
        console.log("document.querySelector('" + tagName + "')")
    }
})
Object.defineProperty(Document.prototype, 'createEvent', {
    value: function(tagName) {
    }
})

window.document = watch(new HTMLDocument(), 'document')




require('./code')


params = {
    "enc": "utf-8",
    "pvid": "4eda659c5ff34cfa9e70a62d171b22ae",
    "area": "19_1607_4773_62123",
    "page": 10,
    "new_interval": true,
    "s": 92
}
paramsH5sign = {
    appid: 'search-pc-java',
    functionId: "pc_search_searchWare",
    client: 'pc',
    clientVersion: '1.0.0',
    t: new Date().getTime(),
    body: cryptoJS.SHA256(JSON.stringify(params)).toString()
  }
console.log('paramsH5sign.t', paramsH5sign.t)
// _$Gk.prototype.sign = this
// h5st = this._$sdnmd(_$Gf)
// 需要找到这个类_$Gk
function get_h5st() {
   window.PSign = new ParamsSign()
    res = window.PSign._$sdnmd(paramsH5sign)
    return res
}
res = get_h5st()

console.log('h5st:',res)
console.log('h5st:',res.h5st)
console.log('h5st:',res.t)