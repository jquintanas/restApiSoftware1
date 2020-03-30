import {Router} from "express";
import defaultController from "../controller/controllerDefault";
class routerDefault {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    //this.router.[get | post | put | delete]
    this.router.get("/",defaultController.index);
    this.router.post("/", defaultController.json);
    this.router.get("/getData", defaultController.getData);
    this.router.post("/postData",defaultController.postData);
    this.router.delete("/deleteData/:id", defaultController.deleteData);
    this.router.put("/updateData/:id", defaultController.updateData);
  }
}
const appRoutes = new routerDefault();
export default appRoutes.router;