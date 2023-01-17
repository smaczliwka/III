const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 4000;

const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'raily'
});
client.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/', (req, res) => {
  const body = req.body;
  let text = `
SELECT S1.nazwa AS a, S2.nazwa AS b FROM stacja S1, stacja S2, przejazd P1 WHERE
 S1.nazwa = $1 AND S2.nazwa = $2 AND
 P1.czas_odjazdu + $4 * interval '1 hour' + S1.czas_dojazdu * interval '1 minute' >= $3 AND
 S1.id_trasy = P1.id_trasy AND S2.id_trasy = P1.id_trasy AND
 S2.czas_dojazdu > S1.czas_dojazdu
 GROUP BY a, b`;
  const params = [body.from, body.to, body.date, body.hour];
  client.query(text, params, (err, dbres) => {
    if (dbres.rows.length > 0)
      res.send({ stations: [dbres.rows[0].a, dbres.rows[0].b] });
    else
      res.send({});
  });
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

app.use(router);
