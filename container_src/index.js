import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = 8080;

app.get("/screenshot/:url", (req, res) => {
  try {
    const url = req.params.url;

    try {
      (async () => {
        const browser = await puppeteer.launch({});
        // const page = await browser.newPage();
        // await page.goto(`https://${url}`);
        // const screenshot = await page.screenshot();
        await browser.close();

        // res.setHeader("Content-Type", "image/png");
        // res.send(screenshot);
      })();
    } catch (error) {
      console.error("Error launching Puppeteer:", error);
    }

    res.send("test");
  } catch (error) {
    console.error("Error taking screenshot:", error);
    res.status(500).send("Error taking screenshot: " + error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
