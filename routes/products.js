const express = require("express");
const router = express.Router();
const con = require("../db/northwind");

router.get("/", (req, res) => {
  con.query(
    `SELECT p.product_id,
            p.product_name,
            p.unit_price,
            p.units_in_stock,
            p.units_on_order 
      FROM products as p;`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ err: message });
      }

      res.render("products", { dados: result.rows });
    }
  );
});

router.delete("/:product_id", (req, res) => {
  const { product_id } = req.params;

  con.query(
    `
    DELETE FROM order_details
    WHERE product_id = $1`,
    [product_id],
    (err) => {
      if (err) {
        return res.status(500).json({ err: message });
      }

      con.query(
        `
    DELETE FROM products
    WHERE product_id = $1`,
        [product_id],
        (err) => {
          if (err) {
            return res.status(500).json({ err: message });
          }

          return res.status(200).json({
            message: "Produto apagado com sucesso!",
          });
        }
      );
    }
  );
});

router.post("/", (req, res) => {
  const {
    product_id,
    product_name,
    unit_price,
    units_in_stock,
    units_on_order,
    discontinued,
  } = req.body;

  const query = `
    INSERT INTO PRODUCTS (product_id, product_name, unit_price, units_in_stock, units_on_order, discontinued)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

  const values = [
    product_id,
    product_name,
    unit_price,
    units_in_stock,
    units_on_order,
    discontinued,
  ];

  con.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao inserir produto");
    }

    return res.status(201).json({
      message: "Produto criado com sucesso",
      data: result.rows[0],
    });
  });
});

module.exports = router;
