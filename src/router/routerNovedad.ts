import { Router } from "express";
import novedadController from "./../controller/controllerNovedad";
import { Seguridad } from "./../utils/seguridad";

/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase router de pnovedadago.
 */

  /**
 * @classdesc Clase router de novedad.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerPagos} router
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class routerNovedad {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.[get | post | put | delete]
        this.router.get("/:id",Seguridad.verificarToken, novedadController.findById);
        this.router.get("/reportado/:reportado",Seguridad.verificarToken, novedadController.findByReportado);
        this.router.get("/reporta/:reporta",Seguridad.verificarToken, novedadController.findByReporta);
        this.router.get("/",Seguridad.verificarToken, novedadController.findAll);
        this.router.post("/",Seguridad.verificarToken, novedadController.addNovedad);
        this.router.put("/:id/:reporta/:reportado",Seguridad.verificarToken,novedadController.updateNovedad);
        
    }
}

export default new routerNovedad().router
