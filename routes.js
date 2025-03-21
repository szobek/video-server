const connect = require('./connect')
const fs = require('fs');
const path = require('path');

const convertResult = (results) => {
  const movie_data = [];
  for (let movie of results) {
    if (movie_data.filter(mov => mov.type === movie.type).length === 0) {
      movie_data.push({
        type: movie.type,
        movies: []
      })
    }

    for (let mov of movie_data) {
      if (mov.type === movie.type) {
        mov.movies.push({
          ID: movie.ID,
          name: movie.name,
          description: movie.description,
          type: movie.type
        });
      }
    }

  }
  return movie_data;
}

module.exports = function (app) {
  app.get("/test", async (req, res) => {
    try {

      const [results, fields] = await connect.query(
        'SELECT * FROM `videos`'
      );
      res.status(200);
      const movie_data = convertResult(results);
      res.send(JSON.stringify(movie_data));
    } catch (err) {
      console.log(err);
      res.status(500);
      res.send("Internal server error");
    }
  });


  app.get("/videos", async (req, res) => {
    try {

      const [results, fields] = await connect.query(
        'SELECT * FROM `videos` GROUP BY type'
      );
      res.set('X-Data', "valami");
      res.status(200);
      res.sendFile(path.join(__dirname, "public/views", "list.html"));
    } catch (err) {
      console.log(err);
    }
  });


  app.get("/video/:name", (req, res) => {
    const videoName = req.params.name;
    const videoPath = path.join(__dirname, 'videos', `${videoName}.mp4`);
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

