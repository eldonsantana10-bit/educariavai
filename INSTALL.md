# 📚 Tutorial de Instalação - Educar para Checar

## ✅ Pré-requisitos

Você precisa ter instalado:
- **Node.js** (versão 16 ou superior)
- **npm** (vem com Node.js)

Para verificar se tem instalado, abra o PowerShell e rode:
```powershell
node --version
npm --version
```

Se não aparecer nenhuma versão, [baixe Node.js aqui](https://nodejs.org/).

---

## 📥 Passo 1: Baixar o projeto

1. Abra o PowerShell ou Prompt de Comando
2. Vá até a pasta onde você quer salvar o projeto:
   ```powershell
   cd c:\Users\SEU_USUARIO\Desktop
   ```
3. Clone o repositório ou extraia a pasta `Educar-IA`

---

## 🔑 Passo 2: Configurar a chave da API Groq

1. Abra a pasta `Educar-IA`
2. Procure por `.env` (arquivo sem extensão com um ponto na frente)
3. Abra com bloco de notas e coloque:
   ```
   GROQ_API_KEY=sua_chave_aqui
   ```

   Para obter sua chave:
   - Vá em [console.groq.com](https://console.groq.com)
   - Crie uma conta grátis
   - Copie sua API Key
   - Cole no `.env`

4. Salve o arquivo

---

## 📦 Passo 3: Instalar as dependências

1. Abra o PowerShell na pasta `Educar-IA`:
   ```powershell
   cd c:\Users\SEU_USUARIO\Desktop\Educar-IA
   ```

2. Rode o comando:
   ```powershell
   npm install
   ```

   Isso pode levar alguns minutos na primeira vez. Você verá uma lista de pacotes sendo instalados.

---

## 🚀 Passo 4: Rodar o servidor

1. Ainda na pasta `Educar-IA`, rode:
   ```powershell
   npm start
   ```

   Você deve ver:
   ```
   🤖 Servidor rodando em http://localhost:3000
   📡 Conectado à Groq API
   ```

2. **NÃO feche essa janela!** O servidor precisa ficar rodando.

---

## 🌐 Passo 5: Abrir no navegador

1. Abra seu navegador (Chrome, Firefox, Edge, etc.)
2. Digite na barra de endereço:
   ```
   http://localhost:3000
   ```

3. Pronto! O site está rodando! 🎉

---

## 🧪 Como usar

### Analisar uma informação com IA
1. Clique em **"Checar"** no menu
2. Cole um texto ou boato no campo de análise
3. Clique em **"Analisar com inteligência artificial"**
4. Veja o resultado (Verdadeiro, Falso, etc.)

### Fazer perguntas no chat
1. Na mesma página, desça até **"Tire dúvidas com a IA fiscal"**
2. Digite uma pergunta (ex.: "O que é ICMS?")
3. Pressione Enter ou clique no botão de enviar
4. A IA responde

### Fazer o Quiz
1. Clique em **"Quiz"** no menu
2. Responda as perguntas sobre educação fiscal
3. Veja seu resultado final

---

## ⚠️ Solução de problemas

### "npm não é reconhecido"
- Node.js não está instalado ou não está no PATH
- Solução: reinstale Node.js e reinicie o PowerShell

### "Erro de conexão" no site
- O servidor não está rodando
- Solução: volte à janela do PowerShell e verifique se está com:
  ```
  🤖 Servidor rodando em http://localhost:3000
  ```

### "GROQ_API_KEY não definido"
- O arquivo `.env` não foi criado ou a chave não foi colocada
- Solução: crie o arquivo `.env` na pasta `Educar-IA` com sua chave

### Porta 3000 já está em uso
- Outro programa está usando a porta 3000
- Solução: feche o outro programa ou mude a porta no `servidor/server.js`

---

## 🌍 Para colocar online (Render)

Veja o arquivo `DEPLOY_RENDER.md` para instruções de como publicar na internet.

---

## 📞 Precisa de ajuda?

Se algo não funcionar, verifique:
1. ✅ Node.js e npm instalados?
2. ✅ `.env` com a chave Groq?
3. ✅ Rodou `npm install`?
4. ✅ Servidor rodando com `npm start`?
5. ✅ Navegador em `http://localhost:3000`?

Se tudo está certo e ainda não funciona, reinicie o computador e tente novamente.

---

**Sucesso! 🚀**
