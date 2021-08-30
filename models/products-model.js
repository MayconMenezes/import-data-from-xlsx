const { v4: uuidv4 } = require('uuid');

class ProductsModel {
  //(id,sales_id,product_id,quantity,value,discount) 
  constructor(store_id, products) {
    this.id = uuidv4();
    this.sale_id = '';
    this.product_id = '';
    this.quantity = 0;
    this.value = 130;
    this.discount = 0;
  }


}

module.exports = ProductsModel;