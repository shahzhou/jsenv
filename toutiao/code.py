import os
import subprocess


os.environ['NODE_PATH'] = 'D:\Program Files\nodejs\node_global\node_modules'
url = 'https://www.toutiao.com/?wid=1685437205578'
signature = subprocess.getoutput('node tt.js "{}"'.format(url))

print(signature)