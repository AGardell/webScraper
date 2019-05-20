const Request = require("../models").laptop;
const Sequelize = require("../models").Sequelize;
const Op = Sequelize.Op;

module.exports.saveToDB = function(laptops) {
  laptops.forEach(async laptop => {
    try {
      if (laptop.price == "") {
        laptop.price = "see in cart.";
      }
      
      let matches = await Request.findAll(
        {
          where: {
            sku: {
              [Op.eq]: laptop.sku
            }
          }
        },
        {
          raw: true
        }
      );

      if (matches == 0) {
        await Request.create({
          sku: laptop.sku,
          description: laptop.description,
          price: laptop.price,
          stock: laptop.stock
        });
      }
    } catch (err) {
      console.log(laptop);
    }
  });
  console.log("Laptops added to DB.");
};
