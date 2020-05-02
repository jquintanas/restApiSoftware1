"use strict";
/*
  Fcreación: -----
  Fmodificación: 1/04/2020
  Ucreación: ------
  Umodificación: Danny
  Comentarios: se importó el archivo router pedidos para hacer uso de las rutas al momento de levantar el server

  UModificacion: JQuintana
  fecha: 11/04/2020
  Comentario: se agregan router de pago y novedad.
  */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require('helmet');
const expectCt = require('expect-ct');
const cors_1 = __importDefault(require("cors"));
const routerPedidos_1 = __importDefault(require("./router/routerPedidos"));
const routerPago_1 = __importDefault(require("./router/routerPago"));
const routerNovedad_1 = __importDefault(require("./router/routerNovedad"));
const routerUsuario_1 = __importDefault(require("./router/routerUsuario"));
//import routerRols from "./router/routerRol"; 
const routerCompras_1 = __importDefault(require("./router/routerCompras"));
const routerLogin_1 = __importDefault(require("./router/routerLogin"));
//import routerFacturas from "./router/routerFacturas"; 
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.router();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(cors_1.default());
        //static files
        this.app.use(express_1.default.static(path.join(__dirname, '/public')));
        this.app.use(morgan_1.default("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
        this.app.use(helmet.permittedCrossDomainPolicies());
        this.app.use(helmet.noSniff());
        this.app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));
        this.app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
        this.app.use(expectCt({
            enforce: true,
            maxAge: 30
        }));
    }
    router() {
        this.app.use("/api/pedidos", routerPedidos_1.default);
        this.app.use("/api/pagos", routerPago_1.default);
        this.app.use("/api/novedad", routerNovedad_1.default);
        this.app.use("/api/usuarios", routerUsuario_1.default);
        //this.app.use("/api/rols",routerRols);
        this.app.use("/api/compras", routerCompras_1.default);
        this.app.use("/api/login", routerLogin_1.default);
        //this.app.use("/api/facturas",routerFacturas);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port: ", this.app.get("port"));
            //db.sequelize.sync();
        });
    }
}
const server = new Server();
server.start();
