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
  ((
    SELECT DISTINCT
      S1.nazwa AS a,
      S2.nazwa AS b,
        '' AS c,
        '' AS d,
        przejazd.czas_odjazdu + (S1.czas_dojazdu * interval '1 minute') AS czas_pocz,
        przejazd.czas_odjazdu + (S2.czas_dojazdu * interval '1 minute') AS czas_kon
    FROM
      stacja S1,
      stacja S2,
        przejazd,
        miejsce
    WHERE
      S1.nazwa = $1 AND
      S2.nazwa = $2 AND
        S1.id_trasy = S2.id_trasy AND
        S1.nr < S2.nr AND
        S1.id_trasy = przejazd.id_trasy AND
        przejazd.czas_odjazdu + (S1.czas_dojazdu * interval '1 minute') - ($4 * interval '1 hour') > $3 AND
        miejsce.id_przejazdu = przejazd.id AND
        miejsce.wolne_od <= S1.nr AND miejsce.wolne_do >= S2.nr
    ) UNION (
    SELECT DISTINCT
      S1.nazwa AS a,
      S2.nazwa AS b,
      S3.nazwa AS c,
        '' AS d,
        przejazd.czas_odjazdu + (S1.czas_dojazdu * interval '1 minute') AS czas_pocz,
        przejazd.czas_odjazdu + (S3.czas_dojazdu * interval '1 minute') AS czas_kon
    FROM
      stacja S1,
      stacja S2,
      stacja S3,
        przejazd,
        miejsce M1,
        miejsce M2
    WHERE
      S1.nazwa = $1 AND
      S3.nazwa = $2 AND
        S1.id_trasy = S2.id_trasy AND S2.id_trasy = S3.id_trasy AND
        S1.nr < S2.nr AND S2.nr < S3.nr AND
        S1.id_trasy = przejazd.id_trasy AND
        przejazd.czas_odjazdu + (S1.czas_dojazdu * interval '1 minute') - ($4 * interval '1 hour') > $3 AND
        M1.id_przejazdu = przejazd.id AND M2.id_przejazdu = przejazd.id AND
        M2.wolne_od <= M1.wolne_do AND
        M1.wolne_od <= S1.nr AND M2.wolne_od <= S2.nr AND
        M1.wolne_do >= S2.nr AND M2.wolne_do >= S3.nr
    )) UNION (
    SELECT DISTINCT
      S1.nazwa AS a,
      S2.nazwa AS b,
      S3.nazwa AS c,
      S4.nazwa AS d,
        przejazd.czas_odjazdu + (S1.czas_dojazdu * interval '1 minute') AS czas_pocz,
        przejazd.czas_odjazdu + (S4.czas_dojazdu * interval '1 minute') AS czas_kon
    FROM
      stacja S1,
      stacja S2,
      stacja S3,
      stacja S4,
        przejazd,
        miejsce M1,
        miejsce M2,
        miejsce M3
    WHERE
      S1.nazwa = $1 AND
      S4.nazwa = $2 AND
        S1.id_trasy = S2.id_trasy AND S2.id_trasy = S3.id_trasy AND S3.id_trasy = S4.id_trasy AND
        S1.nr < S2.nr AND S2.nr < S3.nr AND S3.nr < S4.nr AND
        S1.id_trasy = przejazd.id_trasy AND
        przejazd.czas_odjazdu + (S1.czas_dojazdu * interval '1 minute') - ($4 * interval '1 hour') > $3 AND
        M1.id_przejazdu = przejazd.id AND M2.id_przejazdu = przejazd.id AND M3.id_przejazdu = przejazd.id AND
        M2.wolne_od <= M1.wolne_do AND M3.wolne_od <= M2.wolne_do AND
        M1.wolne_od <= S1.nr AND M2.wolne_od <= S2.nr AND M3.wolne_od <= S3.nr AND
        M1.wolne_do >= S2.nr AND M2.wolne_do >= S3.nr AND M3.wolne_do >= S4.nr
    )
    ORDER BY
        czas_pocz
    LIMIT
        10`;
  const params = [body.from, body.to, body.date, body.hour];
  client.query(text, params, (err, dbres) => {
    let response = [];
    for (let i = 0; i < dbres.rows.length; i++) {
      let row = dbres.rows[i];

      // Stations
      let stations = [row.a, row.b];
      if (row.c != '')
        stations.push(row.c);
      if (row.d != '')
        stations.push(row.d);

      // Departure and arrival time
      let depTime = row.czas_pocz;
      let arrTime = row.czas_kon;

      response.push({
        stations: stations,
        depTime: depTime,
        arrTime: arrTime
      });
    }
    res.send(response);
  });
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

app.use(router);
