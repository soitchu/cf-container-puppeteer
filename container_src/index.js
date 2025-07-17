import express from "express";
import puppeteer from "puppeteer-core";
const app = express();
const PORT = 8080;

async function getBrowser() {
  return await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    headless: "shell",
    args: ["--no-sandbox"],
    defaultViewport: {
      width: 400,
      height: 400,
    },
  });
}
let browser = await getBrowser();

app.get("/screenshot/:url", async (req, res) => {
  try {
    const url = req.params.url;

    try {
      if(!browser.connected) {
        await browser.close();
        browser = await getBrowser();
      }

      const page = await browser.newPage();
      await page.goto(`https://${url}`);

      const screenshot = await page.screenshot({
        type: "png",
      });

      await page.close();

      res.setHeader("Content-Type", "image/png");
      res.setHeader("X-memory-usage", JSON.stringify(process.memoryUsage()));
      res.status(200).send(screenshot);
      return;
    } catch (error) {
      console.error("Error launching Puppeteer:", error);
      res.status(500).send("Error launching Puppeteer: " + error);
      return;
    }
  } catch (error) {
    console.error("Error taking screenshot:", error);
    // res.status(500).send("Error taking screenshot: " + error);
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
