import express from 'express'

// Instancia uma aplicação express
const app = express();

// Determina a porta de execucao
const PORT = 3300;

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});