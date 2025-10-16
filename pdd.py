import requests
from lxml import etree
import json
import urllib.parse
from antiContent_Js import js
import execjs


def get_next_msg(html):
    parse_html = etree.HTML(html)
    data = json.loads(parse_html.xpath('//script[@id="__NEXT_DATA__"]/text()')[0])
    req_params, flip = data['props']['pageProps']['data']['ssrListData']['loadSearchResultTracking']['req_params'], \
                       data['props']['pageProps']['data']['ssrListData']['flip']
    req_params = dict(json.loads(req_params), **{"flip": flip})
    return req_params


def get_anticontent(q):
    ctx = execjs.compile(js)
    anti_content = ctx.call('result', q)
    return anti_content


def get_json_msg(session, req_params):
    url = "http://mobile.yangkeduo.com/proxy/api/search"
    headers = {
        'Host': 'mobile.yangkeduo.com',
        'Connection': 'keep-alive',
        'AccessToken': '',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
        'VerifyAuthToken': 'oUa4c7ABPA_2S-6i_70a6w',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': '*/*',
        'Referer': 'http://mobile.yangkeduo.com/search_result.html?search_key=' + urllib.parse.quote(req_params['q']),
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'api_uid=rBUoFl0B72BSXB6ppHvaAg=='

    }
    flip_temp = ''
    for page in range(2, 5):
        anti_content = get_anticontent(headers['Referer'])
        params = dict(req_params, **{"anti_content": anti_content, "pdduid": ""})
        params['page'] = page
        if page != 2:
            params['flip'] = flip_temp
        res = session.get(url, headers=headers, params=params)
        # print(res.text)
        flip_temp = res.json()['flip']
        with open('res_json.json', 'a', encoding='GBK') as f:
            f.write(res.text)
            f.write('\n\n')


def get_data():
    session = requests.session()
    url = "http://mobile.yangkeduo.com/search_result.html?search_key=学生文具用品笔"
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'mobile.yangkeduo.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
    res = session.get(url, headers=headers)
    req_params = get_next_msg(res.text)
    # print(req_params)
    get_json_msg(session, req_params)

def model(anti_content):
    url = "https://mobile.yangkeduo.com/proxy/api/search?pdduid=5878076428500&item_ver=lzqq&coupon_price_flag=1&source=search&search_met=&track_data=refer_page_id,10169_1682584115493_ajrshgshv3&list_id=pg057yy4to&sort=default&filter=&q=%E5%AD%A6%E7%94%9F%E6%96%87%E5%85%B7%E7%94%A8%E5%93%81%E7%AC%94&page=2&is_new_query=1&size=50&flip=0%3B0%3B0%3B0%3Bf762bad6-dd6f-4a26-8e51-d9695d60ca93&anti_content=" + anti_content

    payload = {}
    headers = {
        'authority': 'mobile.yangkeduo.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh,en;q=0.9,zh-CN;q=0.8',
        'accesstoken': 'AVWCSNXGACMPBRQZ7T5AFW57VREB7CODRWG4L3PGPOQPGP2VAPNA110d405',
        'cookie': 'api_uid=Ck/A22Q9Ec8evAB3MlIaAg==; webp=1; _nano_fp=XpEJX5dJn09bXpPjX9_VT4Lq5Gm0BBOc7MWo5Vr8; jrpl=pkAE1MJg2dZ68yDvXVzW8S5U7sDUY4eQ; njrpl=pkAE1MJg2dZ68yDvXVzW8S5U7sDUY4eQ; dilx=Hi9KgMAz_x7NqXdigSvUZ; PDDAccessToken=AVWCSNXGACMPBRQZ7T5AFW57VREB7CODRWG4L3PGPOQPGP2VAPNA110d405; pdd_user_id=5878076428500; pdd_user_uin=PHI76DGIND2OJC6MMUAHGY4HTY_GEXDA; pdd_vds=gaLMNZGhocGctpIqbcIZPDyCOMLrNrNrLXQpthaYQhacbDtpoYEZyWnWNMOh',
        'referer': 'https://mobile.yangkeduo.com/search_result.html?search_key=%E5%AD%A6%E7%94%9F%E6%96%87%E5%85%B7%E7%94%A8%E5%93%81%E7%AC%94&refer_page_name=login&refer_page_id=10169_1682584115493_ajrshgshv3&refer_page_sn=10169',
        'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.text)


if __name__ == '__main__':
    a = 'https://mobile.yangkeduo.com/search_result.html?search_key=学生文具用品笔'
    anti_content = get_anticontent(a)
    print(anti_content)
    # model(anti_content)
