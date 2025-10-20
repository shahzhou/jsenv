import execjs, random, requests, json, re

headers = {
  'Accept': '*/*',
  'Accept-Language': 'zh,en;q=0.9,zh-CN;q=0.8',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'Pragma': 'no-cache',
  'Referer': 'https://dun.163.com/',
  'Sec-Fetch-Dest': 'script',
  'Sec-Fetch-Mode': 'no-cors',
  'Sec-Fetch-Site': 'same-site',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
  'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'cookie': '_ga=GA.1.2652a12902fc5.1e6698bdbe71b9b7157e; NTES_P_UTID=Yzu4dxFgDTjOp8PW05II1NrGZxYcBcNu|1758855801; P_INFO=shaohaozhou@163.com|1758855801|0|mail163|00&99|gud&1758855531&mailmaster_ios#gud&440300#10#0#0|&0|mailmaster_ios|shaohaozhou@163.com; nts_mail_user=shaohaozhou@163.com:-1:1; timing_user_id=time_9AIwk2J46Z; _ga=GA1.1.432572319.1759977623; _clck=s5p1gq%5E2%5Eg00%5E0%5E2108; _ga_C6TGHFPQ1H=GS2.1.s1759977622$o1$g0$t1759977676$j6$l0$h0; Hm_lvt_4671c5d502135636b837050ec6d716ce=1760442286; HMACCOUNT=3281C2A16E3CB9D1; __root_domain_v=.163.com; _qddaz=QD.745160442286854; gdxidpyhxdE=6GbSHYkmybddO0N2raOJblIArRd46jkYRVk6HTOc7xceeU%2FUlB4MjkQCQWTh0i8EtamdtUIRxjgSqc2L%2BC391S8TpIIvM%5CfTpZZbd6d9JKPKHCv2Hmv%2FeQztC5XAarP5mAhXhuy25JPM3AOHxJvIcKR1TTZjp7b%2FzAwoas%5C%2FqDk5Pusf%3A1760452387807; Hm_lpvt_4671c5d502135636b837050ec6d716ce=1760696631'
}
with open('./demo.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
def get_token():
    url = "https://c.dun.163.com/api/v3/get"
    callback = f"__JSONP_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=8))}_0"

    fp = execjs.compile(js_code).call('get_fp')
    cb = execjs.compile(js_code).call('get_cb')
    params = {
        "referer": "https://dun.163.com/trial/sense",
        "zoneId": "CN31",
        "dt": "iS541UkSbKNAElBAERKCx7wM1dJ+qhT6",
        "id": "74b1d03fcaf944b4aa3a862b2a1893e1",
        "fp": fp,
        "https": "true",
        "type": "",
        "width": "",
        "sizeType": '10',
        "version": "2.28.5",
        "dpr": "1",
        "dev": "1",
        "cb": cb,
        "ipv6": "false",
        "runEnv": "10",
        "group": "",
        "scene": "",
        "sdkVersion": "",
        "loadVersion": "2.5.3",
        "iv": "4",
        "user": "",
        "acToken": "",
        "smsVersion": "v3",
        "callback": callback
    }
    res = requests.get(url, params=params, headers=headers, verify=False)
    json_str = re.search(rf"{callback}\((.*?)\);", res.text, re.S).group(1)
    result = json.loads(json_str)
    print(result)
    token = result['data']['token']
    return token

left = 364
top = 519
def track():
    #370 670
    x = random.randint(370, 670)
    y = random.randint(520, 555)
    t = 0
    track_ist = []
    for i in range(random.randint(15, 80)):
        ct = random.randint(0, 15)
        t += ct
        x = x + random.randint(-3, 3)
        y = y + random.randint(-3, 3)
        cx = x - left
        cy = y - top
        track_ist.append(f'{cx},{cy},{t}')
    # track_ist = [] #不验证轨迹 置空也能过码
    return track_ist, x, y

def check():
    url = "https://c.dun.163.com/api/v3/check"
    callback = f"__JSONP_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=8))}_0"
    cb = execjs.compile(js_code).call('get_cb')
    print('cb》》',cb)
    track_ist, x, y = track()
    token = get_token()
    data = execjs.compile(js_code).call('get_data', track_ist, x, y, token)
    print(111, data)
    params = {
        "referer": "https://dun.163.com/trial/sense",
        "zoneId": "CN31",
        "dt": "iS541UkSbKNAElBAERKCx7wM1dJ+qhT6",
        "id": "74b1d03fcaf944b4aa3a862b2a1893e1",
        "version": "2.28.5",
        "cb": cb,
        "user": "",
        "extraData": "",
        "bf": "0",
        "runEnv": "10",
        "sdkVersion": "undefined",
        "loadVersion": "2.5.3",
        "iv": "4",
        "token": token,
        "type": "5",
        "width": "320",
        # "data": "{\"d\":\"\",\"m\":\"%s\",\"p\":\"%s\",\"ext\":\"%s\"}" % (data['m'], data['p'], data['ext']),
        "data": str(data),
        "callback": callback

    }

    res = requests.get(url, params=params, headers=headers, verify=False)
    print(res.status_code)
    print(res.text)
if __name__ == '__main__':
    check()