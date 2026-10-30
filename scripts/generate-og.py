"""Generate the code-drawn, monochrome social image. Requires Pillow."""
from PIL import Image, ImageDraw, ImageFont
import math
from pathlib import Path

image = Image.new('RGB', (1200, 630), '#0a0a0a')
draw = ImageDraw.Draw(image)
fonts = Path('/usr/share/fonts/truetype/dejavu')
def font(size, mono=False):
    return ImageFont.truetype(str(fonts / ('DejaVuSansMono.ttf' if mono else 'DejaVuSans.ttf')), size)
draw.rounded_rectangle((27, 27, 1173, 603), radius=24, fill='#131313', outline='#303030', width=1)
draw.text((72, 68), 'AYMANE AGHARBI  /  AI ENGINEER', font=font(16, True), fill='#a5a5a5')
draw.text((68, 159), 'Building', font=font(69), fill='#f2f2f2')
draw.text((68, 243), 'Intelligent', font=font(69), fill='#929292')
draw.text((68, 327), 'Systems.', font=font(69), fill='#f2f2f2')
draw.line((72, 475, 1128, 475), fill='#303030')
draw.text((72, 516), 'AI ENGINEERING  +  DATA  +  SOFTWARE', font=font(15, True), fill='#aaaaaa')
draw.text((909, 516), 'MOROCCO', font=font(15, True), fill='#888888')
cx, cy = 903, 279
for rx, ry in [(153, 153), (153, 57), (61, 153), (111, 153)]:
    draw.ellipse((cx-rx, cy-ry, cx+rx, cy+ry), outline='#454545', width=1)
for i in range(7):
    angle = 2*math.pi*i/7
    x,y = cx+153*math.cos(angle), cy+153*math.sin(angle)
    draw.ellipse((x-4,y-4,x+4,y+4), fill='#c6c6c6')
draw.rounded_rectangle((cx-34, cy-34, cx+34, cy+34), radius=16, fill='#222222', outline='#999999', width=1)
draw.text((cx-14,cy-25),'A',font=font(36),fill='#f2f2f2')
image.save('public/og-image.png', optimize=True)
