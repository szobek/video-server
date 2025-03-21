const connect = require('./connect');

const sql = `CREATE TABLE IF NOT EXISTS videos2 (
    ID INT unsigned PRIMARY KEY AUTO_INCREMENT,
    name text NOT NULL,
    description text NOT NULL,
    type text NOT NULL,
    rating INT unsigned DEFAULT 0
    )`;
  

  (async function migrateDB() {
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