import { Request, Response } from "express";
import { pedidosInterface } from "./../interfaces/pedidosInterface";
import globales from "./../utils/globales";
import { Seguridad } from "./../utils/seguridad";
/** 
 * @const {Pedidos} 
 * @desc Import del modelo pedidos de la base de datos.
 */
const pedidos = require('./../../models').Pedidos;
/** 
 * @const {Compras} 
 * @desc Import del modelo compras de la base de datos.
 */
const compras = require('./../../models').compras;

/**
 * @classdesc Clase controladora de pedidos.
 * @desc FechaCreacion: 01/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {pedidosController} pedidosController
 * @author Danny Rios <dprios@espol.edu.ec>
 */
class pedidosController {

    /*
    FechaCreación: 01/04/2020
    Usuario: drios96
    Comentario: Este método se encarga de buscar los pedidos
    */

    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar los pedidos <br> FechaCreacion: 01/04/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async getData(req: Request, res: Response): Promise<void> {
        let token = true;
        if (!token) {
            res.status(401).json({ log: "Token invalido." });
            return;
        }
        pedidos.findAll(
            {
                attributes: ['idpedido', 'idcompra', 'idproducto', 'cantidad','subtotal','cubiertos'],
                include: [
                    {
                        model: compras,
                        required: true,
                        attributes: ['idcompra', 'fechacompra', 'entregaDomocilio','horaEntrega']
                    }
                ]
            }
        ).then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base" });
            console.log(err);
            return;
        });

    }
    /*
    FechaCreación: 01/04/2020
    Usuario: drios96
    Comentario: Este método se encarga de agregar un nuevo pedido .
    */

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Danny Rios <dprios@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de agregar un nuevo pedido <br> FechaCreacion: 01/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
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
        let {hash} = req.body;
        let pedido :pedidosInterface = {
            idpedido: req.body.idpedido,
            idcompra: req.body.idcompra,
            idproducto: req.body.idproducto,
            cantidad: req.body.cantidad,
            subtotal: req.body.subtotal,
            cubiertos: req.body.cubiertos          
        }
        
        let hashInterno = Seguridad.hashJSON(pedido);
        //let hashDesencriptado = Seguridad.desencriptar(hashInterno);
        pedido.createdAt = new Date();
        if(hashInterno != hash){
            res.status(401).json({log: "Violación de integridad de datos, hash invalido.",hash,hashInterno});
            return;
        }
        pedido.createdAt = new Date();
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
    FechaCreación: 01/04/2020
    Usuario: drios96
    Comentario: Este método se encarga de eliminar un pedido buscandolo en base al id proporcionado
    por la url.
    */

   /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Danny Rios <dprios@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de eliminar un pedido buscandolo en base al id proporcionado
    por la url. <br> FechaCreacion: 01/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
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
    FechaCreación: 01/04/2020
    Usuario: drios96
    Comentario: Este método se encarga de buscar el pago en base al ID proporcionaro en la url.
    */

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Danny Rios <dprios@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de buscar el pago en base al ID proporcionaro en la url
   * . <br> FechaCreacion: 01/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
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
                },
                attributes: ['idpedido', 'idcompra', 'idproducto', 'cantidad','subtotal','cubiertos'],
                    include: [
                        {
                            model: compras,
                            required: true,
                            attributes: ['idcompra', 'fechacompra', 'entregaDomocilio','horaEntrega']
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
            res.status(500).json(err);
            return;
        }
        );
    }
}
export default new pedidosController();
