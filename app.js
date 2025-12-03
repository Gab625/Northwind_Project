const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const con = require("./db/northwind");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRoutes = require("./routes/products");
const sellsRoutes = require("./routes/sells");
const productIdRoutes = require("./routes/product_id");
const productNameRoutes = require("./routes/product_name");

app.use("/products", productsRoutes);
app.use("/sells", sellsRoutes);
app.use("/product/id/", productIdRoutes);
app.use("/product/name/", productNameRoutes);

app.listen(port, () => {
  console.log(`Rodando na porta ${port}!`);
});
