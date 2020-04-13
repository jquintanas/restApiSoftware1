import { Router } from "express";
import comprasController from "../controller/controllerCompras";

class routerCompras {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[post]
        this.router.post("/post", comprasController.postData);
        this.router.post("/:id", comprasController.findByID);
        this.router.post("/get", comprasController.getData);
        this.router.post("/:id", comprasController.deleteData);
      }
}
export default new routerCompras().router