// app.js
import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor escoltant al port ${port}`);
});
