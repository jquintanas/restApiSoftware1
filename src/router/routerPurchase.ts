import { Router } from "express";
import purchaseController from "../controller/controllerPurchase";
import { Security } from "../utils/security";

/**
 * @classdesc Router class for puchase
 * @desc Creation Date: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerPurchase} router
 * @author Francesca Man Ging<fman@espol.edu.ec>
 */

class routerPurchase {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.[post]
        this.router.post("/post", Security.checkToken, purchaseController.postData);
        this.router.get("/cuser", Security.checkToken, purchaseController.getPurchaseUser);
        this.router.get("/getCompras", Security.checkToken, purchaseController.getPurchase);
        this.router.get("/:id", Security.checkToken, purchaseController.findByID);
        this.router.delete("/:id", Security.checkToken, purchaseController.deleteData);
    }
}
export default new routerPurchase().router