import { Router } from "express";
import comprasController from "../controller/controllerCompras";
import { Security } from "../utils/security";

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
        this.router.post("/post", Security.checkToken, comprasController.postData);
        this.router.get("/cuser", Security.checkToken, comprasController.getComprasUser);
        this.router.get("/getCompras", Security.checkToken, comprasController.getCompras);
        this.router.get("/:id", Security.checkToken, comprasController.findByID);
        this.router.delete("/:id", Security.checkToken, comprasController.deleteData);
      }
}
export default new routerCompras().router