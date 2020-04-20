import { Router } from "express";
import comprasController from "../controller/controllerCompras";

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
        this.router.post("/post", comprasController.postData);
        this.router.get("/:id", comprasController.findByID);
        this.router.get("/get", comprasController.getData);
        this.router.delete("/:id", comprasController.deleteData);
      }
}
export default new routerCompras().router