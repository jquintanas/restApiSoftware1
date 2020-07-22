"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @classdesc Index class
 * @desc Creation Data: 11/04/2020
 * @author Danny Ríos <dprios@espol.edu.ec>
 */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require('helmet');
const expectCt = require('expect-ct');
const cors_1 = __importDefault(require("cors"));
const routerOrders_1 = __importDefault(require("./router/routerOrders"));
const routerPayment_1 = __importDefault(require("./router/routerPayment"));
const routerNovelty_1 = __importDefault(require("./router/routerNovelty"));
const routerUser_1 = __importDefault(require("./router/routerUser"));
const routerPurchase_1 = __importDefault(require("./router/routerPurchase"));
const routerLogin_1 = __importDefault(require("./router/routerLogin"));
const routerInvoice_1 = __importDefault(require("./router/routerInvoice"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.router();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(cors_1.default());
        this.app.use(express_1.default.static(path.join(__dirname, '/public')));
        this.app.use(morgan_1.default("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
        this.app.use(helmet.permittedCrossDomainPolicies());
        this.app.use(helmet.noSniff());
        this.app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));
        this.app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
        this.app.use(expectCt({
            enforce: true,
            maxAge: 30
        }));
    }
    router() {
        this.app.use("/api/orders", routerOrders_1.default);
        this.app.use("/api/payments", routerPayment_1.default);
        this.app.use("/api/noveltys", routerNovelty_1.default);
        this.app.use("/api/usersS", routerUser_1.default);
        this.app.use("/api/purchase", routerPurchase_1.default);
        this.app.use("/api/login", routerLogin_1.default);
        this.app.use("/api/invoice", routerInvoice_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port: ", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
