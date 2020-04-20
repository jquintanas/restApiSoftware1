import { Router } from "express";
import rolsController from "../controller/controllerRol";
import { Seguridad } from "./../utils/seguridad";

class routerRol {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    //this.router.[get | post | put | delete]
    this.router.get("/", Seguridad.verificarToken, rolsController.findAll);
    this.router.get("/:id", Seguridad.verificarToken, rolsController.findById);
    this.router.post("/", Seguridad.verificarToken, rolsController.addRol);
    this.router.delete("/:id", Seguridad.verificarToken, rolsController.deleteRol);
  }
}
export default new routerRol().router;
