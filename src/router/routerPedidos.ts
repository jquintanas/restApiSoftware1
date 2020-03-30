/*
  Fcreación: 30/03/2020
  Fmodificación: ------
  Ucreación: Danny
  Umodificación: ------ 
  Comentarios: creación de archivo pedidos router para generar las rutas de enlace.
  */

import { Router } from 'express';
import pedidosController from "../controller/controllerPedidos";
class routerPedidos {
    public router: Router = Router();
  
    constructor() {
      this.config();
    }
    config():void {
      //this.router.[get | post | put | delete]
      this.router.get("/pedidos/",pedidosController.index);
      this.router.post("/pedidos/", pedidosController.json);
      this.router.get("/pedidos/getData", pedidosController.getData);
      this.router.post("/pedidos/postData",pedidosController.postData);
      this.router.delete("/pedidos/deleteData/:id", pedidosController.deleteData);
      
    }
  }
  const appRoutes = new routerPedidos();
  export default appRoutes.router;
