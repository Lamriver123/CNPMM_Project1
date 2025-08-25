// const express = require("express"); // cú pháp CommonJS

// let configViewEngine = (app) => {
//   app.use(express.static("./src/public")); // Thiết lập thư mục tĩnh (images, css,..)
//   app.set("view engine", "ejs"); // Thiết lập viewEngine
//   app.set("views", "./src/views"); // Thư mục chứa views
// };

// module.exports = configViewEngine; // xuất hàm ra

import { Application } from "express";
import express from "express";
import path from "path";

const configViewEngine = (app: Application): void => {
  // Thiết lập thư mục tĩnh (images, css,..)
  app.use(express.static(path.join(__dirname, "../public")));

  // Thiết lập viewEngine
  app.set("view engine", "ejs");

  // Thư mục chứa views
  app.set("views", path.join(__dirname, "../views"));
};

export default configViewEngine;
