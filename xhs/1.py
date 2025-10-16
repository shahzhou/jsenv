payload = {"cursor_score":"1.6857568648920078E9","num":27,"refresh_type":3,"note_index":108,"unread_begin_note_id":"","unread_end_note_id":"","unread_note_count":0,"category":"homefeed_recommend","search_key":""};

import requests


url = "https://edith.xiaohongshu.com/api/sns/web/v1/homefeed"
xt = '1687160532739'
xs = 'XYW_eyJzaWduU3ZuIjoiNTAiLCJzaWduVHlwZSI6IngxIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6IjA2ZDg1MGVjMzFiNmQwYzFhZWU4MDI5OGM4NGUzM2VlZWI5NWNlMTg3NDNmNzExM2NjODY1MDVhNjI2YzRjNTFkNGE0MGFmYmFmNTI3MTJkNmYyYWY2YmQ2MDU2OTJiZTE2ZTJlM2JmYjg5ZTJkYTFkYWQ2MWM1MDQxZDZhYzJiZGFkNjFjNTA0MWQ2YWMyYmJhMWM0ZmNjNTUyMGEzZTNmOWY2Yjk1M2ZmODE5ZjdjNGQzOTY0ZDYxMDQwNWVmYTZkMjU2N2Q2OTRjNTliY2ZjNzE3ZmE4MTZmMTE4ODZkYmYwMmU0NGFhZTY2M2ZhNDQ0NzYwMjgyNGVjN2UxM2Q0M2EwODcxOTg1YjM3YjRlZTE5ZmQ0YjM5OWE2MmMyYzlmMTg0NDUyZGFjODM5ZDc1OThmMDY4YWQ1YzdhZjliMjcxYzljNTM1MmEzZWUyNWFjNjEyNWY4YWY2ZTJlZTEyMmVlZTVkMDE3M2JlMzI3NzZkMjA2MzNkYjAwMWU1YyJ9'
# payload = "{\"cursor_score\":\"1.6857568648920078E9\",\"num\":27,\"refresh_type\":3,\"note_index\":108,\"unread_begin_note_id\":\"\",\"unread_end_note_id\":\"\",\"unread_note_count\":0,\"category\":\"homefeed_recommend\",\"search_key\":\"\"}"
headers = {
  'authority': 'edith.xiaohongshu.com',
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'zh,en;q=0.9,zh-CN;q=0.8',
  'cache-control': 'no-cache',
  'content-type': 'application/json;charset=UTF-8',
  'cookie': 'a1=1887ef01c15me5jq72omsn3y9dgrdfuik4e03fvxf50000278322; web_session=030037a349cfcb37bed0f3dd02234a4833e13c;',
  'origin': 'https://www.xiaohongshu.com',
  'pragma': 'no-cache',
  'referer': 'https://www.xiaohongshu.com/',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  'x-b3-traceid': 'bd262bf5c794702b',
  'x-s': xs,
  # 'x-s': 'XYW_eyJzaWduU3ZuIjoiNTEiLCJzaWduVHlwZSI6IngxIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6Ijg1NWU4M2NjYzI3MjkyOWJjNjA5MjIwZDMxNjE4N2NiZjY0ZTNjYjgyNzBjZDM2ZTY0ZmE0OWRiMDJmN2IzNjMzOWExOGQxMWE5ZTEzNmM5ZTgzODM2M2RlMDNhMGU4M2M5ZTNiZmRhMWZhYTFlYjkwZDc0YWEzMWI1NGM3MmNkMGQ3NGFhMzFiNTRjNzJjZGFjNDg5YjlkYThjZTVlNDhmNGFmYjlhY2ZjM2VhMjZmZTBiMjY2YTZiNGNjM2NiNWEzMGNkYTA5NDcxNmNkMTNkNGVmYzQ5ODZjMmRmMDE5OTJiMjhkY2MyNDkyZDY5NWYyYzk2NDZlNDU5ZDU4M2VlZTUzODhmZGFhYTIyMzZlZjM2NjYxODUyYzMyOTRhMzM1ZWQyNTBjMzhkYzY4NGI2MTA0MGZlY2RmNzkzYzNjMzI5OWIwMGU4ZjcwNDViNGNjM2MzYmU3YjcxZjhlZDAwMDQ5YmMxYjBhNGI4ZWExN2M3Mzg3NWVlYjQyMDNlZiJ9',
  'x-s-common': '2UQAPsHC+aIjqArjwjHjNsQhPsHCH0rjNsQhPaHCH0P1PUhAHjIj2eHjwjQgynEDJ74AHjIj2ePjwjQhyoPTqBPT49pjHjIj2ecjwjHUN0W1+jHVHdWMH0ijP/Wh+9pfPeb0P/pT8/pxq/qUJ9MAJ0+Ewnzdqfzf4nS3+BLIP9892BGMPeZIPeH7wePUPjHVHdW9H0il+0WM+AGlPArEPeGhNsQh+UHCHSY8pMRS2LkCGp4D4pLAndpQyfRk/SzbyLleadkYp9zMpDYV4Mk/a/8QJf4hanS7ypSGcd4/pMbk/9St+BbH/gz0zFMF8eQnyLSk49S0Pfl1GflyJB+1/dmjP0zk/9SQ2rSk49S0zFGMGDqEybkea/8Qyfql/S4p+rFU/fk82DDA/nk32LRgafkwyDrM/nkQ4Mkr/gYwyDLF/0Qwypkxn/myprExnnkd2LECcfkyzrFUnSz8PbkTz/mOpMQk/LztJLhUagkwyDMC/M4b2rRoLgY+pFLMnSzb2DET//pypB4C/Fz+PDFULfl+zrEi/L4p+rFU//pyprEknfMayrMgnfY8pr8Vnnk34MkrGAm8pFpC/p4QPLEo//++JLE3/L4zPFEozfY+2D8k/SzayDECafkyzF8x/Dzd+pSxJBT8pBYxnSznJrEryBMwzF8TnnkVybDUnfk+PS8i/nkyJpkLcfS+ySDUnpzyyLEo/fk+PDEk/S4b2DMo/fT8prrM/Dz02rET/fT+prE3/D4nJpSCL/pOzbkx/nMaJLMrz/pOprkk/nkiyMDU/gSwzBTEnDz8+LEgngS82fVU/DzyJrErp/pyzbLF//QnJbkLpgkOzBYTnD4BybSLagS+2SkVnfk+PDExngYOzbpEngk+2LRLLfY+2DFlnS4z2LELcfk+2fY3ngk8+rEoa/Q+prrI/L4yJbDULfMw2fTCngkwyDMCa/pOpFS7/L4p+bkxG74wzb8k/D4wyDFU/gk8JpLAnnk02bkxyBlyzrb7/Lzz+pST/gY8yDQi/D4Q+bkgzgYwPDFA/gkdPFEgpfl8ySbE/LzwJbkka0DjNsQhwsHCHDDAwoQH8B4AyfRI8FS98g+Dpd4daLP3JFSb/BMsn0pSPM87nrldzSzQ2bPAGdb7zgQB8nph8emSy9E0cgk+zSS1qgzianYt8Lz1/LzN4gzaa/+NqMS6qS4HLozoqfQnPbZEp98QyaRSp9P98pSl4oSzcgmca/P78nTTL0bz/sVManD9q9z1J7+xJMcM2gbFnobl4MSUcdb6agW3tF4ryaRApdz3agWIq7YM47HFqgzkanTU4FSkN7+3G9PAaL+P8DDA/9LI4gzVP0mrnd+P+nprLFkSyS87PrSk8nphpd4PtMmFJ7Ql4BYcaLTS2bDhJFSeL0bQzgQ/8M87cD4l4bQQ2rL68LzD8p8M49kQcAmAPgbFJDS3qrTQyb4y8nLAqMSdzA80p/pAngbF2fbr8Bpf2drl2fc68p4gzDRQ2BpSLMmFNFSbJ9pfLozVJ9lr+FR6pD4Q4f4SygbF4aR889phydbTanTP4FSkzbmoGnMxag8iJaTQweYQygkMcS87JrS9zFGF8g8SzbP78/bM4r+QcA4AzBPROaHVHdWEH0ilPec7+0ZM+0cVHdWlPsHCP/4R',
  'x-t': xt
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
