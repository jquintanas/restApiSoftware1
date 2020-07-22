import { Router } from "express";
import paymentController from "../controller/controllerPayment";
import { Security } from "./../utils/security";

/**
* @classdesc Payment router class.
* @desc Creation Date: 04/11/2020
* @class
* @public
* @version 1.0.0
* @returns {routerPayments} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerPayments {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.[get | post | put | delete]
        this.router.get("/:id", Security.checkToken, paymentController.findByID);
        this.router.post("/", Security.checkToken, paymentController.addPayment);
        this.router.delete("/:id", Security.checkToken, paymentController.deletePayment);
    }
}
export default new routerPayments().router
