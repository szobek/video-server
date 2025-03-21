const connect = require('./connect');

const sql = "INSERT INTO `videos` (`ID`, `name`, `description`, `rating`, `type`) VALUES (NULL, 'romantic_1.mp4', 'gg', '5', 'romantic'),  (NULL, 'comedy_1.mp4', 'gg', '5', 'romantic')";
(async function seedDB() {
    try {
      const connection = await connect;
      await connection.query(sql);
      console.log('Database has been updated');
      process.exit(0);
    } catch (err) {
      console.log('Failed to Update DB');
      console.log(err);
    }
  })();