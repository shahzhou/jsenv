import execjs, random, requests, json, re, ddddocr
from track import get_token
import numpy as np
from typing import List

headers = {
  'Accept': '*/*',
  'Accept-Language': 'zh,en;q=0.9,zh-CN;q=0.8',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'Pragma': 'no-cache',
  'Referer': 'https://dun.163.com/',
  'Sec-Fetch-Dest': 'script',
  'Sec-Fetch-Mode': 'no-cors',
  'Sec-Fetch-Site': 'same-site',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
  'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'cookie': '_ga=GA.1.2652a12902fc5.1e6698bdbe71b9b7157e; NTES_P_UTID=Yzu4dxFgDTjOp8PW05II1NrGZxYcBcNu|1758855801; P_INFO=shaohaozhou@163.com|1758855801|0|mail163|00&99|gud&1758855531&mailmaster_ios#gud&440300#10#0#0|&0|mailmaster_ios|shaohaozhou@163.com; nts_mail_user=shaohaozhou@163.com:-1:1; timing_user_id=time_9AIwk2J46Z; _ga=GA1.1.432572319.1759977623; _clck=s5p1gq%5E2%5Eg00%5E0%5E2108; _ga_C6TGHFPQ1H=GS2.1.s1759977622$o1$g0$t1759977676$j6$l0$h0; Hm_lvt_4671c5d502135636b837050ec6d716ce=1760442286; HMACCOUNT=3281C2A16E3CB9D1; __root_domain_v=.163.com; _qddaz=QD.745160442286854; gdxidpyhxdE=6GbSHYkmybddO0N2raOJblIArRd46jkYRVk6HTOc7xceeU%2FUlB4MjkQCQWTh0i8EtamdtUIRxjgSqc2L%2BC391S8TpIIvM%5CfTpZZbd6d9JKPKHCv2Hmv%2FeQztC5XAarP5mAhXhuy25JPM3AOHxJvIcKR1TTZjp7b%2FzAwoas%5C%2FqDk5Pusf%3A1760452387807; Hm_lpvt_4671c5d502135636b837050ec6d716ce=1760696631'
}

def get_pic():
    token = get_token()
    print('get_pic>token>>', token)
    fp = execjs.compile(open('./demo.js', 'r', encoding='utf-8').read()).call('get_fp')
    cb = execjs.compile(open('./demo.js', 'r', encoding='utf-8').read()).call('get_cb')
    print('fp', fp)
    print('cb', cb)
    callback = f"__JSONP_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=8))}_0"
    params = {
        'referer': 'https://dun.163.com/trial/sense',
        'zoneId': 'CN31',
        'dt': 'iS541UkSbKNAElBAERKCx7wM1dJ+qhT6',
        'irToken': 'u5kOITs6aLxFNhFQRRaDjFESSw3JoUtP',
        'id': '5a0e2d04ffa44caba3f740e6a8b0fa84',
        'fp': fp,
        'https': 'true',
        'type': '',
        'version': '2.28.5',
        'dpr': '1',
        'dev': '1',
        'cb': cb,
        'ipv6': 'false',
        'runEnv': '10',
        'group': '',
        'scene': '',
        'lang': 'zh-CN',
        'sdkVersion': '',
        'loadVersion': '2.5.3',
        'iv': '4',
        'user': '',
        'width': '286',
        'audio': 'false',
        'sizeType': '10',
        'smsVersion': 'v3',
        'token': token,
        'callback': callback,
    }

    response = requests.get('https://c.dun.163.com/api/v3/get', params=params, headers=headers)
    json_str = re.search(rf"{callback}\((.*?)\);", response.text, re.S).group(1)
    result = json.loads(json_str)
    print(result)
    bg_url = result['data']['bg'][0]
    front_url = result['data']['front'][0]
    _token = result['data']['token']
    print('_token>', _token)
    bg = requests.get(bg_url, headers=headers)
    with open('bg.jpg', 'wb') as f:
        f.write(bg.content)
    print('保存滑块背景图片')
    front = requests.get(front_url, headers=headers)
    with open('front.png', 'wb') as f:
        f.write(front.content)
    print('保存滑块图片')
    return _token

def move():
    token = get_pic()
    src = open('bg.jpg', "rb").read()
    slider = open('front.png', "rb").read()
    det = ddddocr.DdddOcr(det=False, ocr=True, show_ad=False)
    res = det.slide_match(src, slider, simple_target=True)
    x = res['target'][0] * (286/320)
    max_x = 246
    print('滑行距离:',x)
    return round(x), token  # +-5都可以


