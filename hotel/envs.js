

window = global;
delete global;
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

document = {
    createElement : function(tagName) {
        console.log('document....>>>createElement', tagName)
    }
}
navigator = {
    userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    webdriver : false
}

screen = {
    colorDepth : 24
}

location = {
    // "ancestorOrigins": {},
    "href": "https://hk.trip.com/hotels/list?cityId=30&countryId=1&cityName=%E6%B7%B1%E5%9C%B3&destName=%E6%B7%B1%E5%9C%B3&searchType=CT&checkin=2025-09-25&checkout=2025-09-26&crn=1&adult=1&listFilters=29~1*29*1~1*2,80~0~0*80*0,17~1*17*1&curr=HKD&locale=zh-HK&old=1",
    // "origin": "https://hk.trip.com",
    // "protocol": "https:",
    // "host": "hk.trip.com",
    // "hostname": "hk.trip.com",
    // "port": "",
    // "pathname": "/hotels/list",
    // "search": "?cityId=30&countryId=1&cityName=%E6%B7%B1%E5%9C%B3&destName=%E6%B7%B1%E5%9C%B3&searchType=CT&checkin=2025-09-25&checkout=2025-09-26&crn=1&adult=1&listFilters=29~1*29*1~1*2,80~0~0*80*0,17~1*17*1&curr=HKD&locale=zh-HK&old=1",
    // "hash": ""
}

// get_enviroment(proxy_array)
require('./tokenjs')
p = {
    "requestType": "5",
    "head": {
        "platform": "PC",
        "cver": "0",
        "cid": "1758777943637.fb08xzjO1oMJ",
        "bu": "IBU",
        "group": "trip",
        "aid": "",
        "sid": "",
        "ouid": "",
        "locale": "zh-HK",
        "timezone": "8",
        "currency": "CNY",
        "pageId": "10320668148",
        "vid": "1758777943637.fb08xzjO1oMJ",
        "guid": "",
        "isSSR": false,
        "extension": [
            {
                "name": "cityId",
                "value": ""
            },
            {
                "name": "checkIn",
                "value": "2025-10-13"
            },
            {
                "name": "checkOut",
                "value": "2025-10-14"
            }
        ]
    }
}
console.log(window.signature(p))