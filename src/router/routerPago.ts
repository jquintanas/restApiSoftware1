import { Router } from "express";
import pagosController from "../controller/controllerPago";
class routerPagos {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[get | post | put | delete]
        this.router.get("/:id",pagosController.findByID);
      }
}
export default new routerPagos().router