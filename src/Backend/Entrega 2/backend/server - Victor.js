var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sqlite3 = require("sqlite3").verbose();
var caminho_db = "servidor.db";
var db = new sqlite3.Database(caminho_db);

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item TEXT,
      peso TEXT,
      quantidade INTEGER,
      timestamp TEXT
    )
  `);

});

app.post("/itens", function (req, res) {

  console.log(req.body);

  let item = req.body.item;
  let peso = req.body.peso;
  let quantidade = req.body.quantidade;
  let timestamp = req.body.timestamp;

  db.run(
    `
    INSERT INTO itens (item, peso, quantidade, timestamp)
    VALUES (?, ?, ?, ?)
    `,
    [item, peso, quantidade, timestamp],
    function(err) {

      if (err) {

        console.log(err);

        res.status(500).send("Erro ao salvar");

      } else {

        res.json({
            sucesso: true,
            id: this.lastID
        });

      }

    }
  );

});

app.get("/tudo", function (req, res) {
  db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) {
      res.send(`Ocorreu um erro na busca do BD: ${err}`);
    }
    res.send(rows);
  });
});

app.get("/itens", function(req, res) {

  db.all(
    `SELECT * FROM itens ORDER BY id DESC`,
    [],
    (err, rows) => {

      if (err) {

        res.send(err);

      } else {

        res.json(rows);

      }

    }
  );

});

app.get("/", function (req, res) {
  res.send("El barto esteve aqui...");
});

app.get("/homer", function (req, res) {
  res.send("Dooooounut....");
});

app.post("/dados", function (req, res) {
  console.log(req.body);
  let login = req.body.login;
  let senha = req.body.senha;
  res.send(`Seu login é ${login} e sua senha é ${senha} `);
});

app.delete("/itens/:id", function(req, res) {

  let id = req.params.id;

  db.run(
    `DELETE FROM itens WHERE id = ?`,
    [id],
    function(err) {

      if (err) {

        console.log(err);

        res.status(500).send("Erro ao deletar");

      } else {

        res.send("Item deletado");

      }

    }
  );

});

app.listen(port, () => {
  console.log("Servidor rodando...");
});