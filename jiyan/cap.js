
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

window = global
window.crypto = {}
document = {
    getElementsByTagName: function(args) {
        console.log('getElementsByTagName>>>', args)
    },
    head:{},
    documentElement: {},
    createElement:function(args) {
        console.log('createElement>>>', args)
    }
}
document.body = {}

location = {
    "ancestorOrigins": {},
    "href": "https://www.geetest.com/adaptive-captcha",
    "origin": "https://www.geetest.com",
    "protocol": "https:",
    "host": "www.geetest.com",
    "hostname": "www.geetest.com",
    "port": "",
    "pathname": "/adaptive-captcha",
    "search": "",
    "hash": ""
}

navigator = {
    "appName": "Netscape",
    "webdriver":false,
    "platform": "Win32",
    "userAgent": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "appVersion": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
}
get_enviroment(proxy_array)
require("./cap4")
//点选轨迹几乎不做处理
e = '{"passtime":4248,"userresponse":[[2600,6621],[4267,7621],[5700,2224]],"device_id":"","lot_number":"c17ad80cc1f8495792eb70ef8e1905d8","pow_msg":"1|0|md5|2025-10-08T00:01:12.598179+08:00|24f56dc13c40dc4a02fd0318567caef5|c17ad80cc1f8495792eb70ef8e1905d8||4ce04d1c28456614","pow_sign":"889472e2fe83b50b0d906fd2ffe262e4","geetest":"captcha","lang":"zh","ep":"123","biht":"1426265548","Jkiu":"u6i1","0cc1f849":{"17ad80cc":{"1f84":"0cc1f8"}},"em":{"ph":0,"cp":0,"ek":"11","wd":1,"nt":0,"si":0,"sc":0}}'

console.log(123456,window.zzz(e), window.zzz(e).length)