const express = require("express");
// server é o objeto do servidor
const server = express();
// utilizando uma template engine
const nunjucks = require("nunjucks");

const db = require("./database/db.js");

nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

// configurando a pasta public
server.use(express.static("public"));

// Habilita o request.body ser estendido (visualizado) por toda aplicação
server.use(express.urlencoded({extended: true}));

server.get("/", function(req, res) {
    return res.render("index.html");
});

server.get("/create-point", function(req, res) {

    const data = req.query;
    console.log(data);

    return res.render("create-point.html");
});

server.post("/savepoint", function(req, res){

    // console.log(req.body);
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?)
    `;
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];
    
    // console.log(req.body);

    // essa função não impede que o fluxo do código ocorra
    // por isso é uma função callback, retorna assim que estiver pronta
    function afterInsertData(err){
        if(err){
            //res.render("create-point.html",{saved:false});
            return console.log(err);
        }
        console.log(this);
        // retorna apenas quando terminar o cadastro
        res.render("create-point.html", {saved:true});
    }

    // Inserção de dados
    db.run(query, values, afterInsertData);
});

server.get("/search", function(req, res) {

    const search = req.query.search; 
    
    if (search==""){
        return res.render("search-results.html", {places:0, total:0});
    }

    // Pegar os dados do database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }

        const total =  rows.length;
        
        // console.log("Deu certo");
        
        // Enviar para a página HTML
        return res.render("search-results.html", {places:rows, total});
        // places guarda todos os itens no banco de dados
        // Lembrando de que essa dinâmica ocorre devido ao uso de 
        // um template engine : nunjucks
    });

});

server.listen(3000);