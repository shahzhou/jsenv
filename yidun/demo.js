
window = global;
delete Buffer


window.setTimeout = function() {}
window.setInterval = function() {}
window.addEventListener = function() {}

document = {
    createElement: function (tagName) {
        // console.log("document.createElement('" + tagName + "')")
        if (tagName === 'div'){
            return {
                getAttribute: function (name) {
                    // console.log("div.getAttribute('" + name + "')")
                    if (name === 'className') {
                        return {}
                    }
                }
            }
        }
    },
        body: {},
    addEventListener: function() {},
    createEvent: function (type){
        // console.log("document.createEvent('" + type + "')")
    },
    documentElement:  {},
    getElementById: function (id){
        console.log(
            // "document.getElementById('" + id + "')"
        )
    }
    }
document.cookie = '__snaker__id=T7rYIhhjnXO6rn62; NTES_P_UTID=Yzu4dxFgDTjOp8PW05II1NrGZxYcBcNu|1758855801; P_INFO=shaohaozhou@163.com|1758855801|0|mail163|00&99|gud&1758855531&mailmaster_ios#gud&440300#10#0#0|&0|mailmaster_ios|shaohaozhou@163.com; nts_mail_user=shaohaozhou@163.com:-1:1; timing_user_id=time_9AIwk2J46Z; _ga=GA1.1.432572319.1759977623; _clck=s5p1gq%5E2%5Eg00%5E0%5E2108; _ga_C6TGHFPQ1H=GS2.1.s1759977622$o1$g0$t1759977676$j6$l0$h0; Hm_lvt_4671c5d502135636b837050ec6d716ce=1760442286; HMACCOUNT=3281C2A16E3CB9D1; __root_domain_v=.163.com; _qddaz=QD.745160442286854; ntes_utid=tid._.NgVq6JnFQ2BEQ1ERERKGhvlZhdLVWuIQ._.0.%2C.edd._.._.0; Register-Referer=https://dun.163.com/trial/sense; gdxidpyhxdE=nYlM196P%5C4dkmy1z%2FXGBDV%2BEjwtxJu%2BobqVLCjS7uI80ugwiNxvArWLiK1nT5wIebKXaTCWC4OxqLBWNXn0Y06EUOtJygVmDoTas6qRAJNyhYA%2FQ%2FK89AmupOZKnpvJl0Y0XmHd0nVIH5LMW1M9gjGVxL%5Cq5kN6UMZslC7nQ9HXM46pK%3A1760448631881; Hm_lpvt_4671c5d502135636b837050ec6d716ce=1760447881; _qdda=3-1.1nmm6f; _qddab=3-83ixos.mgql7r8e'

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

require('./code')

// _0x250334 = "133,33,4" //原始轨迹数组里的一个轨迹数据
// _0xc11b9d 加密轨迹数据方法

///轨迹生成逻辑&&&&&&&&&&&&&&&&&&&&&&&&&&&
//点击坐标x
// clientX = 556
// clientY = 520
// left = 364
// top = 519
// //_0x265cc7 left=标签距离页面最左边的距离, _0x75a3d8 top=标签距离页面顶部的距离, this[a0_0x1e60(0x265) 开始时间
// beginTime  =  new Date().getTime()
// var traceData = []
// ll= [Math['round'](clientX - left), Math['round'](clientY - top), new Date().getTime() - beginTime] + ''
// traceData.push(ll)
//////////////////////////////////////////////

// ll= [Math['round'](_0x5ec3d1['clientX'] - left), Math['round'](_0x5ec3d1["clientY"] - top), new Date().getTime() - beginTime] + ''
// 0x24ab01["traceData"] = [].push(ll)
// _0x40d0dc = "6a740ed5e494443a9640fb5877414634" //'token'
// traceData = ['181,1,0', '181,3,8', '180,5,17', '180,7,33', '179,8,40', '179,9,56', '179,10,64', '178,12,72', '178,13,88', '178,14,104', '178,15,112', '178,16,120', '177,18,128', '177,20,144', '176,22,152', '176,23,168', '176,24,184', '176,25,193']

function get_data(traceData, x, y, token) {
    left = 364
    top = 519
    sign_move = traceData['map'](function(_0x250334) {
                            return window.jiami_xyt(token, _0x250334);
                        })
    console.log('sign_move>>', sign_move)
    mm = window.mmm(window._sample(sign_move, 50)["join"](':'))
    console.log('data.m>>',  mm, mm.length)
    // ppp = [Math["round"](x - left), Math['round'](y - top),  new Date().getTime() - (beginTime || new Date().getTime()), 0] + ''
    ppp = [Math["round"](x - left), Math['round'](y - top),  55, 0] + ''
    pp = window.mmm(window.jiami_xyt(token, ppp))
    console.log('data.p>>',pp, pp.length)

    ext = window.mmm(window.jiami_xyt(token,'1,' + sign_move['length']))
    console.log('data.ext>>', ext, ext.length)
    cb =  window._cb()
    console.log('data.cb>>',cb, cb.length)

    return {'d':'','m':mm, 'p':pp, 'ext':ext, 'cb':cb}
}

function get_cb() {
    cb =  window._cb()
    return cb
}

function get_fp() {
   fp = window._fp()
    return fp
}

// console.log(get_data(traceData, _0x40d0dc, 556, 520))

//hook gdxidpyhxde fp生成方法

// (function (){
//     "use strict"
//     var gdxidpyhxde = ""
//     Object.defineProperty(window, 'gdxidpyhxde', {
//         set: function(value) {
//             console.log('gdxidpyhxde>>', value)
//             debugger
//             gdxidpyhxde = value
//             return value
//
//         },
//         get: function() {
//             return gdxidpyhxde
//         }
//
//     })
// })()

