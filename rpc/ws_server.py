import asyncio
import websockets

client = {}
async def handler(websocket, path):
    if path == '/python':
        client['py'] = websocket
    if path == '/js':
        client['js'] = websocket
    print('路径：', path)
    async for message in websocket:
        if path == '/python':
            print(f"来这py端消息: {message},{type(message)}向浏览器发送")
            await client['js'].send(message)
        if path == '/js':
            print(f"来这浏览器消息: {message},{type(message)}向py端发送")
            await client['py'].send(message)



start_server = websockets.serve(handler, "localhost", 9999)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()