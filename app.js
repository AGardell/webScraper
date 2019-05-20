let axios = require("axios").default;
const cheerio = require("cheerio");
const fs = require("fs");
const saveProducts = require("./modules/database").saveToDB;

let url =
  "https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&prt=clearance&N=4294967288+4294819270&myStore=null"; // filtering return laptops to Quad-Core only.

(async () => {
  try {
    let response = await axios.request({
      url: url,
      method: "get",
      headers: {
        Cookie: "storeSelected=071"
      }
    });

    const $ = cheerio.load(response.data);
    let productGrid = $("[role='tabpanel'] .product_wrapper");

    let scrapedProducts = [];

    productGrid.each((i, el) => {
      scrapedProducts.push({
        sku: $(el)
          .find(".sku")
          .text()
          .split(': ')
          .pop(),
        description: $(el)
          .find(".result_right .detail_wrapper .normal h2 a")
          .text(),
        price: $(el)
          .find(".price_wrapper .price-label > strong")
          .text(),
        stock: $(el)
          .find(".stock > strong")
          .text()
          .split(' ')[0]
      });
    });

    // console.log(scrapedProducts);
    await saveProducts(scrapedProducts);

    fs.writeFile("url.txt", productGrid, err => {
      if (err) {
        console.log(err);
      }

      console.log("Finished writing.");
    });

  } catch (err) {
    console.log(err);
  }
})();
