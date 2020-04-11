import { Request, Response } from "express";
import globales from "./../utils/globales";
import { novedadinterface } from "./../interfaces/novedadInterface";
const novedad = require("./../../models").Novedads;

/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase controladora de novedades.
 */
class novedadController {

    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar la novedad en base al ID proporcionado en la url
    */
    public async findById(req: Request, res: Response): Promise<void> {
        let id: any = req.params.id;
        if (isNaN(id)) {
            res.status(500).json({ log: "El ID introducido no es valido." });
            return;
        }
        id = Number(id);
        if (Number.isInteger(id) == false) {
            res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        novedad.findOne(
            {
                where: {
                    idnovedad: id
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }
        );
    }

    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar la novedad en base al usuario que fue reportado proporcionado en la url
    */
    public async findByReportado(req: Request, res: Response): Promise<void> {
        let { reportado } = req.params;
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        novedad.findAll(
            {
                where: {
                    idUsuarioreportado: reportado
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data.length == 0) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }

        );
    }

    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar las novedades en base al usuario que reporta proporcionado en la url
    */
    public async findByReporta(req: Request, res: Response): Promise<void> {
        let { reporta } = req.params;
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        novedad.findAll(
            {
                where: {
                    idUsuarioreporta: reporta
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data.length == 0) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }

        );
    }

    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar todas las novedades
    */
    public async findAll(req: Request, res: Response): Promise<void> {
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        novedad.findAll(
            {
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }
        );
    }

    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de agregar la novedad proporcionada por el usuario posterior a verificar los datos
    y su integridad.
    */
    public async addNovedad(req: Request, res: Response): Promise<void> {
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        let JsonValido = true;
        if (!JsonValido) {
            res.status(401).json({ log: "Violación de integridad de datos." });
            return;
        }
        //aqui desencriptar los datos
        let data: novedadinterface = {
            descripcion: req.body.descripcion,
            idusuarioReporta: req.body.idusuarioReporta,
            idusuarioReportado: req.body.idusuarioReportado,
            createdAt: new Date()
        }
        novedad.create(data).then((resp: any) => {
            if (resp._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Ingresado",
                        uri: globales.globales.urlBaseNovedad + resp.dataValues.idnovedad
                    }
                );
                return;
            }
            res.status(200).json({ log: "No se ingresaron los datos." });
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            console.log(err);
            return;
        }
        );
    }

    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de modificar la novedad proporcionada por el usuario, solo se actualiza la descripcion.
    */
    public async updateNovedad(req: Request, res: Response): Promise<void> {
        let id: any = req.params.id;
        if (isNaN(id)) {
            res.status(500).json({ log: "El ID introducido no es valido." });
            return;
        }
        id = Number(id);
        if (Number.isInteger(id) == false) {
            res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        let { descripcion } = req.body;
        let { reportado, reporta } = req.params;
        let data: novedadinterface = {
            descripcion: descripcion,
            idusuarioReporta: reporta,
            idusuarioReportado: reportado,
            updatedAt: new Date()
        }
        novedad.update(data,
            {
                where:
                {
                    idnovedad: id
                }
            }
        ).then((rs: any) => {
            if(rs[0] == 1){
                res.status(200).json({ log: "Novedad actualizada." })
                return;
            }
            res.status(202).json({log: "No se pudo actualizar."});
            return;
        }, (err: any) => {
            console.error(err);
            res.status(500).json({ log: "Error" });
            return;

        });
    }

}

export default new novedadController();