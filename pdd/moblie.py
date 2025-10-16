import requests, execjs

anti = execjs.compile(open('./code.js', 'r', encoding='utf-8').read()).call('get_anticontent')
print(len(anti),  anti)

# anti = '0asAfqnygiPssgm252ueiD1E6Tna1Vptn7hYXLWSmMzj6vDVjJJpyShD7SHYIbo3jRrgY-4OF6dLFfP7WT_uZMiZtWTzxbtl3pA8IdaPTCs_DBCNvpozTuQgTRRWQUxR5JCijIN6CNVHe8cdkRfeqhGDebJj4nZ4AlTRFrOogQbTWyF7PxiqZvIrxBRdEWgIYiaZT8XQAI98XPbK6kPWTq78Z_ILyup7bSe0aVnkKRExjVsdqOEYL-WxshXlSzWDB0OcFLwlxUHH77_xvV4I0dT6ZQXEGZRlUMQOE8aUQgsETJUO8RtDB2ORZDfDExQ4n7MgzHF0Xe6V6MXfOGFrVgAFCOE0uN0mC7UYlHuarJscImpd5ObSL4dIcbw8rEI-aP2Jmx0pWdra4ZnIK7D1S5Ej9n7ns4x2ysAOvvuLThY9ORutLcsceqYTgSnBd27a31eCODxtZqgzEEv3waDgMTVq9c2Me6eSB8Ky9Zl-bhsbNyvpJ8lKrIH1LeQiGWGQ4hPHXCqPZAGKSawG340HPw8msGL7Su8ALG39UUThAduXaWXmkV1P40bBD1U42KsNyLspCr_GlnShMVdgQFhAFYFlRFAqiGdPpdWVJe9bgfRpITrbo809bFGc9e6vpIM0KRkS7wF1BYIkK0-yTGNLlhC4XHaryZjP8o1UOegN-FHtx-zl1Rvm8eoQ21nIRV91-ZhVQ_xEZNSjQLrmrHiSrN5mjtTTVPpgoMCf00XJlFP6PrIOeOJHKBHK7CM9UntSi-p4Km7qfWA8v7JW6S3mCFFgF-69dKI0zaiMSECwtSgFFbIeeC8d2tMFctpAFkQaExh1-PxI0hfwXq9kD0Vk7ZJz-1R9YHUGW_znLpa5'
count = 5
page = count * 20
url = "https://mobile.yangkeduo.com/proxy/api/api/caterham/query/fenlei_gyl_group?pdduid=5878076428500&opt_type=1&count=20&support_types=0_4_5_6_7_9&opt_name=&platform=H5&page_id=index.html%3Fdy_sub_page%3Dcategory&page_sn=10002&opt_id=1543&offset={}&list_id=o9pq9tblos_1543&anti_content={}".format(page, anti)


payload = {}
headers = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'zh,en;q=0.9,zh-CN;q=0.8',
  'cache-control': 'no-cache',
  'pragma': 'no-cache',
  'priority': 'u=1, i',
  'referer': 'https://mobile.yangkeduo.com/?lastTabItemID=1543&refer_page_name=login&refer_page_id=10169_1759524529091_tnein2zrfd&refer_page_sn=10169&page_id=10002_1759524739306_v7q6nxcgpi&bsch_is_search_mall=&bsch_show_active_page=',
  'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  'cookie': 'api_uid=CicEmGjVRaF7KQCiQIDoAg==; _nano_fp=Xpmyl0CbXpX8npPbX9_oBKEEPe2900frs7mxfB35; webp=1; jrpl=989wqdGStd6VFmgp2otpJxybNZ1hVdQ6; njrpl=989wqdGStd6VFmgp2otpJxybNZ1hVdQ6; dilx=AjL0YdFHj0IXeFp100l5X; PDDAccessToken=OFBR52WRWGU5Z36DDWZZVXY4OZUVBISHYYEEQ6DUYHUJRECSPD3Q120d405; pdd_user_id=5878076428500; pdd_user_uin=PHI76DGIND2OJC6MMUAHGY4HTY_GEXDA; pdd_vds=gapUqJYXCHcVCzqArzqHeRBUhFCgezTRcMhHdFTHekYXqUujZRhHTRqVcjfX; api_uid=CiGgWWjmWzUKZACCMMhRAg=='
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
