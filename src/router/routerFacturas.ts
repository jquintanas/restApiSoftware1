import { Router } from "express";
import facturasController from "../controller/controllerFacturas";

class routerFacturas {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[get | post]
        this.router.post("/post", facturasController.postData);
        this.router.get("/:id",facturasController.findByID);
        this.router.get("/:id",facturasController.getData);
      }
}
export default new routerFacturas().router