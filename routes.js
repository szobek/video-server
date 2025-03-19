const connect=require('./connect')

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
}