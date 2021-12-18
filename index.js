import PrismaClientPkg from "@prisma/client";
import express from "express";
import { dirname } from 'path';
import  path  from 'path';
import { fileURLToPath } from 'url';

//Constantes
const PrismaClient = PrismaClientPkg.PrismaClient;
const prisma = new PrismaClient();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));



//Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.use('/images', express.static('images'));

app.get('/api/noticias', async (req, res) => {
    const a = await prisma.noticia.findMany();
    a.map((e) => {
        e.image = req.get('host') + '/images/' + e.image;
    });
    res.send(a);
});

app.get('/api/noticias/:id', async (req, res) => {
    const users = await prisma.noticia.findUnique({where: {codigo: parseInt(req.params.id)}});
    users.image = req.get('host') + '/images/' + users.image;
    res.send(users);

});


//Inicializa Server
app.listen('80', '10.4.240.90');


