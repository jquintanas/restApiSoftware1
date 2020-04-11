import { Router } from 'express';
import usuarioController from "../controller/controllerUsuario";
class routerUsuarios {
    public router: Router = Router();
  
    constructor() {
      this.config();
    }
    config():void {
      //this.router.[get | post | put | delete]
      this.router.get("/get", usuarioController.getData);
      this.router.post("/post", usuarioController.postData);
      this.router.get("/:id",usuarioController.findByID);
      this.router.delete("/:id",usuarioController.deleteData);
      this.router.put("/:id",usuarioController.updateData);
    }
  }
  const appRoutes = new routerUsuarios();
  export default appRoutes.router;
