const app = require('express')();
const http = require('http').createServer(app);
const host = '127.0.0.1';
const port = 5000;
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dataBase.db');

const parser = bodyParser.json({type: 'text'});

app.post('/login', parser, (req, res) => {
  const {login, password} = req.body;
  db.get("SELECT * FROM users WHERE login = ?", login, (err, row) => {
    if (!row) {
      res.json({error: 'Пользователь не найден'})
    } else {
      if (row.password === password) {
        db.all("SELECT * FROM contacts WHERE user_id = ?", row.user_id, (err, rows) => {
          res.json({contacts: rows, user_id: row.user_id});
        })
      } else {
        res.json({error: 'Неверный пароль'})
      };
    }
  });
  res.set('Access-Control-Allow-Origin', '*')
})

app.post('/auth', parser, (req, res) => {
  const {id} = req.body;

  db.all("SELECT * FROM contacts WHERE user_id = ?", id, (err, rows) => {
    res.json({contacts: rows, user_id: id});
  })

  res.set('Access-Control-Allow-Origin', '*')
})

app.post('/addContact', parser, (req, res) => {
  const {name, content, user_id} = req.body;
  
  db.run('INSERT INTO contacts (name, content, user_id) VALUES(?, ?, ?);', [name, content, user_id]);
  res.set('Access-Control-Allow-Origin', '*').json({message: 'Контакт добавлен'})
})

app.post('/editContact', parser, (req, res) => {
  const {name, content, contact_id} = req.body;
  
  db.run('UPDATE contacts SET name = ? WHERE contact_id = ?;', [name, contact_id]);
  db.run('UPDATE contacts SET content = ? WHERE contact_id = ?;', [content, contact_id]);
  res.set('Access-Control-Allow-Origin', '*').json({message: 'Контакт изменен'})
})

app.post('/delete', parser, (req, res) => {
  const {id} = req.body;
  
  db.run('DELETE FROM contacts WHERE contact_id = ?;', id);
  res.set('Access-Control-Allow-Origin', '*').json({message: 'Контакт изменен'})
})

http.listen(port, host, () => console.log(`Сервер запущен. http://${host}:${port}`));