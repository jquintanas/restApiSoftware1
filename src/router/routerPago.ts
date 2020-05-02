import { Router } from "express";
import pagosController from "../controller/controllerPago";
import { Seguridad } from "./../utils/seguridad";

 /**
 * @classdesc Clase router de pago.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerPagos} router
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class routerPagos {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[get | post | put | delete]
        this.router.get("/:id",Seguridad.verificarToken,pagosController.findByID);
        this.router.post("/", Seguridad.verificarToken,pagosController.addPago);
        this.router.delete("/:id", Seguridad.verificarToken,pagosController.deletePago);
      }
}
export default new routerPagos().router