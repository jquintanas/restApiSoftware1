import { Router } from "express";
import usuarioController from "../controller/controllerUsuario";
import { Security } from "./../utils/seguridad";

class routerUsuarios {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    //this.router.[get | post | put | delete]
    //this.router.get("/", Seguridad.verificarToken, usuarioController.findAll);
    this.router.get("/:id", Security.checkToken, usuarioController.findByID);
    this.router.post("/", Security.checkToken, usuarioController.addUsuario);
    this.router.delete("/:id",Security.checkToken,usuarioController.deleteUsuario);
    this.router.put("/:id/:reporta/:reportado",Security.checkToken,usuarioController.updateUsuario);
  }
  
}
const appRoutes = new routerUsuarios();
export default appRoutes.router;
