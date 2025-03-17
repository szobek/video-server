const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static("public"));

// Video streaming endpoint
app.get("/video", (req, res) => {
  const videoPath = path.join(__dirname, "videos", "sample_.mp4");
  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;

  const range = req.headers.range;
  if (!range) {
    return res.status(416).send("Requires Range header");
  }

  const CHUNK_SIZE = 10 ** 6; // 1MB chunk size
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
  const contentLength = end - start + 1;

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  });

  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
