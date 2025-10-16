# coding = utf-8
import requests
# from lxpy import get_ua
import aiohttp,asyncio
import httpx

ja3url = 'https://ja3er.com/json'
headers = {'use_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'}
print(requests.get(ja3url,headers=headers).text)
print(httpx.get(url=ja3url, headers=headers).text)
async def t2():
    async with aiohttp.ClientSession() as session:
        async with session.get(ja3url,headers=headers) as resp:
            print(await resp.text())
loop =asyncio.get_event_loop()
loop.run_until_complete(t2())



import random
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.ssl_ import create_urllib3_context

ORIGIN_CIPHERS = (
    'ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+HIGH:DH+HIGH:ECDH+3DES:DH+3DES:RSA+AESGCM'
    ':RSA+AES:RSA+HIGH:RSA+3DES')


class DESAdapter(HTTPAdapter):
    def __init__(self, *args, **kwargs):
        # 在请求中重新启用 3DES 支持的 TransportAdapter
        CIPHERS = ORIGIN_CIPHERS.split(":")
        random.shuffle(CIPHERS)
        # print("1:", CIPHERS)
        CIPHERS = ":".join(CIPHERS)
        # print("2:", CIPHERS)
        self.COPHERS = CIPHERS + ":!aNULL:!eNULL:!MD5"
        super(DESAdapter, self).__init__(*args, **kwargs)

    # 在一般情况下，当我们实现一个子类的时候，__init__的第一行应该是super().__init__(*args, **kwargs)，
    # 但是由于init_poolmanager和proxy_manager_for是复写了父类的两个方法，
    # 这两个方法是在执行super().__init__(*args, **kwargs)的时候就执行的。
    # 所以，我们随机设置 Cipher Suits 的时候，需要放在super().__init__(*args, **kwargs)的前面。
    def init_poolmanager(self, *args, **kwargs):
        context = create_urllib3_context(ciphers=self.COPHERS)
        kwargs["ssl_context"] = context
        return super(DESAdapter, self).init_poolmanager(*args, **kwargs)

    def proxy_manager_for(self, *args, **kwargs):
        context = create_urllib3_context(ciphers=self.COPHERS)
        kwargs["ssl_context"] = context


if __name__ == '__main__':
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67'}
    s = requests.Session()
    s.headers.update(headers)

    print("修改TSL 加密算发")
    for _ in range(3):
        # 其中，s.mount的第一个参数表示这个适配器只在https://ja3er.com开头的网址中生效
        s.mount("https://ja3er.com", DESAdapter())
        response = s.get("https://ja3er.com/json").json()
        print(response)
