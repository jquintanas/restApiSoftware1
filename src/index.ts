/*
  Fcreación: -----
  Fmodificación: 1/04/2020
  Ucreación: ------
  Umodificación: Danny 
  Comentarios: se importó el archivo router pedidos para hacer uso de las rutas al momento de levantar el server
  */

import express, {Application} from "express";
import morgan from "morgan";
const bodyParser =  require("body-parser");
const path = require("path");
import cors from "cors";
import routerPedidos from "./router/routerPedidos";

class Server {
  public app:Application;
  constructor() {
    this.app = express();
    this.config();
    this.router();  }

  config():void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(cors());
    //static files
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
  

  router():void {
    this.app.use("/",routerPedidos);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
      //db.sequelize.sync();
    });
  }
}
const server = new Server();
server.start();