def check():
    url = "https://c.dun.163.com/api/v3/check"
    callback = f"__JSONP_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=8))}_0"
    cb = execjs.compile(open('./demo.js', 'r', encoding='utf-8').read()).call('get_cb')
    x, token = move()
    # token = get_token()
    generator = SliderTrajectoryGenerator()
    distance = x  # 需要滑行的距离
    track_list = generator.generate_trajectory(distance)
    print('轨迹:', track_list)
    print('轨迹长度:', len(track_list))
    width = 286
    data = execjs.compile(open('./demo.js', 'r', encoding='utf-8').read()).call('get_slider_data', track_list, x, width, token)
    print('轨迹加密数据', data)
    params = {
        "referer": "https://dun.163.com/trial/sense",
        "zoneId": "CN31",
        "dt": "iS541UkSbKNAElBAERKCx7wM1dJ+qhT6",
        "id": "5a0e2d04ffa44caba3f740e6a8b0fa84",
        "version": "2.28.5",
        "cb": cb,
        "user": "",
        "extraData": "",
        "bf": "0",
        "runEnv": "10",
        "sdkVersion": "undefined",
        "loadVersion": "2.5.3",
        "iv": "4",
        "token": token,
        "type": "2",
        "width": "286",
        # "data": "{\"d\":\"\",\"m\":\"%s\",\"p\":\"%s\",\"ext\":\"%s\"}" % (data['m'], data['p'], data['ext']),
        "data": str(data),
        "callback": callback

    }

    res = requests.get(url, params=params, headers=headers, verify=False)
    print(res.status_code)
    print(res.text)


class SliderTrajectoryGenerator:
    def __init__(self):
        self.min_points = 20
        self.max_points = 80

    def generate_trajectory(self, slide_distance: int) -> List[List[int]]:
        """
        根据滑行距离生成轨迹数组
        slide_distance: 需要滑行的距离（像素）
        返回: 轨迹数组 [[x, y, t, 1], ...]
        """
        # 验证输入
        if slide_distance <= 0:
            raise ValueError("滑行距离必须大于0")

        # 随机确定轨迹长度
        num_points = random.randint(self.min_points, self.max_points)

        # 生成随机起始点（x限制在3-6之间）
        start_x, start_y, start_time = self._generate_random_start()

        # 生成时间序列（从随机起始时间开始）
        total_time = self._calculate_total_time(slide_distance)
        time_points = self._generate_time_sequence(num_points, total_time, start_time)

        # 生成x坐标（从随机起始位置开始）
        x_coords = self._generate_x_coordinates(num_points, start_x, slide_distance)

        # 生成y轴抖动（从随机起始y值开始）
        y_offsets = self._generate_y_jitter(num_points, start_y)

        # 组装轨迹数据
        trajectory = []
        for i in range(num_points):
            point = [
                int(x_coords[i]),  # x坐标
                int(y_offsets[i]),  # y偏移
                int(time_points[i]),  # 时间戳
                1  # 状态码
            ]
            trajectory.append(point)

        return trajectory

    def _generate_random_start(self) -> tuple:
        """生成随机起始点（x限制在3-6之间）"""
        # x起始位置：3-6px之间
        start_x = random.randint(3, 6)

        # y起始偏移：-3到3之间，模拟初始抖动
        start_y = random.randint(-3, 3)

        # 起始时间：0-100ms之间，模拟开始前的准备时间
        start_time = random.randint(0, 100)

        return start_x, start_y, start_time

    def _calculate_total_time(self, distance: int) -> int:
        """根据距离计算总时间"""
        # 人类滑动速度通常在0.3-0.6px/ms
        base_speed = random.uniform(0.35, 0.55)
        base_time = distance / base_speed

        # 添加随机波动 (±20%)
        time_variation = base_time * random.uniform(0.8, 1.2)
        return int(max(300, min(time_variation, 2000)))  # 限制在300-2000ms之间

    def _generate_time_sequence(self, num_points: int, total_time: int, start_time: int) -> List[int]:
        """生成时间序列（从随机起始时间开始）"""
        # 总时间包括起始时间
        effective_time = total_time + start_time

        base_times = np.linspace(start_time, effective_time, num_points)

        # 添加时间抖动（模拟人类操作的不规律性）
        jitter = np.random.normal(0, total_time * 0.02, num_points)
        times = base_times + jitter
        times = np.clip(times, start_time, effective_time)
        times = np.sort(times)  # 确保时间单调递增

        return times.tolist()

    def _generate_x_coordinates(self, num_points: int, start_x: int, distance: int) -> List[float]:
        """生成x坐标的S形运动曲线（从随机起始位置开始）"""
        # 总移动距离 = 目标距离 - 起始位置
        actual_distance = distance - start_x

        progress = np.linspace(0, 1, num_points)

        x_coords = []
        for p in progress:
            if p <= 0.3:  # 加速阶段 (0-30%)
                # 二次加速曲线
                stage_progress = p / 0.3
                current_distance = actual_distance * 0.3 * (stage_progress ** 2)
            elif p <= 0.7:  # 匀速阶段 (30-70%)
                # 线性增长
                stage_progress = (p - 0.3) / 0.4
                current_distance = actual_distance * (0.3 + 0.4 * stage_progress)
            else:  # 减速阶段 (70-100%)
                # 二次减速曲线
                stage_progress = (p - 0.7) / 0.3
                current_distance = actual_distance * (0.7 + 0.3 * (1 - (1 - stage_progress) ** 2))

            # 加上起始位置
            x_coords.append(start_x + current_distance)

        # 确保精确到达目标距离
        x_coords[-1] = distance

        return x_coords

    def _generate_y_jitter(self, num_points: int, start_y: int) -> List[int]:
        """生成y轴抖动（从随机起始y值开始）"""
        y_offsets = []
        current_y = start_y

        for i in range(num_points):
            # 随机决定是否改变y方向
            if random.random() < 0.25:  # 25%的概率改变方向
                change = random.choice([-1, 0, 1])
                current_y += change

            # 限制y偏移范围在-3到3之间
            current_y = max(-3, min(3, current_y))
            y_offsets.append(current_y)

        return y_offsets

    def batch_generate(self, distances: List[int]) -> List[List[List[int]]]:
        """批量生成多条轨迹"""
        return [self.generate_trajectory(distance) for distance in distances]


