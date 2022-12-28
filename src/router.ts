import { Router } from "express";
import { body } from "express-validator";
import { createProduct, deleteProduct, getOneProduct, getProducts } from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update";

import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put("/product/:id",
    body("name").isString(),
    handleInputErrors,
    createProduct);
router.post("/product",
    body("name").isString(),
    handleInputErrors,
    createProduct);
router.delete("/product/:id", deleteProduct);

/**
 *  Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put("/update/:id",
    body("title").isString().optional(),
    body("body").isString().optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").isString().optional(),
    body("asset").isString().optional(),
    handleInputErrors,
    updateUpdate);
router.post("/update",
    body("title").isString(),
    body("body").isString(),
    body("productId").isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").isString().optional(),
    body("asset").isString().optional(),
    handleInputErrors,
    createUpdate);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */
router.get("/updatepoint", (req, res) => { });
router.get("/updatepoint/:id", (req, res) => { });
router.put("/updatepoint/:id",
    body("name").isString().optional(),
    body("description").isString().optional(),
    handleInputErrors,
    (req, res) => { });
router.post("/updatepoint",
    body("name").isString(),
    body("description").isString(),
    body("updateId").isString(),
    handleInputErrors, (req, res) => { });
router.delete("/updatepoint/:id", (req, res) => { });


export default router;