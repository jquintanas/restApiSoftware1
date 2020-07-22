import { Router } from "express";
import userController from "../controller/controllerUser";
import { Security } from "../utils/security";


/**
 * @classdesc User router class.
 * @desc Creation Date: 04/11/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerUser} router
 * @author Karla B. Burgos Gayrey <kbburgos@espol.edu.ec>
 */

class routerUser {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    //this.router.[get | post | put | delete]
    //this.router.get("/", Seguridad.verificarToken, userController.findAll);
    this.router.get("/:id", Security.checkToken, userController.findByID);
    this.router.post("/", Security.checkToken, userController.addUser);
    this.router.delete("/:id",Security.checkToken,userController.deleteUser);
    this.router.put("/update/:id",Security.checkToken,userController.updateUsuario);
  }

}
const appRoutes = new routerUser();
export default appRoutes.router;
