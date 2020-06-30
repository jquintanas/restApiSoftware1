import { Router } from "express";
import pagosController from "../controller/controllerPayment";
import { Security } from "../utils/security";

 /**
 * @classdesc Payment router class.
 * @desc Creation Date: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {Paymentrouter} router
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class Paymentrouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[get | post | put | delete]
        this.router.get("/:id",Security.checkToken,pagosController.findByID);
        this.router.post("/", Security.checkToken,pagosController.addPayment);
        this.router.delete("/:id", Security.checkToken,pagosController.deletePayment);
      }
}
export default new Paymentrouter().router