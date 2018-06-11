const http = require('http'),
  fs = require('fs')
  crypto = require('crypto'),
  promisify = require('util').promisify,
  writeFile = promisify(fs.writeFile),
  readFile = promisify(fs.readFile);

function getIndex(req, res) {
    this.readFile('./index.html')
      .then(html => {
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();
      })
      .catch(err => {
        throw err
      });
}

function processRequest(req, res) {
  const data = { result: null };
  if (req.body.textarea) {
    this.writeFile(`./secrets/${req.body.username}`, encrypt(req.body.textarea, req.body.password))
      .then(() => {
        data.result = 'Geheim opgeslagen'
        res.json(data).end();
      })
      .catch(err => {
        throw err;
      });
  } else {
    this.readFile(`./secrets/${req.body.username}`, { encoding: 'utf8' })
      .then(file => {
        return decrypt(file, req.body.password)
      })
      .then(text => {
        data.result = text
        res.json(data).end();
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          data.textarea = `No message for this user`;
        } else {
          throw err;
        }
      })
  }
}

function encrypt(text, password) {
  const cipher = crypto.createCipher('aes-256-ctr', password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text, password) {
  const decipher = crypto.createDecipher('aes-256-ctr', password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  getIndex,
  processRequest,
}