// delete __filename
// delete __dirname

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
content_="cWgR_uhbyzo9lpHHN5mCLnLeLg0.V2VaM4pH2BKKjAU79t_Ob4zaUK9vB2h.JhX4LDmIRviOZ21vvs7T5_FS1vY0G2K4W3CwnQC502BzqlCtc9xDoW2rmi4qG.jxUqS.a9i.4m9PJ9RXgoUqk_VHzJAhTSf1TyXQE.XApFgDpXbY0gr4z35F.ejkzfbEhkX9BU.T7wL2BuZ"

window = top = self = global
window.setTimeout = function() {}
window.setInterval = function() {}

// delete global

// window.HTMLFormElement = function(res) {
//     console.log("window.HTMLFormElement>>", res)
// }

window.addEventListener = function(event) {
    // console.log('window.addEventListener>>', event)
}
window = watch(window, 'window')

function HTMLDocument() {
}
HTMLDocument.prototype.visibilityState = 'visible'
// function HTMLElement() {
// }
// Object.defineProperty(HTMLElement.prototype, 'getElementsByTagName', {
//     enumerable: true,
//     configurable: true,
//     writable: true,
//     value: function(tagname) {
//         console.log("HTMLElement.getElementsByTagName('" + tagname + "')")
//         if (tagname === 'i') {
//             return []
//         }
//     }
// })
// Object.setPrototypeOf(HTMLDivElement.prototype, HTMLElement.prototype)

function HTMLDivElement() {
    // this.nodeName="DIV"
    // this.offsetHeight = 0;
    // this.offsetLeft = 0;
    // this.offsetTop = 0;
    // this.offsetWidth = 0;
}
Object.defineProperty(HTMLDivElement.prototype, 'getElementsByTagName', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(tagname) {
        console.log("div.getElementsByTagName('" + tagname + "')")
        if (tagname === 'i') {
            return []
        }else {
            return []
        }
    }
})
Object.defineProperty(HTMLDocument.prototype, 'createElement', {
    value: function (tagName) {
        console.log('document.createElement>>', tagName)
        if (tagName === 'div') {
            div = watch(new HTMLDivElement(), 'document.createElement.div')
            return div
        }
        if (tagName === 'a') {
            return watch({
                port: '',
                protocol: ':',
                hostname: '',
                pathname: ''
            }, 'document.createElement.a')
        }
        if (tagName === 'form') {
            return watch({}, 'document.createElement.form')
        }
        if (tagName === 'input') {
            return watch({}, 'document.createElement.input')
        }
    }
})

function HTMLScriptElement() {
    this.innerText = watch({}, 'script.innerText')
    this.getAttribute = function (name) {
        console.log('script.getAttribute>>', name)
        if (name === 'r') {
            return 'm'
        }else {
            return {}
        }
    }
    // 当补环境时添加了属性或者方法后报错还是在同样的位置，大概有可能就是方法要有返回值或者这个属性和方法还有往下的操作，这时候可以给他上代理或者直接去代码里调试看看怎么回事
    // 直接添加parentElement={} 报错依然在
    this.parentElement = watch({
        removeChild: function (tagName) {
            console.log('script.parentElement.removeChild>>', tagName)
        }
    }, 'script.parentElement')
}
Object.defineProperty(HTMLDocument.prototype, 'getElementsByTagName', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(tagname) {
        console.log("document.getElementsByTagName('" + tagname + "')")
        if(tagname === 'script') {
            script = watch(new HTMLScriptElement(), 'script')
            return [script]
        }
        if(tagname === 'base') {
            return []
        }
    }
})
Object.defineProperty(HTMLDocument.prototype, 'appendChild', {
    value: function (tagName) {
        console.log('document.appendChild>>', tagName)
    }
})
Object.defineProperty(HTMLDocument.prototype, 'removeChild', {
    value: function (tagName) {
        console.log('document.removeChild>>', tagName)
    }
})
Object.defineProperty(HTMLDocument.prototype, 'getElementById', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function(id) {
        console.log('document.getElementById>>>>>>', id)
        if (id === 'FbkwzLN5XOx0') {
            return watch({
                getAttribute: function(tagname) {
                    console.log(`document.getElementById(${id}).getAttribute>>`, tagname)
                    if (tagname === 'r') {
                        return 'm'
                    }
                },
                parentNode: {
                    removeChild: function(tagname) {
                        console.log(`document.getElementById(${id}).parentNode.removeChild>>`, tagname)
                    }
                },
                content : content_,
        }, `document.getElementById(${id})`)

    }
}
})
Object.defineProperty(HTMLDocument.prototype, 'addEventListener', {
    value: function(tagname) {
        // console.log('document.addEventListener>>>>>>', tagname)
    }
})

document = watch(new HTMLDocument(), 'document')

function Localtion() {
}
Localtion.prototype = {
    "ancestorOrigins": {},
    "href": "https://qikan.cqvip.com/Qikan/Journal/JournalGuid?from=index",
    "origin": "https://qikan.cqvip.com",
    "protocol": "https:",
    "host": "qikan.cqvip.com",
    "hostname": "qikan.cqvip.com",
    "port": "",
    "pathname": "/Qikan/Journal/JournalGuid",
    "search": "?from=index",
    "hash": ""
}
location = watch(new Localtion(), 'location')

function History() {
    this.scrollRestoration = "auto"
    this.length = 3
    this.state = null
}
history = watch(new History(), 'history')

