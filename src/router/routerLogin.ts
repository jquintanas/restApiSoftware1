import { Router } from "express";
import comprasLogin from "../controller/controllerLogin";

  /**
 * @classdesc Login router class.
 * @desc Creation Date: 04/19/2020
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
        this.router.post("/token",comprasLogin.generateToken);
        this.router.post("/reject",comprasLogin.rejectToken);
      }
}
export default new routerLogin().router