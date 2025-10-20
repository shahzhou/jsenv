import asyncio
import websockets,time, json

async def client():
    async with websockets.connect("ws://localhost:9999/python") as ws:
        t = int(time.time() * 1000)
        content = f"timestamp={t}&secret=KHVheWluZ18zZWNyZXRfYXBB"
        content = json.dumps({
    "appid": "search-pc-java",
    "functionId": "pc_search_searchWare",
    "client": "pc",
    "clientVersion": "1.0.0",
    "t": 1760770039337,
    "body": "8499571475dcb689e85255b7b13c6002cdd8049a746a5d9545accde52378affe"
})
        await ws.send(content)
        response = await ws.recv()
        print(f"服务器响应: {response}")

asyncio.get_event_loop().run_until_complete(client())