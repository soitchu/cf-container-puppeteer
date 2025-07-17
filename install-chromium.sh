wget "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F1483032%2Fchrome-linux.zip?alt=media" -O chromium.zip
unzip chromium.zip -d /home/puppeteer
rm chromium.zip
chmod +x /home/puppeteer/chrome-linux/chrome
