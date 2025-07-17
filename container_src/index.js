import express from "express";
import puppeteer from "puppeteer";
const app = express();
const PORT = 8080;

app.get("/screenshot/:url", async (req, res) => {
  try {
    const url = req.params.url;

    try {
      const browser = await puppeteer.launch({});
      const page = await browser.newPage();
      await page.setViewport({ width: 400, height: 400 });
      await page.goto(`https://${url}`);

      const content = await page.content();

      res.status(200).send(content);
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
