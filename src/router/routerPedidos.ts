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
      this.router.get("/get", pedidosController.getData);
      this.router.get("/:id", pedidosController.findByID);
      this.router.post("/post",pedidosController.postData);
      this.router.delete("/:id", pedidosController.deleteData);
      
    }
  }
  const appRoutes = new routerPedidos();
  export default appRoutes.router;
