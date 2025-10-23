(()=>{
   let console_log = console.log
    console.log = function(...args){
        console_log(...args)
    }
    watch = function (obj, name) {
    return new Proxy(obj, {
        //target 被代理的原始对象
        // property 被访问的属性名
        // receiver 最初被调用的对象（通常是代理实例或继承对象）
        get: function(target, property, receiver) {
            try {
                if (typeof target[property] === "function") {
                    console_log("对象 => " + name + ", 读取属性: " + property + ", 值为: function, 类型为: " + typeof target[property]);
                } else {
                    console_log("对象 => " + name + ", 读取属性: " + property + ", 值为: " + target[property] + ", 类型为: " + typeof target[property]);
                }
            } catch (e) {
                // 捕获错误但不处理（保持原代码逻辑）
            }
            return target[property];
        },
        set: function(target, property, newValue, receiver) {
            try {
                console_log("对象 => " + name + ", 设置属性: " + property + ", 值为: " + newValue + ", 类型为: " + typeof newValue);
            } catch (e) {
                // 捕获错误但不处理（保持原代码逻辑）
            }
            return Reflect.set(target, property, newValue, receiver);
        }
    });
};
})();

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


window = self = top = global;
window.requestAnimationFrame = function requestAnimationFrame() {};safefunction(window.requestAnimationFrame);
XMLHttpRequest = function XMLHttpRequest() {};safefunction(XMLHttpRequest);
XMLHttpRequest.prototype.send= function send() {};safefunction(XMLHttpRequest.prototype.send);
window.addEventListener = function addEventListener() {};safefunction(window.addEventListener);
window.outerWidth = 1920
window.outerHeight = 1036
window.innerWidth = 1904
window.innerHeight = 907


window = watch(window, 'window');

document = {
    all: watch({}, 'document.all'),
}
document.addEventListener = function addEventListener() {};safefunction(document.addEventListener);
document.createElement = function createElement(tagName) {
    console.log('document....>>>createElement', tagName)
    if (tagName === 'span') {
        span = watch({
            classList: watch([], 'span.classList'),
        }, 'span')
        return span
    }
};safefunction(document.createElement);
document.documentElement = watch({}, 'document.documentElement')
document.createEvent = function createEvent(type) {
    console.log("document....>>>createEvent", type)
};safefunction(document.createEvent);

document = watch(document, 'document');

function Navigator() {
    this.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
    this.platform = "Win32"
}

navigator = watch(new Navigator(), 'navigator');

location = {
    "ancestorOrigins": {},
    "href": "https://www.douyin.com/user/MS4wLjABAAAAUy5xHIzD07isBSSSf52PKuWtTkqax10DX7zAg4sccVsMqeb4Ibjngj5GQxfnkOFY?from_tab_name=main",
    "origin": "https://www.douyin.com",
    "protocol": "https:",
    "host": "www.douyin.com",
    "hostname": "www.douyin.com",
    "port": "",
    "pathname": "/user/MS4wLjABAAAAUy5xHIzD07isBSSSf52PKuWtTkqax10DX7zAg4sccVsMqeb4Ibjngj5GQxfnkOFY",
    "search": "?from_tab_name=main",
    "hash": ""
};
location = watch(location, 'location');

screen = {
    availWidth: 1920,
    availHeight: 1040,
    width: 1920,
    height: 1080,
}
screen = watch(screen, 'screen');

require('./jscode');



t = {
    "aid": 6383,
    "pageId": 6241,
    "paths": [
        "^/webcast/",
        "^/aweme/v1/",
        "^/aweme/v2/",
        "/douplus/",
        "/v1/message/send",
        "^/live/",
        "^/captcha/",
        "^/ecom/"
    ],
    "boe": false,
    "ddrt": 8.5,
    "ic": 8.5
}
window.bdms.init(t)
// 可能行为数据监控 用户交互行为记录
url = "https://www.douyin.com/aweme/v1/web/aweme/post/?device_platform=webapp&aid=6383&channel=channel_pc_web&sec_user_id=MS4wLjABAAAA49HVmiFoPvZaYSW0qAo3lFxAo3d6Oj5PZn4u1M0r7cSRHDub5ky5Tvk5Iwkze23D&max_cursor=1759306668000&locate_query=false&show_live_replay_strategy=1&need_time_list=0&time_list_query=0&whale_cut_token=&cut_version=1&count=18&publish_video_strategy_type=2&from_user_page=1&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&cpu_core_num=12&version_code=290100&version_name=29.1.0&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh&browser_platform=Win32&browser_name=Chrome&browser_version=141.0.0.0&browser_online=true&engine_name=Blink&engine_version=141.0.0.0&os_name=Windows&os_version=10&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7564110097250649643&uifid=e92777d2cb4cf0f94a981760c14554e8d3208daf0443679909dcdbe8e735b0619812353d4bd68064bc6ad522660971189640e8a032d7358c1432f7414e6e60287232ecd57057509140cc8137fba7411283b052a4b23c947b5d53033b0b6364e6203aff064d6497a5dfdf626fbca809861ee08fbb0c8436b41a49bf00b9f26257c62e7dbf759c958778fdd8a1fc1be2425796f57092ced781f2ef4976f774ee7a"

bdmsInvokeList= [
    {
        "args": [
            "GET",
            url,
            true
        ]
    },
    {
        "args": [
            "Accept",
            "application/json, text/plain, */*"
        ]
    },
    {
        "args": [
            "uifid",
            "e92777d2cb4cf0f94a981760c14554e8d3208daf0443679909dcdbe8e735b0619812353d4bd68064bc6ad522660971189640e8a032d7358c1432f7414e6e60287232ecd57057509140cc8137fba7411283b052a4b23c947b5d53033b0b6364e6203aff064d6497a5dfdf626fbca809861ee08fbb0c8436b41a49bf00b9f26257c62e7dbf759c958778fdd8a1fc1be2425796f57092ced781f2ef4976f774ee7a"
        ]
    }
]

invokeList = [
    {
        "name": "addEventListener",
        "args": [
            "load",
            null
        ]
    },
    {
        "name": "addEventListener",
        "args": [
            "error",
            null
        ]
    }
]
xhr = new XMLHttpRequest();
xhr = watch(xhr, 'xhr');
xhr.bdmsInvokeList = bdmsInvokeList;
xhr.invokeList = invokeList;
xhr.send(null)
console.log('window.a_bogus:',window.a_bogus)




// (()=>{
//         const originalXHROpen = XMLHttpRequest.prototype.open;
//         XMLHttpRequest.prototype.open = function(method, url) {
//         if (url.includes("aweme/v1/web/aweme/post")) {
//             console.log("拦截到上报请求:", url);
//             debugger
//         }
//         return originalXHROpen.apply(this, arguments);
//     };
// })()
