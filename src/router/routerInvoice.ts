import { Router } from "express";
import invoiceController from "../controller/controllerInvoice";
import { Security } from "../utils/security";

/**
 * @classdesc Router class for invoice.
 * @desc Creation date: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerFacturas} router
 * @author Francesca Man Ging<fman@espol.edu.ec>
 */

class routerInvoice {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[get | post]
        this.router.post("/post", Security.checkToken, invoiceController.postData);
        this.router.get("/fuser",Security.checkToken, invoiceController.getInvoiceUser);
        this.router.get("/getFacturas",Security.checkToken, invoiceController.getInvoice);
        this.router.get("/:id",Security.checkToken, invoiceController.findByID);
        
      }
}
export default new routerInvoice().router