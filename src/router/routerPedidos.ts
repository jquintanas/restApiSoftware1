import { Router } from 'express';
import pedidosController from "../controller/controllerPedidos";
import { Seguridad } from "./../utils/seguridad";

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
      this.router.get("/user", Seguridad.verificarToken, pedidosController.getPedidosUser);
      this.router.get("/getAll", pedidosController.getPedidos);
      this.router.get("/:id", Seguridad.verificarToken, pedidosController.findByID);
      this.router.post("/post", Seguridad.verificarToken, pedidosController.postData);
      this.router.delete("/:id", Seguridad.verificarToken, pedidosController.deleteData);
      
    }
  }
  const appRoutes = new routerPedidos();
  export default appRoutes.router;
