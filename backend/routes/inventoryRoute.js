let express = require("express");
const Inventory = require("../modals/Inventory");
let router = express.Router();

//add products
router.post("/", async (req, res) => {
  let data = req.body;
  let ar = [];
  try {
    const allProducts = await Promise.all(
      await data.map(async (item) => {
        let quantity = parseInt(item.quantity);

        if (!ar.includes(item.productCode)) {
          ar.push(item.productCode);
          const product = await Inventory.findOne({
            productCode: item.productCode,
          });
          if (product) {
            return await product.updateOne({ $inc: { quantity: quantity } });
          } else {
            let newProduct = await new Inventory(item);
            return await newProduct.save();
          }
        } else {
          async function doStuff() {
            let res = await Inventory.findOneAndUpdate(
              { productCode: item.productCode },
              { $inc: { quantity: quantity } }
            );
            if (res === null) {
              doStuff();
            } else {
              return res;
            }
          }
          let res = doStuff();
          return res;
        }
      })
    );
    allProducts && res.status(200).json(allProducts);
  } catch (error) {}
});

//remove products or decrement product quantity
router.put("/", async (req, res) => {
  console.log(req.body);
  let data = req.body;
  Promise.all(
    data.map(async (item) => {
      let quantity = parseInt(item.quantity);
      const product = await Inventory.findOne({
        productCode: item.productCode,
      });
      if (product) {
        if (quantity > product.quantity) {
          return await product.updateOne({ $set: { quantity: 0 } });
        } else {
          return await product.updateOne({ $inc: { quantity: -quantity } });
        }
      }
    })
  ).then(async (data) => {
    await Inventory.updateMany(
      { quantity: { $lt: 0 } },
      { $set: { quantity: 0 } }
    );
    res.status(200).json("remove success");
  });
});

//get all products
router.get("/", async (req, res) => {
  try {
    const products = await Inventory.find().sort({ productCode: 1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
