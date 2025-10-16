const cryptoJS = require("crypto-js");
params = {
    "enc": "utf-8",
    "pvid": "4eda659c5ff34cfa9e70a62d171b22ae",
    "area": "19_1607_4773_62123",
    "page": 1,
    "new_interval": true,
    "s": 1
}

paramsH5sign = {
    appid: 'search-pc-java',
    functionId: "pc_search_searchWare",
    client: 'pc',
    clientVersion: '1.0.0',
    t: new Date().getTime(),
    body: cryptoJS.SHA256(JSON.stringify(params)).toString()
  }

console.log(paramsH5sign)