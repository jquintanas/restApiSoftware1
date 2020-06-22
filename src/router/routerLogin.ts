import { Router } from "express";
import comprasLogin from "../controller/controllerLogin";

  /**
 * @classdesc Clase router de login.
 * @desc Fecha Creación: 19/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerPagos} router
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class routerLogin {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[post]
        this.router.post("/usuario" ,comprasLogin.login);
        this.router.post("/token",comprasLogin.token);
        this.router.post("/reject",comprasLogin.rejectToken);
      }
}
export default new routerLogin().router