import { Router } from "express";
import comprasController from "../controller/controllerCompras";
import { Seguridad } from "./../utils/seguridad";

/*
    FechaCreacion: 11/04/2020
    Usuario: FranManGing
    Comentario: Clase router de compras.
 */

/**
 * @classdesc Clase router de compras.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerCompras} router
 * @author Francesca Man Ging<fman@espol.edu.ec>
 */

class routerCompras {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void {
        //this.router.[post]
        this.router.post("/post", Seguridad.verificarToken, comprasController.postData);
        this.router.get("/:id", Seguridad.verificarToken, comprasController.findByID);
        this.router.get("/get", Seguridad.verificarToken, comprasController.getData);
        this.router.delete("/:id", Seguridad.verificarToken, comprasController.deleteData);
      }
}
export default new routerCompras().router