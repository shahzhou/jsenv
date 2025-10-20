//1断点停住把加密方法导出 后放开断点
//2开启ws服务端
//3开启浏览器端 注入代码
//4py端发送参数
!function (){
    let ws = new WebSocket("ws://localhost:9999/js");
    ws.onmessage = function (msg) {
        console.log("来自服务器的消息: " ,msg.data, typeof msg.data);
        content = JSON.parse(msg.data);
        console.log("转格式: " ,content, typeof content);
        // res = jiami(msg.data); //执行加密方法前注入，可以直接修改js代码加上替换，也可以打断点先停住再控制台注入后放开断点
        res = new window.AAA()._$sdnmd(content); //全局导出来调用 window._encrypt = xxx
        console.log("加密后: ",res, typeof res)
        ws.send(JSON.stringify(res));
    };
}()

a._$sdnmd({
    "appid": "search-pc-java",
    "functionId": "pc_search_searchWare",
    "client": "pc",
    "clientVersion": "1.0.0",
    "t": 1760770039337,
    "body": "8499571475dcb689e85255b7b13c6002cdd8049a746a5d9545accde52378affe"
})