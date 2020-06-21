import { Router } from "express";
import usuarioController from "../controller/controllerUsuario";
import { Seguridad } from "./../utils/seguridad";

class routerUsuarios {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    //this.router.[get | post | put | delete]
    //this.router.get("/", Seguridad.verificarToken, usuarioController.findAll);
    this.router.get("/:id", Seguridad.verificarToken, usuarioController.findByID);
    this.router.post("/", usuarioController.addUsuario);
    this.router.delete(
      "/:id",
      Seguridad.verificarToken,
      usuarioController.deleteUsuario
    );
    this.router.put("/:id/:reporta/:reportado",Seguridad.verificarToken,usuarioController.updateUsuario);
  }
  
}
const appRoutes = new routerUsuarios();
export default appRoutes.router;
