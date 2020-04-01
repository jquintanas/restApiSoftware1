/*
  Fcreación: 30/03/2020
  Fmodificación: 01/04/2020
  Ucreación: Danny
  Umodificación: Danny 
  Comentarios: se cambiaron las rutas de get y post
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
      this.router.get("/pedidos",pedidosController.index);
      this.router.post("/pedidos", pedidosController.json);
      this.router.get("/pedidos/getData", pedidosController.getData);
      this.router.post("/pedidos/postData",pedidosController.postData);
      this.router.delete("/pedidos/deleteData/:id", pedidosController.deleteData);
      
    }
  }
  const appRoutes = new routerPedidos();
  export default appRoutes.router;
