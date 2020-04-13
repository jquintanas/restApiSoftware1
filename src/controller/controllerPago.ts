import { Request, Response } from "express";
const pagos = require('./../../models').Pagos;
const formasPagos = require('./../../models').formasPagos;
import { pagosInterface } from "./../interfaces/pagosInterface";
import globales from "./../utils/globales";
import { Seguridad } from "./../utils/seguridad";
/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase controladora de pagos.
 */
class pagosController {

    /*
    FechaCreacion: 06/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar el pago en base al ID proporcionaro en la url
    */
    public async findByID(req: Request, res: Response): Promise<void> {
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
        pagos.findOne(
            {
                where: {
                    idpago: id
                },
                attributes: ['idPago', 'idformaPago', 'total', 'imagen'],
                include: [
                    {
                        model: formasPagos,
                        required: true,
                        attributes: ['id', 'nombre', 'descripcion']
                    }
                ]
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
            res.status(500).json({log: "Error"});
            return;
        }
        );
    }

    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de agregar los datos del pago realizado por el usuario, se debe validar la integridad
    de los mismos, cuando se ingresa exitosamente los datos se retorna el mensaje pertinente y la uri del recurso.
    */
    public async addPago(req: Request, res: Response): Promise<void> {
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
        let {hash} = req.body;
        let data: pagosInterface = {
            idformaPago: req.body.idformaPago,
            imagen: req.body.imagen,
            total: req.body.total
        }
        let hashInterno = Seguridad.hashJSON(data);
        //aqui se debe desencriptar el hash
        data.createdAt = new Date();
        if(hashInterno != hash){
            res.status(401).json({log: "Violación de integridad de datos, hash invalido."});
            return;
        }
        pagos.create(data).then((resp: any) => {
            if (resp._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Ingresado",
                        uri: globales.globales.urlBasePagos + resp.dataValues.idPago
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
        });
    }



    /*
   FechaCreacion: 11/04/2020
   Usuario: JQuintana
   Comentario: Este método se encarga de eliminar una forma de pago en base al ID que se proporciona por la url.
   */
    public async deletePago(req: Request, res: Response): Promise<void> {
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
        pagos.destroy({ where: { idPago: id } }).then((data: any) => {
            if (data == 1) {
                res.status(200).json({ log: "Eliminado" });
                return;
            }
            else {
                res.status(200).json({ log: "Sin datos a eliminar." });
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            console.log(err);
            return;
        })

    }



}

export default new pagosController();