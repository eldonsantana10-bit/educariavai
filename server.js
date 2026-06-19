const path = require('path');
const fs = require('fs');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

if (!process.env.GROQ_API_KEY) {
  console.error('GROQ_API_KEY não definido. Configure a variável de ambiente no Render ou crie um .env.local');
  // Não encerra o processo aqui para permitir logs úteis durante deploy
}

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from current working directory
const projectRoot = process.cwd();
console.log('Project working directory (process.cwd):', projectRoot);
try {
  console.log('Files in project root:', fs.readdirSync(projectRoot));
} catch (e) {
  console.error('Cannot list project root files:', e.message);
}

// Initialize Groq client (will read key from env)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.static(projectRoot));

app.get('/', (req, res) => {
  const indexPath = path.join(projectRoot, 'educar-para-checar.html');
  console.log('Looking for index at:', indexPath);
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.status(404).send('Arquivo educar-para-checar.html não encontrado em ' + projectRoot);
});

app.post('/ia', async (req, res) => {
  try {
    const pergunta = req.body.texto || req.body.mensagem || '';
    if (!pergunta.trim()) return res.status(400).json({ erro: 'Pergunta vazia' });

    const message = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content:
            'Você é uma IA especializada em educação fiscal e verificação de fake news. Responda em português de forma clara e educativa. Quando receber uma afirmação ou boato, classifique-a como VERDADEIRO, PARCIALMENTE VERDADEIRO, INDETERMINADO ou FALSO, explique por que e cite fontes confiáveis sempre que possível. Se a pergunta for uma dúvida geral, responda como assistente fiscal e ofereça orientação prática.'
        },
        { role: 'user', content: pergunta }
      ],
      max_tokens: 500
    });

    const resposta = message.choices[0].message.content;
    res.json({ resposta });
  } catch (erro) {
    console.error('Erro na API:', erro && erro.message ? erro.message : erro);
    res.status(500).json({ erro: 'Erro ao processar a pergunta: ' + (erro && erro.message ? erro.message : erro) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🤖 Servidor rodando em http://localhost:${port}`);
  console.log('📡 Conectado à Groq API (se a chave estiver configurada)');
});
