import os
import subprocess

os.environ['NODE_PATH'] = 'D:\Program Files\nodejsl\node_global\node_modules'

signature = subprocess.getoutput('node pdd.js')

print(signature)