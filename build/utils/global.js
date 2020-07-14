"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    globals: {
        /**
         * @const urlPaymentBase
         * @desc Payment API URL.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        urlPaymentBase: "http://localhost:3000/api/payments/",
        /**
         * @const urlUserBase
         * @desc User API URL.
         * @author Karla Burgos <kbburgos@espol.edu.ec>
         * @version 1.0.0
         */
        urlUserBase: "http://localhost:3000/api/usersS/",
        /**
         * @const urlNoveltyBase
         * @desc Novelty API URL.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        urlNoveltyBase: "http://localhost:3000/api/noveltys/",
        /**
         * @const urlBaseOrders
         * @desc Orders API URL.
         * @author Danny Ríos <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        urlBasePedidos: "http://localhost:3000/api/orders/",
        /**
         * @const idGeneralRole
         * @desc General User Role.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        idGeneralRole: 3,
        /**
         * @const secretToken
         * @desc Secret token key.
         * @author Jonathan Quintana <jiquinta@espol.edu.ec>
         * @version 1.0.0
         */
        secretToken: "7187ba3735b821b9ae7bd7d5dd98b61a07ec2e9cef2aad92b97a4ed6080290e6",
        /**
         * @const refreshToken
         * @desc Secret refresh token.
         * @author Danny Ríos <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        refreshToken: "530157b48c7fd777f6c02a158b7bafca274efeb638da854c0d460e6e250b8713",
        /**
             * @const secretEncryp
             * @desc Secret key to encrypt and decrypt.
             * @author Jonathan Quintana <jiquinta@espol.edu.ec>
             * @version 1.0.0
             */
        secretEncryp: "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a",
        /**
         * @const urlBaseInvoice
         * @desc   Invoice API URL.
         * @author Francesca Man Ging <fman@espol.edu.ec>
         * @version 1.0.0
         */
        urlBaseFacturas: "http://localhost:3000/api/invoice/",
        /**
         * @const urlBasePurchases
         * @desc  Purchases API URL.
         * @author Francesca Man Ging <fman@espol.edu.ec>
         * @version 1.0.0
         */
        urlBaseCompras: "http://localhost:3000/api/purchase/",
        /**
         * @const listRefreshTokens
         * @desc Token refresh list.
         * @author Danny Rios <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        listRefreshTokens: {},
        /**
         * @const lifetimeToken
         * @desc Token lifetime.
         * @author Danny Rios <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        lifetimeToken: 900,
        /**
         * @const lifetimeRefreshToken
         * @desc Refresh token lifetime
         * @author Danny Rios <dprios@espol.edu.ec>
         * @version 1.0.0
         */
        lifetimeRefreshToken: 604800,
    },
};
