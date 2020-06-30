import { Router } from 'express';
import pedidosController from "../controller/controllerPedidos";
import { Security } from "./../utils/seguridad";

/**
 * @classdesc Clase router de pedidos.
 * @desc Fecha Creación: 01/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerPedidos} router
 * @author Danny Ríos <dprios@espol.edu.ec>
 */
class routerPedidos {
    public router: Router = Router();
  
    constructor() {
      this.config();
    }
    config():void {
      //this.router.[get | post | put | delete]     
      this.router.get("/user", Security.checkToken, pedidosController.getPedidosUser);
      this.router.get("/getAll", pedidosController.getPedidos);
      this.router.get("/:id", Security.checkToken, pedidosController.findByID);
      this.router.post("/post", Security.checkToken, pedidosController.postData);
      this.router.delete("/:id", Security.checkToken, pedidosController.deleteData);
      
    }
  }
  const appRoutes = new routerPedidos();
  export default appRoutes.router;
