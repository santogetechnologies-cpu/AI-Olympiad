from PIL import Image

src_path = r"C:\Users\Admin\.gemini\antigravity-ide\brain\53429540-5c59-41d6-bc21-42290ef4fae6\.user_uploaded\media_1792862354768.png"
img = Image.open(src_path)

# Let's inspect the right box precisely:
# The right card in the 1024x576 image:
# Left boundary: ~660, Right boundary: ~1004, Top boundary: ~55, Bottom boundary: ~471
box = (660, 55, 1004, 471)
c = img.crop(box)
c.save("public/hero-ai-illustration.png")
c.save("src/assets/hero-ai-illustration.png")
print("Cropped:", c.size)
