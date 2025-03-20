const connect=require('./connect')
const fs = require('fs');
const path = require('path');

module.exports = function(app) {
    app.get("/test", async(req, res) => {
        try {
    
            const [results, fields] = await connect.query(
              'SELECT * FROM `videos`'
            );
            res.status(200);
            res.send(JSON.stringify(results));
          } catch (err) {
            console.log(err);
          }
    });

    
app.get("/videos", async (req, res) => {
  try {
    
    const [results, fields] = await connect.query(
      'SELECT * FROM `videos`'
    );
    res.set('X-Data', "valami");
    res.status(200);
    res.sendFile(path.join(__dirname, "public/views", "list.html"));
  } catch (err) {
    console.log(err);
  }
});


app.get("/video/:type/:id", (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  const videoPath = path.join(__dirname, 'videos', `${type}_${id}.mp4`);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Handle range request (partial content)
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const fileStream = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    fileStream.pipe(res);
  } else {
    // Send full video if no range is specified
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "list.html"));
});

}