function Screen() {
}
Screen.prototype = {
    availHeight: 1040,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    isExtended: false,
    onchange: null,
    pixelDepth: 24,
    width: 1920,
}
screen = watch(new Screen(), 'screen')
function Navigator() {
}
Navigator.prototype = {
    cookieEnabled : true,
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
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    hardwareConcurrency : 12,
    deviceMemory : 8,
    maxTouchPoints : 0,
    mimeTypes : {
        length: 2,
        '0': { description: "Portable Document Format", type: 'application/pdf', suffixes: 'pdf' },
        '1': { description: "Portable Document Format",  type: 'text/pdf', suffixes: 'pdf' },
    },

}
Navigator.prototype.connection = {
    "downlink": 10,
    "effectiveType": "4g",
    "rtt": 0,
    "onchange": null
}
navigator = watch(new Navigator(), 'navigator')

function Storage() {}
Storage.prototype = {
    "_$rc": "zvfIKMt.zZyolN0yujRblsC_60nHPXiXKy8MYactkywECBMrkJKD3teT37fVLvA9y219PTRFvuptkC3TouXTQe8H8Oo1VeYQpgm0O6c1Q5b7NmfuQdI4SpCUbMpwU6ArXy.L.NhwUkTEQgJyXvkqvtetg3d4HTVbhhKwcHFrU6IbQgcBlLh82QlvOHQLI2ikjgxkWSjkbdKSn6IvafrmC8TiZhs4ilCSbO9W7_ZErIUMtWG3nKbh6P542Y.3LxdsAhlic_dexzlZidr66yP7A3stefMC7RzZsKkRzpWdm7LAsp9aW9bC821hpuFDe8y5ZwxZkowLV7FM0t_h4C4JPdM.X7nn10V_qmJfcn62BCKX009ULLZJP07wToI9kUsrmKRKNHpLxhMUrjpoJphpYFaUktx78i63TQ8KfAh3T0wyy3YPcrv7BqHNpugLb_azXJyUGOpplKKxvKE81XU6uyDOULJBlz7mYb7G8LxH5WekPZ4Qbc.IzGhdw1fn3DcqQB8WIrB7F3cjT6mB9cmPrW72IONNruyOp5dZFtxGLVEtm42zSUnwssGrCoPGd6rPiPCpCv8nvW7QQCE23rl3GtCju99gXPMlEym9ejVTaHqrst4e.0ZEfovkYXTMTZeCaqJndicbXm6FT4BqCy4VuGBjhxaje7TJoXipapHu06RbvtgJIP7g0.60bkWDiNtFB_QnLRWbeOYqjXLyzHlbOxezYjnSi.lmqQfcYo6HlIILXZgLoWNAL.iaRv_9NOGEhMf_EG",
    "qdwpa_saas_d2_2885776891": "tzCqhvflWkfK5BoudEltejyZeTLbFwijjPfdV87ePCyrVII8ZTMcoI1XPWYuD3c1moPHyFHCkq4jqcV1vk75NannOuPIN3dMz/dBXLxoUC+g809b1yu/Qs9+MYQURi1RZARCpBMBC9OdBkdZDCqttJh0ZyMGbAapI48vrAttoILtjU5b8xJ7HZG/5NBqRvelvPgmPmxUDA4JeBroac0xDnzXcNlMQjmcjDY4oq9lyLWgJvRkMAd/O2lsn3T+5YCupssn9yaZjOSMyFaLa+YnO8PL3tkBomVHXWcE5OvRGR/KrS5LVCptjJ93YSPMtEJRU1BFz0Pt1OU=",
    "_qd_fst": "1759766400000",
    "qdwpa_saas_user_id_2885776891": "680359794977824",
    "_qd_latest": "{\"latest_utm\":{}}",
    "__#classType": "localStorage",
    "Hm_lvt_fee827c3dc795c5122daf5ee854c1683": "1791518965108|1759794978,1759981875",
    "auyst": "1759794977",
    "syfhs": "794556789",
    "lswucn": "T2gAgl8wOkpKYI3XO8VSi7auEHl0at90oNfS4Hu9vMBHR8kFPsyNW_XCT749MmXpcns=@@1759981875",
    "ETLCD": "false",
    "qdim_saas_d2_2885776891": "",
    "lstest": "1",
    "tfstk__": "gp0oYg4Bh0r78wb5qB4W2NMUC2KvNzaQtvQLpyee0-ybwbHJVDmmLXjKwyhUKvDYh7G-e3inn4Df2WhpVBDmrxs89XKWttGtE2HnOQNULvk3p0KvWbG7RyJT-FLtN61SD4gu89h4PWQZzS5BWbG5gf5-7_LOt_VaE7yELuyVu7w4aw7ELt54hWNFUW7yijyb377UUyWqg7NOLJkU8Ic4hWzUavryijybTyyEwY_UI2ujupSYuLug4Zn_Zu2Za8lK9quhBRlrjw7UE7qlmbyc8wumxscIq8-1MJa8FbPodF_7zkms9WDkrakn1qM0gA8hW8lj6cESzHQTjzwuv4zGTUl0r8qZrY1FzAlmTcEmkC8_rzyrvzGdsLhmrYhSoXCF0z4-ml0u7F6zpmhi-W0BdEDi1qM0gA8HUgud0GSgmwN29qSCAuPbiRnmbmng1A7ZAIAcf3ZzG7p9iIjCAuPbiRdDiG6Q4SNJB",
    "$_YWTU": "Zyjn7oUfDleGPoATvEQRGaR9HV_8V4Q5gDQYUiryQNG",
    "qdwpa_saas_uuid_2885776891": "48e8e218d54c00fba72f877922d6bb86",
    "tencentSig": "884259794977732",
    "Hm_lvt_17262dc62ce874a510e9c97140f381d6": "1791518965113|1759794978,1759981875",
    "$_YVTX": "WsGg"
}

localStorage = watch(new Storage(), 'localStorage')


require('./6js1')
require('./6js2')


console.log(document.cookie, document.cookie.length)