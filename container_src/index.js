import express from "express";
import puppeteer from "puppeteer-core";
const app = express();
const PORT = 8080;

const browser = await puppeteer.launch({
  headless: "shell",
  args: ["--no-sandbox"],
  defaultViewport: {
    width: 400,
    height: 400,
  },
});

app.get("/screenshot/:url", async (req, res) => {
  try {
    const url = req.params.url;

    try {
      const page = await browser.newPage();
      await page.goto(`https://${url}`);

      const screenshot = await page.screenshot({
        type: "png",
      });

      res.setHeader("Content-Type", "image/png");
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
