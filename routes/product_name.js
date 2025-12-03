const express = require("express");
const router = express.Router();
const con = require("../db/northwind");

router.get("/:product_name", (req, res) => {
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

module.exports = router;
