const express = require("express");
import logger from "../log/logger";
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  // console.log('Time:', Date.now())
  logger.info(`Time: ${Date.now()}`);
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next router
    if (req.params.id === "3") next("route");
    // otherwise pass control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // render a regular page
    res.render("regular", { body: "hhhhhh" });
  }
);


// // handler for the /user/:id path, which renders a special page
router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  res.render("special", { title: "special" });
});

export default router;
