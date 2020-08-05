import { Router } from 'express';
import orderController from "../controller/controllerOrder";
import { Security } from "../utils/security";

/**
 * @classdesc Order router class.
 * @desc Creation Date: 01/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerOrder} router
 * @author Danny Ríos <dprios@espol.edu.ec>
 */
class routerOrder {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    //this.router.[get | post | put | delete]     
    this.router.get("/user", Security.checkToken, orderController.getOrdersUser);
    this.router.get("/getAll", Security.checkToken, orderController.getOrders);
    this.router.get("/:id", Security.checkToken, orderController.findByID);
    this.router.post("/post", Security.checkToken, orderController.postData);
    this.router.put("/put", Security.checkToken, orderController.updateOrder);
    this.router.delete("/:id", Security.checkToken, orderController.deleteData);

  }
}
const appRoutes = new routerOrder();
export default appRoutes.router;
