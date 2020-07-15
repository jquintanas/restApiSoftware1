let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5MjQ5OTU0MjYiLCJpYXQiOjE1OTQ1MTAzMjAsImV4cCI6MTU5NDUxMTIyMH0.XrSNKU04Muk6dVZj6da4MUEgyqxjHlsxsNSglhq1JpA';
//let token;
const url= 'http://localhost:3000';

describe('TEST LOGIN: ', () =>{
    it('It should login a user', (done)=>{
        chai.request(url)
        .post('/api/login/usuario')
        .send({id:"0924995426", clave:"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"})
        .end(function(err,res){
            console.log(res.body)
            res.should.have.status(200);           
        done();
        });
    });

    it('It not should login a user', (done)=>{
        chai.request(url)
        .post('/api/login/usuario')
        .send({id:"0924995416", clave:"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc58"})
        .end(function(err,res){
            console.log(res.body)
            res.should.have.status(404);           
        done();
        });
    });
});

describe('TEST ORDERS: ', () =>{
    it('It should get all orders', (done)=>{
        chai.request(url).get('/api/orders/getAll')
        .set("Authorization", "bearer" + token)     
        .end(function(err,res){
            console.log(res.body)
            res.should.have.status(403);           
        done();
        });
    });

    it('It not should get all orders', (done)=>{
        chai.request(url).get('/api/orders/getAll')
        //.set("Authorization", "bearer" + token)     
        .end(function(err,res){
            console.log(res.body);
            res.should.have.status(403);           
        done();
        });
    });

    it('It not should create order', (done)=>{
        const order = {
            idpedido: 123663,
            idcompra: 123550,
            idproducto: 123474,
            cantidad: 36,
            subtotal: 36.8,
            cubiertos: true
        };
        chai.request(url).post('/api/orders/post')        
        //.set("Authorization", "bearer" + token)   
        .send(order)  
        .end(function(err,res){
            console.log(res.body);
            res.should.have.status(401);           
        done();
        });
    });
});

describe('TEST PURCHASES: ', () =>{
    it('It should get all purchase', (done)=>{
        chai.request(url).get('/api/purchase/getCompras')        
        .set("Authorization", "bearer" + token)   
        .end(function(err,res){
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('array');         
        done();
        });
    });

    it('It not should get all purchase', (done)=>{
        chai.request(url).get('/api/purchase/getCompras')        
        //.set("Authorization", "bearer" + token)   
        .end(function(err,res){
            console.log(res.body);
            res.should.have.status(403);      
        done();
        });
    });
});

describe('TEST USERS: ', () =>{
    it('It should get an user by id', (done)=>{
        chai.request(url).get('/api/usersS/0955744347')        
        .set("Authorization", "bearer" + token)   
        .end(function(err,res){
            console.log(res.body);
            res.should.have.status(200);
        done();
        });
    });
    it('It not should get an user by id', (done)=>{
        chai.request(url).get('/api/usersS/095574447')        
        .set("Authorization", "bearer" + token)   
        .end(function(err,res){
            console.log(res.body);
            res.should.have.status(404);
        done();
        });
    });
});
