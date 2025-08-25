// import express from "express";
// import homeController from "../controller/homeController";

// const router = express.Router();

// const initWebRoutes = (app) => {
//   //Default
//   router.get("/", (req, res) => {
//     return res.send("Nguyen Huu Ngoc Lam");
//   });
//   // Define routes
//   router.get("/home", homeController.getHomePage);
//   router.get("/about", homeController.getAboutPage);
//   router.get("/crud", homeController.getCRUD);
//   router.post("/post-crud", homeController.postCRUD);
//   router.get("/get-crud", homeController.getFindAllCrud);
//   router.get("/edit-crud", homeController.getEditCRUD);
//   router.post("/put-crud", homeController.putCRUD);
//   router.get("/delete-crud", homeController.deleteCRUD);

//   // Use the router in the app
//   app.use("/", router);
// };

// export default initWebRoutes;

import express, { Application } from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app: Application) => {
  router.get("/", (req, res) => {
    return res.send("Nguyen Huu Ngoc Lam");
  });

  router.get("/home", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.getFindAllCrud);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  app.use("/", router);
};

export default initWebRoutes;
