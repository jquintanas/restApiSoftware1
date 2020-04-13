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
        this.router.get("/:id", comprasController.findByID);
        this.router.get("/get", comprasController.getData);
        this.router.delete("/:id", comprasController.deleteData);
      }
}
export default new routerCompras().router