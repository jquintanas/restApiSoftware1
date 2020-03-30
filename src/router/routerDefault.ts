import {Router} from "express";
import appController from "../controller/appController";
class GamesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    //this.router.[get | post | put | delete]
    this.router.get("/",appController.index);
    this.router.post("/", appController.json);
    this.router.get("/getData", appController.getData);
    this.router.post("/postData",appController.postData);
    this.router.delete("/deleteData/:id", appController.deleteData);
    this.router.put("/updateData/:id", appController.updateData);
  }
}
const appRoutes = new GamesRoutes();
export default appRoutes.router;