const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY não definido. Configure .env com sua chave da Groq API.");
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

// Inicializar Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Servir os arquivos estáticos do diretório pai
app.use(express.static(path.join(__dirname, "..")));

// Página principal do site
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "educar-para-checar.html"));
});

// Caminho que recebe perguntas do aplicativo
app.post("/ia", async (req, res) => {

    try {

        const pergunta = req.body.texto || req.body.mensagem || "";

        if (!pergunta.trim()) {
            return res.status(400).json({
                erro: "Pergunta vazia"
            });
        }

        // Chamar API Groq
        const message = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: "Você é uma IA especializada em educação fiscal e verificação de fake news. Responda em português de forma clara e educativa. Quando receber uma afirmação ou boato, classifique-a como VERDADEIRO, PARCIALMENTE VERDADEIRO, INDETERMINADO ou FALSO, explique por que e cite fontes confiáveis sempre que possível. Se a pergunta for uma dúvida geral, responda como assistente fiscal e ofereça orientação prática."
                },
                {
                    role: "user",
                    content: pergunta
                }
            ],
            max_tokens: 500,
        });

        const resposta = message.choices[0].message.content;

        res.json({
            resposta: resposta
        });

    } catch (erro) {

        console.error("Erro na API:", erro.message);

        res.status(500).json({
            erro: "Erro ao processar a pergunta: " + erro.message
        });

    }

});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🤖 Servidor rodando em http://localhost:${port}`);
    console.log("📡 Conectado à Groq API");
});