const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
routes(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
