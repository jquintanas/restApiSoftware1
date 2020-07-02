import { Router } from 'express';
import pedidosController from "../controller/controllerOrders";
import { Security } from "../utils/security";

/**
 * @classdesc Order router class.
 * @desc Creation Date: 01/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerOrders} router
 * @author Danny Ríos <dprios@espol.edu.ec>
 */
class routerPedidos {
    public router: Router = Router();
  
    constructor() {
      this.config();
    }
    config():void {
      //this.router.[get | post | put | delete]     
      this.router.get("/user", Security.checkToken, pedidosController.getOrdersUser);
      this.router.get("/getAll", Security.checkToken, pedidosController.getOrders);
      this.router.get("/:id", Security.checkToken, pedidosController.findByID);
      this.router.post("/post", Security.checkToken, pedidosController.postData);
      this.router.delete("/:id", Security.checkToken, pedidosController.deleteData);
      
    }
  }
  const appRoutes = new routerPedidos();
  export default appRoutes.router;
