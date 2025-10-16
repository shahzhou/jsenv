import requests
import json, execjs

import requests
import json

url = "https://pifa.pinduoduo.com/pifa/search/searchOptGoods"

payload = json.dumps({
  "page": 6,
  "size": 20,
  "sort": 0,
  "optId": 10053,
  "level": 1,
  "url": "",
  "propertyItems": [],
  # "rn": "928b8b8107aa3e6e82f52730f2297861" #影响翻页，没有只会返回第一页数据 ，值从第一页返回值拿
})
headers = {
  'accept': '*/*',
  'accept-language': 'zh,en;q=0.9,zh-CN;q=0.8',
  'anti-content': '0arWfqnF0sGay9dx3XhhHFGaFJkV5DomSW3Ijfd55UE5Mt-8mP-hAHT1gMpIKjpwymAJvYi9Sb0sqC2xvBAu2ZBIKhpoQuyRQyWUrRhk3HRtPHRWfYMLLkeZUj11lgalgotB6b_MrM_MAuCilvEn_aOZs5ljGMtBSV36YeOkUnZgBfePBa0U2MTIertJs_WtUmXeKqGlwl44yKEeeeGzt94EScgzJ-IC8xnsLrSi3EbXPasg3V0xxUz_Idlo6_bYWsahhvNvUHoOV5GFpef8O--Bg7_e9kVkHCNlGSPydg6Ep2V93dGM8LV5djHk0cnPivvJSbbnZSZ2HswA7Roy8LcK5VmtG_Hugs_TNjR-OptxGTNN0JKzQeFsobKyLIpxFdgYzTb81gwlXf1h5W2EnDh3tUvkUP8bm7ey70F7Q8DosrNHp8lNYRcJqguNG89Tnyp9cXLbwtN9t26tzCE9-uAYYJKcYCOeCseWi7Ct1do3RzXkul80Qmu',
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  'origin': 'https://pifa.pinduoduo.com',
  'pragma': 'no-cache',
  'priority': 'u=1, i',
  'referer': 'https://pifa.pinduoduo.com/search?cate=21888&level=1&sn=64658.3322086.0.21888&refer_page_id=64658_1758878435452_35ded36b3',
  'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  'cookie': 'api_uid=cdcbd309b8814937a0bd00f4475120ce; plp_uid=cdcbd309b8814937a0bd00f4475120ce; jrpl=nSJ9MHkVuMnaIQfjMFx2AW2xuSWmQ8M0; njrpl=nSJ9MHkVuMnaIQfjMFx2AW2xuSWmQ8M0; dilx=b4bgOZSpouoCDiXCww~QT; _nano_fp=Xpmyl0ConqEal0X8XC_Ud852GxQLLC55x7yuQnqX; webp=true; rckk=nCNgzXQ0NrgHPkgKwHRdHyn5sNE242rb; _bee=nCNgzXQ0NrgHPkgKwHRdHyn5sNE242rb; ru1k=7eb5073b-595a-4f85-b830-17fe9753d3a7; _f77=7eb5073b-595a-4f85-b830-17fe9753d3a7; ru2k=ed7b573c-9d09-48b7-8f8f-5ed7e85a4326; _a42=ed7b573c-9d09-48b7-8f8f-5ed7e85a4326; VISITOR_PASS_ID=SDbzXzGwQ5nZMoAhdRmdauyoodRTpdx-lWSiq_GTprXn8inwCA6hppPScl4-Y3sYX-_Q1i9BFgAkct7mCC5QqZ2r8H3YyBTlFeXFQebvWtE_104cc3bdf44; windows_app_shop_token_23=eyJ0IjoiT3J0eEpmQzAwYnQ0YzJDa1hEc1c1U256YkZqTGhvOFBpa2lQSmtMNkdTT1JnQVNTbW55S2JNR2JneHdFK091UiIsInYiOjEsInMiOjIzLCJtIjo3MzgxODk5MTYsInUiOjE1MDE5MjY1fQ; SUB_PASS_ID=eyJ0IjoiTnBLVGZRUC8rcTRJUm9FVXVubklueU5rd0NEZDJ5RGdNdzBrSU84eDlBbDBjdGZVeUtJVFVyWDk0dlJBVVBhSSIsInYiOjEsInMiOjE0LCJtIjo3MzgxODk5MTYsInUiOjE1MDE5MjY1fQ'

}

# headers['anti-content'] = '0arAfxsUGihYY9mazYBaXeWC6THfe79hKRRXyvgZjUDtTF1wt4-ZqMDFRkdZ8ya8nDKC0Pxv-fZ3iKNCGR94pgoX094g8rBw-s68quii7FQpriy6mWiPFDpcIDGaLbhidw3vVWbzuMtxr1bhy_xx1eQXF-IGUe4Z4j5qK7KS1yFYTySoPw64XeT22LYnU4Ff1KtI0avZmJ8pPPJgJPG_VVFl4gHvqUfdcPrR0qrODcRA8zMuorpCU_PAT4eCPTNkZYVoK4pUB2jO6JpNLJyNZUG7_acnRzohnpB_fibg6_ljrDFawPr6oXgQDC0jUu9uY9pYBjoe3ywaxIO3iKMV6HU9fyRDqomQ9wBqaTJvn-H89DwO4IMxUAY0WVLJPzmxgINH3oLHejh0PqtEIgh0Eas64dhmr6oEpXk04GBBIJ3BazGRnjBOtun0lmGERQ7apCfpNEl7VvSvfimQ581wTZNymi-vNWNlNHyxQPHqTUXdxgT0T-7XXYVMs0tzDOnK-Lm5R36ibN38LJ38iYW5hX6e8zTxNlj0QmN'
#
# response = requests.request("POST", url, headers=headers, data=payload)
#
# print(response.text)
#
# exit()

anti = execjs.compile(open('./code.js', 'r', encoding='utf-8').read()).call('get_anticontent')
print(len(anti),  anti)
headers['anti-content'] = anti
# print('headers', headers)
response = requests.request("POST", url, headers=headers, data=payload)
#
print(response.text)
