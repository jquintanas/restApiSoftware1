export default {
    globals: {
        /**
         * @const urlBasePagos
         * @desc URL del api de pagos.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        urlBasePagos: "http://localhost:3000/api/pagos/",
        /**
         * @const urlBaseUsuario
         * @desc URL del api de usuarios.
         * @author Karla Burgos <kbburgos@espol.edu.ec>
         * @version 1.0.0
         */
        urlBaseUsuario: "http://localhost:3000/api/usuarios/",
        /**
         * @const urlBaseNovedad
         * @desc URL del api de novedades.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        urlBaseNovedad: "http://localhost:3000/api/novedades/",
        /**
         * @const urlBasePedidos
         * @desc URL del api de pedidos.
         * @author Danny Ríos <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        urlBasePedidos: "http://localhost:3000/api/pedidos/",
        /**
         * @const idRolGeneral
         * @desc Rol de usuario general.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        idRolGeneral: 3,
        /**
         * @const secretToken
         * @desc Clave secreta para tokens.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        secretToken: "7187ba3735b821b9ae7bd7d5dd98b61a07ec2e9cef2aad92b97a4ed6080290e6",
        /**
         * @const refreshToken
         * @desc Clave secreta para refrescar el token.
         * @author Danny Ríos <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        refreshToken:"530157b48c7fd777f6c02a158b7bafca274efeb638da854c0d460e6e250b8713",
        /**
         * @const urlBaseNovedad
         * @desc Clave secreta para encriptar y desencriptar.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        secretEncryp: "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a",
        /**
         * @const urlBaseFacturas
         * @desc URL del api de facturas.
         * @author Francesca Man Ging <fman@espol.edu.ec>
         * @version 1.0.0
         */
        urlBaseFacturas: "http://localhost:3000/api/facturas/",
        /**
         * @const urlBaseCompras
         * @desc URL del api de compras.
         * @author Francesca Man Ging <fman@espol.edu.ec>
         * @version 1.0.0
         */
        urlBaseCompras: "http://localhost:3000/api/compras/",
        /**
         * @const listRefreshTokens
         * @desc Lista de los tokens para refresh.
         * @author Danny Rios <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        listRefreshTokens: {},
        /**
         * @const tiempoToken
         * @desc Tiempo de vida del token.
         * @author Danny Rios <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        tiempoToken: 900,
        /**
         * @const tiempoRefreshToken
         * @desc Tiempo de vida del refresh token
         * @author Danny Rios <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        tiempoRefreshToken: 86400,
        
    }
};