class AdvancedSliderGenerator(SliderTrajectoryGenerator):
    def __init__(self):
        super().__init__()

    def _generate_random_start(self, strategy: str = "normal") -> tuple:
        """根据策略生成不同的起始点（x限制在3-6之间）"""
        # x起始位置始终在3-6之间
        start_x = random.randint(3, 6)

        if strategy == "aggressive":
            # 激进模式：起始时间更短，y抖动更小
            start_y = random.randint(-2, 2)
            start_time = random.randint(0, 50)
        elif strategy == "conservative":
            # 保守模式：起始时间更长，y抖动更大
            start_y = random.randint(-3, 3)
            start_time = random.randint(50, 150)
        else:  # normal
            # 正常模式
            start_y = random.randint(-3, 3)
            start_time = random.randint(0, 100)

        return start_x, start_y, start_time

    def generate_with_strategy(self, distance: int, strategy: str = "normal") -> List[List[int]]:
        """
        根据不同策略生成轨迹
        strategy: "aggressive" - 激进模式, "conservative" - 保守模式, "normal" - 正常模式
        """
        # 根据策略调整轨迹长度
        if strategy == "aggressive":
            num_points = random.randint(20, 40)
        elif strategy == "conservative":
            num_points = random.randint(50, 80)
        else:
            num_points = random.randint(30, 60)

        # 生成起始点
        start_x, start_y, start_time = self._generate_random_start(strategy)

        # 生成时间序列
        total_time = self._calculate_total_time(distance - start_x)
        time_points = self._generate_time_sequence(num_points, total_time, start_time)

        # 生成x坐标
        x_coords = self._generate_x_coordinates(num_points, start_x, distance)

        # 生成y轴抖动
        y_offsets = self._generate_y_jitter(num_points, start_y)

        # 组装轨迹
        trajectory = []
        for i in range(num_points):
            point = [int(x_coords[i]), int(y_offsets[i]), int(time_points[i]), 1]
            trajectory.append(point)

        return trajectory

    def generate_with_custom_start(self, distance: int, start_x: int = None, start_y: int = None,
                                   start_time: int = None) -> List[List[int]]:
        """自定义起始点生成轨迹（x限制在3-6之间）"""
        # 使用自定义值或随机生成（x必须在3-6之间）
        start_x = start_x if start_x is not None and 3 <= start_x <= 6 else random.randint(3, 6)
        start_y = start_y if start_y is not None else random.randint(-3, 3)
        start_time = start_time if start_time is not None else random.randint(0, 100)

        num_points = random.randint(self.min_points, self.max_points)
        total_time = self._calculate_total_time(distance - start_x)

        time_points = self._generate_time_sequence(num_points, total_time, start_time)
        x_coords = self._generate_x_coordinates(num_points, start_x, distance)
        y_offsets = self._generate_y_jitter(num_points, start_y)

        trajectory = []
        for i in range(num_points):
            point = [int(x_coords[i]), int(y_offsets[i]), int(time_points[i]), 1]
            trajectory.append(point)

        return trajectory


if __name__ == '__main__':
    check()
    # generator = SliderTrajectoryGenerator()
    # distance = 150  # 需要滑行的距离
    # track_ist = generator.generate_trajectory(distance)
    # print('轨迹:', track_ist)
    # print('轨迹长度:', len(track_ist))