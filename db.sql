DROP TABLE IF EXISTS miejsce;
DROP TABLE IF EXISTS przejazd;
DROP TABLE IF EXISTS stacja;

CREATE TABLE stacja (
    nazwa VARCHAR(128),
    id_trasy INTEGER,
    nr INTEGER,
    czas_dojazdu INTEGER
);

CREATE TABLE przejazd (
    id INTEGER PRIMARY KEY,
    id_trasy INTEGER,
    id_pociagu INTEGER,
    czas_odjazdu TIMESTAMP
);

CREATE TABLE miejsce (
    id INTEGER PRIMARY KEY,
    id_przejazdu INTEGER REFERENCES przejazd (id),
    wolne_od INTEGER,
    wolne_do INTEGER
);

\COPY stacja FROM '/stacja.csv' (FORMAT csv)
\COPY przejazd FROM '/przejazd.csv' (FORMAT csv)
\COPY miejsce FROM '/miejsce.csv' (FORMAT csv)
