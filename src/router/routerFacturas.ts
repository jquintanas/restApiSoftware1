import { Router } from "express";
import facturasController from "../controller/controllerFacturas";
import { Seguridad } from "./../utils/seguridad";

/*
    FechaCreacion: 11/04/2020
    Usuario: FranManGing
    Comentario: Clase router de facturas.
 */

/**
 * @classdesc Clase router de facturas.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerFacturas} router
 * @author Francesca Man Ging<fman@espol.edu.ec>
 */

class routerFacturas {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[get | post]
        this.router.post("/post", Seguridad.verificarToken, facturasController.postData);
        this.router.get("/:id",Seguridad.verificarToken, facturasController.findByID);
        this.router.get("/:id",Seguridad.verificarToken, facturasController.getData);
      }
}
export default new routerFacturas().router