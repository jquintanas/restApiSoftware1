import { Router } from "express";
import facturasController from "../controller/controllerFacturas";
import { Security } from "../utils/security";

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
        this.router.post("/post", Security.checkToken, facturasController.postData);
        this.router.get("/fuser",Security.checkToken, facturasController.getFacturasUser);
        this.router.get("/getFacturas",Security.checkToken, facturasController.getFacturas);
        this.router.get("/:id",Security.checkToken, facturasController.findByID);
        
      }
}
export default new routerFacturas().router