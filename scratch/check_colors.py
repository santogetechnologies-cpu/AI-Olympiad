from PIL import Image

img = Image.open('public/hero-ai-illustration.png')
w, h = img.size
print('Top-left:', img.getpixel((5, 5)))
print('Top-right:', img.getpixel((w-5, 5)))
print('Bottom-left:', img.getpixel((5, h-5)))
print('Bottom-right:', img.getpixel((w-5, h-5)))
