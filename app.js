const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const con = require("./northwind");

app.set("view engine", "ejs");

app.get("/sells", (req, res) => {
  con.query(
    `SELECT p.product_name ,
            SUM(od.unit_price  * od.quantity ) as TotalVendido
      FROM order_details as od
      JOIN products p ON od.product_id = p.product_id
      GROUP BY p.product_id , p.product_id 
      ORDER BY TotalVendido DESC;`,
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }

      res.render("sells", { dados: result.rows });

      con.end;
    }
  );
});

app.get("/products", (req, res) => {
  con.query(
    `SELECT * 
      FROM products as p;`,
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }

      res.render("products", { dados: result.rows });
    }
  );
});

app.get("/product/name/:product_name", (req, res) => {
  const { product_name } = req.params;

  con.query(
    `SELECT p.product_id,
            p.product_name,
            p.unit_price,
            p.units_in_stock,
            p.units_on_order 
      FROM products as p
      WHERE p.product_name = $1;`,
    [product_name],
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }

      res.render("product", { dados: result.rows });
    }
  );
});

app.get("/product/id/:product_id", (req, res) => {
  const { product_id } = req.params;

  con.query(
    `SELECT p.product_id,
            p.product_name,
            p.unit_price,
            p.units_in_stock,
            p.units_on_order 
      FROM products as p
      WHERE p.product_id = $1;`,
    [product_id],
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }

      res.render("product", { dados: result.rows });
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const { product_id } = req.params;

  con.query(
    `
    DELETE FROM products
    WHERE product_id = $1`,
    [product_id],
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }
    }
  );

  con.query(
    `
    DELETE FROM order_details
    WHERE product_id = $1`,
    [product_id],
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}!`);
});
