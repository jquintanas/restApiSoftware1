import { Request, Response } from "express";
const pedidos = require('./../../models').Pedidos;
import { pedidosInterface } from "./../interfaces/pedidosInterface";
import globales from "./../utils/globales";
/*
    FechaCreacion: 12/04/2020
    Usuario: Drios96
    Comentario: Clase controladora de pedidos.
 */
class pedidosController {
    /*
    FechaCreacion: 12/04/2020
    Usuario: Drios96
    Comentario: Este método se encarga de buscar los pedidos
    */
    public async getData(req: Request, res: Response): Promise<void> {
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        pedidos.findAll().then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base" });
            console.log(err);
            return;
        });

    }
    /*
    FechaCreacion: 12/04/2020
    Usuario: Drios
    Comentario: Este método se encarga de agregar un nuevo pedido
    */
    public async postData(req: Request, res: Response): Promise<void> {
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
        let pedido = {
            idpedido: req.body.idpedido,
            idcompra: req.body.idcompra,
            idproducto: req.body.idproducto,
            cantidad: req.body.cantidad,
            subtotal: req.body.subtotal,
            cubiertos: req.body.cubiertos,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        pedidos.create(pedido).then((resp: any) => {
            if (resp._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Pedido ingresado con éxito",
                        uri: globales.globales.urlBasePedidos + resp.dataValues.idpedido
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
    FechaCreacion: 12/04/2020
    Usuario: Drios96
    Comentario: Este método se encarga de eliminar un pedido buscandolo en base al id proporcionado
    por la url.
    */
    public async deleteData(req: Request, res: Response): Promise<void> {
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
        pedidos.destroy({ where: { idpedido: id } }).then((data: any) => {
            if (data == 1) {
                res.status(200).json({ log: "Pedido eliminado correctamente" });
                return;
            }
            else {
                res.status(200).json({ log: "No existe el pedido que desea eliminar." });
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error!!" });
            console.log(err);
            return;
        });
    }
    /*
    FechaCreacion: 12/04/2020
    Usuario: Drios96
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
        pedidos.findOne(
            {
                where: {
                    idpedido: id
                }
            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json(err);
            return;
        }
        );
    }
}
export default new pedidosController();
