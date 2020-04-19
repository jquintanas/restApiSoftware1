import { Router } from "express";
import pagosController from "../controller/controllerPago";

/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase router de pago.
 */

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
        this.router.get("/:id",pagosController.findByID);
        this.router.post("/", pagosController.addPago);
        this.router.delete("/:id", pagosController.deletePago);
      }
}
export default new routerPagos().router