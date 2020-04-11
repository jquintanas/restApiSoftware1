import { Router } from "express";
import novedadController from "./../controller/controllerNovedad";

/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase router de pago.
 */
class routerNovedad {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.[get | post | put | delete]
        this.router.get("/:id", novedadController.findById);
        this.router.get("/reportado/:reportado", novedadController.findByReportado);
        this.router.get("/reporta/:reporta", novedadController.findByReporta);
        this.router.get("/", novedadController.findAll);
        this.router.post("/", novedadController.addNovedad);
        this.router.put("/:id/:reporta/:reportado",novedadController.updateNovedad);
        
    }
}

export default new routerNovedad().router
