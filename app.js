const express = require('express')
const path = require('path')

const app = express()

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


const meu_nome = 'Julia'

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/projetos', (req,res) => {
    res.render('projetos')
})

app.get('/curriculo', (req,res) => {
    res.render('curriculo')
})

app.get('/contato', (req,res) => {
    res.render('contato')
})

app.get('/sobre', (req,res) => {
    res.render('sobremim')
})

app.get('/certificados', (req,res) => {
    res.render('certificados')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// --- logo abaixo dos outros middlewares ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure aqui com seu e‑mail e senha (ou senha de app)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seuemail@gmail.com',
    pass: 'suasenha'
  }
});

app.post('/enviar-contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: 'seuemail@gmail.com',
    subject: `Contato de ${nome}`,
    text: `Nome: ${nome}\nE‑mail: ${email}\n\n${mensagem}`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao enviar formulário.');
    }
    res.redirect('/contato?sucesso=true');
  });
});




