import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.send("hello!");
})

app.listen(process.env.PORT || 3000);