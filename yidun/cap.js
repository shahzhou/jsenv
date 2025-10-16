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
function watch(obj, name) {
    return new Proxy(obj, {
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
window = global;
delete Buffer

window.addEventListener = function() {}

window =  watch(window, 'window')
document = {createElement: function (tagName) {
        console.log("document.createElement('" + tagName + "')")
        if (tagName === 'div'){
            return watch({
                getAttribute: function (name) {
                    console.log("div.getAttribute('" + name + "')")
                    if (name === 'className') {
                        return watch({}, 'div.className')
                    }
                }
            }, 'div')
        }
    },
        body: {},
    addEventListener: function() {},
    createEvent: function (type){
        console.log("document.createEvent('" + type + "')")
    },
    documentElement: watch( {}, 'document.documentElement'),
    getElementById: function (id){
        console.log(
            "document.getElementById('" + id + "')"
        )
    }
    }
document.cookie = '__snaker__id=T7rYIhhjnXO6rn62; NTES_P_UTID=Yzu4dxFgDTjOp8PW05II1NrGZxYcBcNu|1758855801; P_INFO=shaohaozhou@163.com|1758855801|0|mail163|00&99|gud&1758855531&mailmaster_ios#gud&440300#10#0#0|&0|mailmaster_ios|shaohaozhou@163.com; nts_mail_user=shaohaozhou@163.com:-1:1; timing_user_id=time_9AIwk2J46Z; _ga=GA1.1.432572319.1759977623; _clck=s5p1gq%5E2%5Eg00%5E0%5E2108; _ga_C6TGHFPQ1H=GS2.1.s1759977622$o1$g0$t1759977676$j6$l0$h0; Hm_lvt_4671c5d502135636b837050ec6d716ce=1760442286; HMACCOUNT=3281C2A16E3CB9D1; __root_domain_v=.163.com; _qddaz=QD.745160442286854; ntes_utid=tid._.NgVq6JnFQ2BEQ1ERERKGhvlZhdLVWuIQ._.0.%2C.edd._.._.0; Register-Referer=https://dun.163.com/trial/sense; gdxidpyhxdE=nYlM196P%5C4dkmy1z%2FXGBDV%2BEjwtxJu%2BobqVLCjS7uI80ugwiNxvArWLiK1nT5wIebKXaTCWC4OxqLBWNXn0Y06EUOtJygVmDoTas6qRAJNyhYA%2FQ%2FK89AmupOZKnpvJl0Y0XmHd0nVIH5LMW1M9gjGVxL%5Cq5kN6UMZslC7nQ9HXM46pK%3A1760448631881; Hm_lpvt_4671c5d502135636b837050ec6d716ce=1760447881; _qdda=3-1.1nmm6f; _qddab=3-83ixos.mgql7r8e'
document =  watch(document, 'document')
navigator = {
    webdriver: false,
    userAgent : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    plugins :  {
        length: 5,
  '0':  {
    description: 'Portable Document Format',
    filename: 'internal-pdf-viewer',
    length: 2,
    name: 'PDF Viewer'
  },
  '1':  {
    description: 'Portable Document Format',
    filename: 'internal-pdf-viewer',
    length: 2,
    name: 'Chrome PDF Viewer'
  },
  '2':  {
    description: 'Portable Document Format',
    filename: 'internal-pdf-viewer',
    length: 2,
    name: 'Chromium PDF Viewer'
  },
  '3': {
    description: 'Portable Document Format',
    filename: 'internal-pdf-viewer',
    length: 2,
    name: 'Microsoft Edge PDF Viewer'
  },
  '4': {
    description: 'Portable Document Format',
    filename: 'internal-pdf-viewer',
    length: 2,
    name: 'WebKit built-in PDF'
  }
},
    languages : [
    "zh",
    "en",
    "zh-CN"
],
    language: "zh",
    platform: 'Win32',
    appCodeNam: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    hardwareConcurrency : 12,
    deviceMemory : 8,
    maxTouchPoints : 0,
    mimeTypes : {
        length: 5,
        '0': { type: 'application/pdf', suffixes: 'pdf' },
        '1': { type: 'application/x-google-chrome-pdf', suffixes: 'pdf' },
        '2': { type: 'application/x-nacl', suffixes: '' },
        '3': { type: 'application/x-pnacl', suffixes: '' },
        '4': { type: 'application/vnd.ms-htmlpackage', suffixes: 'htmlpkg' }
    },

}

location = {
    "ancestorOrigins": {},
    "href": "https://dun.163.com/trial/sense",
    "origin": "https://dun.163.com",
    "protocol": "https:",
    "host": "dun.163.com",
    "hostname": "dun.163.com",
    "port": "",
    "pathname": "/trial/sense",
    "search": "",
    "hash": ""
}

// get_enviroment(proxy_array)
require('./code')

m = 'i47pUciGvi33:i47PUcjG\\i33:i47vUci0niZg:i47rUci1niSX:i47\\UciCnia/:i476UcN0nia7:i4gRUcNgniAz:i4gHUcN1niIg:i4gpUcNxnimX:i4gPUcN/niFx:i4gnUcN/niii:i4grUcNinii0:i4g\\UcNiniZivc33:i4/HUcNiniZ/rA33:i4/pUcNiniZ/6A33:i4/nUcNiniZxvp33:i4/6UcNiniZ1vi33:i49pUcN/niZXrp33:i496UcNxniZgrA33:i4uPUcN1niZg6A33:i4vRUcN1niZUvp33:i4vrUcNXniZ0vA33:i4OpUcNgniZzrp33:i4OrUcNUniZ7rA33:ivEHUcilniZ76A33:ivEnUciCniSivp33:ivEvUciCniS/vA33:ivErUciCniS1ri33'
p = "ivErUciCniaxrwOn"
ext = "irwr1c33"
console.log('data.m>>', window.mmm(m))
_0xc11b9d('token', (void 0x0 !== _0x279159['clientX'] && void 0x0 !== _0x279159[a0_0x1e60(0x2a)] ? [Math[a0_0x1e60(0x290)](_0x279159[a0_0x1e60(0x29)] - _0x2661b7), Math['round'](_0x279159[a0_0x1e60(0x2a)] - _0x4e6cd6), _0x4c9492 - (_0x24ab01[a0_0x1e60(0x265)] || _0x4c9492), null == _0x279159['isTrusted'] ? 0x0 : _0x279159[a0_0x1e60(0x26)] ? 0x1 : 0x2] : []) + '')
console.log('data.p>>', window.mmm(p))
console.log('data.ext>>', window.mmm(ext))
console.log('data.cb>>', window._cb())