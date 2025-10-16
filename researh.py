import requests

url = "https://mobile.yangkeduo.com/proxy/api/search?pdduid=5878076428500&item_ver=lzqq&coupon_price_flag=1&source=index&search_met=history&track_data=refer_page_id,10015_1684572189982_zt5e0nj03o%3Brefer_search_met_pos,0&list_id=t7aewiey6u&sort=default&filter=&q=%E4%BA%94%E7%B2%AE%E6%B6%B2&page=2&is_new_query=1&size=50&flip=0%3B0%3B0%3B0%3B83826098-179c-4b21-a51f-a90deb94202a"

payload = {}
headers = {
  'authority': 'mobile.yangkeduo.com',
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'zh,en;q=0.9,zh-CN;q=0.8',
  'accesstoken': 'Q2D7SUTX6KGCSQ4POBGCKKBR5IWSZO4MWPSC72YFO4R4T2E2K5VA120d405',
  # 'cookie': 'api_uid=Ck/A22Q9Ec8evAB3MlIaAg==; webp=1; _nano_fp=XpEJX5dJn09bXpPjX9_VT4Lq5Gm0BBOc7MWo5Vr8; dilx=Hi9KgMAz_x7NqXdigSvUZ; PDDAccessToken=Q2D7SUTX6KGCSQ4POBGCKKBR5IWSZO4MWPSC72YFO4R4T2E2K5VA120d405; pdd_user_id=5878076428500; pdd_user_uin=PHI76DGIND2OJC6MMUAHGY4HTY_GEXDA; jrpl=pkAE1MJg2dZ68yDvXVzW8S5U7sDUY4eQ; njrpl=pkAE1MJg2dZ68yDvXVzW8S5U7sDUY4eQ; pdd_vds=gasLwOnLEQGosLtObGtPybaymaOtOOGboOnQbtGIGnmNIEaGEEEimyNtILLO',
  'referer': 'https://mobile.yangkeduo.com/search_result.html?search_key=%E4%BA%94%E7%B2%AE%E6%B6%B2&search_met_track=history&search_type=goods&source=index&options=3&refer_search_met_pos=0&refer_page_el_sn=99887&_x_no_login_launch=1&refer_page_name=search_result&refer_page_id=10015_1684572189982_zt5e0nj03o&refer_page_sn=10015',
  'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  # 'verifyauthtoken': '5YhAz7LCfVTyn44hZJDAug39f18047876438fcf'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
