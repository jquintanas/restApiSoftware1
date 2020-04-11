import { Router } from "express";
import rolsController from "../controller/controllerRol";

class routerRol {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[get | post | put | delete]
        this.router.get("/get", rolsController.getData);
        this.router.get("/:id",rolsController.findByID);
      }
}
export default new routerRol().router