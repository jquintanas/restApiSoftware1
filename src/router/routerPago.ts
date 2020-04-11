import { Router } from "express";
import pagosController from "../controller/controllerPago";

/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase router de pago.
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