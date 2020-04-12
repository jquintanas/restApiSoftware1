import { Router } from "express";
import rolsController from "../controller/controllerRol";

class routerRol {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    //this.router.[get | post | put | delete]
    this.router.get("/get", rolsController.getData);
    this.router.get("/:id", rolsController.findByID);
    this.router.post("/post", rolsController.postData);
    this.router.delete("/:id", rolsController.deleteData);
  }
}
export default new routerRol().router;
