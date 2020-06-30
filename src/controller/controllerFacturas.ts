import { Request, Response } from "express";
import { facturasInterface } from "./../interfaces/facturasInterface";
import globales from "./../utils/globales";
import { Security } from "./../utils/seguridad";

/** 
 * @const facturas
 * @desc Import del modelo facturas de la base de datos.
 */

const facturas = require('./../../models').Facturas;

/** 
 * @const pedidos
 * @desc Import del modelo pedidos de la base de datos.
 */

const pedidos = require('./../../models').Pedidos;

/** 
 * @const pagos
 * @desc Import del modelo compras de la base de datos.
 */

const compras = require('./../../models').compras;

/** 
 * @const pagos
 * @desc Import del modelo compras de la base de datos.
 */

const pagos = require('./../../models').Pagos;
/** 
 * @const formaPagos
 * @desc Import del modelo compras de la base de datos.
 */

const formasPagos = require('./../../models').formasPagos;


     /**
         * @classdesc Clase controladora de facturas.
         * @desc Fecha Creación: 12/04/2020
         * @class
         * @public
         * @version 1.0.0
         * @returns {facturasController}  facturasController
         * @author Francesca Man Ging <fman@espol.edu.ec>
         */

class facturasController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar las facturas de acuerdo al usuario <br> FechaCreacion: 25/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async getFacturasUser(req: Request, res: Response): Promise<void> {     
        let dataId = res.locals; 
        let id : number = dataId.post;
        console.log(id)
        
        facturas.findAll(
            {
                
                attributes: ['idfactura', 'idpedido', 'idpago'],
                include: [
                    {
                        model: pedidos,
                        required: true,
                        attributes: ['idpedido'],
                        include:[
                            {
                                model: compras,
                                required: true,
                                attributes: ['idcompra','fechacompra','entregaDomocilio','horaEntrega'],
                                where:{
                                    idusuario:id
                                }
                            }
                        ]
                        
                    },                   
                    {
                        model: pagos,
                        required: true,
                        attributes: ['idPago'],
                        include: [
                            {
                                model: formasPagos,
                                required: true,
                                attributes: ['id', 'nombre', 'descripcion']
                            }
                        ]

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
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar las facturas <br> FechaCreacion: 25/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async getFacturas(req: Request, res: Response): Promise<void> {     

        facturas.findAll(
            {
                
                attributes: ['idfactura', 'idpedido', 'idpago'],
                include: [
                    {
                        model: pedidos,
                        required: true,
                        attributes: ['idpedido'],
                        include:[
                            {
                                model: compras,
                                required: true,
                                attributes: ['idcompra','fechacompra','entregaDomocilio','horaEntrega'],
                                
                            }
                        ]
                        
                    },                   
                    {
                        model: pagos,
                        required: true,
                        attributes: ['idPago'],
                        include: [
                            {
                                model: formasPagos,
                                required: true,
                                attributes: ['id', 'nombre', 'descripcion']
                            }
                        ]

                    }
                ]
            }
        ).then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base",err:err });
            console.log(err);
            return;
        });

    }
        /**
         * @async
         * @method
         * @public
         * @version 1.0.0
         * @author Francesca Man Ging <fman@espol.edu.ec>
         * @returns {JSON} JSON con los datos obtenidos de la consulta.
         * @desc Este método se encarga de buscar la factura en base al ID proporcionado en la url. <br> Fecha Creación: 12/04/2020
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

                facturas.findOne({
                    where: {
                        idfactura: id
                    },
                        attributes: ['idfactura', 'idpedido', 'idpago'],
                    })
                    .then((data: any) => {
                        if (data == null) {
                            res
                            .status(404)
                            .json({ log: "No Existen datos a mostrar para el ID." })
                            return;
                        }
                    res.status(200).json(data);
                    return;
                    }, 
                    (err: any) => {
                    res.status(500).json(err);
                    return;
                    }
                    );
            }

        /**
         * @async
         * @method
         * @public
         * @version 1.0.0
         * @author Francesca Man Ging <fman@espol.edu.ec>
         * @returns {JSON} JSON con los datos obtenidos de la consulta.
         * @desc  Este método se encarga de agregar una nueva facturas posterior a verificar los datos
    y su integridad. <br> Fecha Creación: 12/04/2020
         * @param {Request} req Objeto Request
         * @param {Response} res Objeto response
         * @type {Promise<void>} Promesa de tipo void.
         */

            public async postData(req: Request, res: Response): Promise<void> {
                let {hash} = req.body;
                let factura: facturasInterface = {
                    idfactura: req.body.idfactura,
                    idpedido: req.body.idpedido,
                    idpago: req.body.idpago,
                };

                let hashInterno = Security.hashJSON(factura);
                if(hashInterno != hash){
                    res.status(401).json({log: "Violación de integridad de datos, hash invalido.",hash,hashInterno});
                    return;
                }

                facturas.create(factura).then((rs: any) => {
                        if (rs._options.isNewRecord) {
                        res.status(202).json(
                            {
                                log: "Factura ingresado con éxito",
                                uri: globales.globals.urlBaseFacturas + rs.dataValues.idfactura                    
                            }
                        );
                        return;
                        
                    }res.status(200).json(rs);
                    return;
                    }, 
                    (err: any) => {
                        res.status(500).json({ log: "Error, no se pudo crear la factura" });
                        console.log(err);
                        return;
                    }
                );
            }

      
}

export default new facturasController();