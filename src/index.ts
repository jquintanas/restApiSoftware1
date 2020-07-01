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

  /**
   * @classdesc Index class
   * @desc Creation Data: 11/04/2020
   * @author Danny Ríos <dprios@espol.edu.ec>
   */
 import express, {Application} from "express";
 import morgan from "morgan";
 const bodyParser =  require("body-parser");
 const path = require("path");
 const helmet = require('helmet');
 const expectCt = require('expect-ct');
 
 import cors from "cors";
 
 import Ordersrouter from "./router/routerPedidos";
 import Paymentrouter from "./router/routerPayment";
 import Noveltyrouter from "./router/routerNovelty";
 import Userrouter from "./router/routerUser"; 
 //import routerRols from "./router/routerRol"; 
 import routerPurchase from "./router/routerPurchase";
 import Loginrouter from "./router/routerLogin";
 import routerInvoice from "./router/routerInvoice";
 
 class Server {
   public app:Application;
  constructor() {
    this.app = express();
    this.config();
    this.router();  }

  config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(cors());
    //static files
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
    this.app.use(helmet.permittedCrossDomainPolicies());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.contentSecurityPolicy({directives: {defaultSrc: ["'self'"]} }));
    this.app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
    this.app.use(expectCt({
      enforce: true,
      maxAge: 30
    }))
  }
  

  router() {
    this.app.use("/api/orders",Ordersrouter);
    this.app.use("/api/payments",Paymentrouter);
    this.app.use("/api/noveltys", Noveltyrouter);
    this.app.use("/api/usuarios",Userrouter);
    //this.app.use("/api/rols",routerRols);
    this.app.use("/api/compras",routerPurchase);
    this.app.use("/api/login", Loginrouter);
    this.app.use("/api/facturas",routerInvoice);
  }

  start(){
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
      //db.sequelize.sync();
    });
  }
}
const server = new Server();
server.start();