const express = require("express");
const router = express.Router();
const con = require("../db/northwind");

router.get("/", (req, res) => {
  con.query(
    `SELECT p.product_name ,
            SUM(od.unit_price  * od.quantity ) as TotalVendido
      FROM order_details as od
      JOIN products p ON od.product_id = p.product_id
      GROUP BY p.product_id , p.product_name 
      ORDER BY TotalVendido DESC;`,
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }

      res.render("sells", { dados: result.rows });
    }
  );
});

module.exports = router;
