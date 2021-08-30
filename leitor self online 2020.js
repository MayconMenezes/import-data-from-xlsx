const xlsxReader = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
const dateFns = require('date-fns');
const SalesModel = require('./models/sales-model');
const ProductsModel = require('./models/products-model');
const SqlGenerator = require('./sql-generator');

const months = new Map([
  ['JANUARY', '01'],
  ['FEBRUARY', '02'],
  ['MARCH', '03'],
  ['APRIL', '04'],
  ['MAY', '05'],
  ['JUNE', '06'],
  ['JULY', '07'],
  ['AUGUST', '08'],
  ['SEPTEMBER', '09'],
  ['OCTOBER', '10'],
  ['NOVEMBER', '11'],
  ['DECEMBER', '12'],
]);

class Leitor {
  async getData() {
    const filePath = path.resolve(__dirname, 'sales_2020.xlsx');
    const sheet = await xlsxReader(filePath, { sheet: 7 });
    const sales = [];
    const weeks = [];
    for(let i =  1; i <= 52; i += 1){
      const sale = new SalesModel();

      if(Number(sheet[i][2]) > 0){
        const item = new ProductsModel();
        item.sale_id = sale.id;
        item.product_id = '72b7e1bd-a687-4a8c-ae5c-e470276fc397';
        item.quantity = Number(sheet[i][2]);
        sale.items.push(item);
      }

      if(Number(sheet[i][3]) > 0){
        const item = new ProductsModel();
        item.sale_id = sale.id;
        item.product_id = '8d543e67-d0d8-4022-9bc7-9fe51fab79b7';
        item.quantity = Number(sheet[i][3]);
        sale.items.push(item);
      }

      if(Number(sheet[i][4]) > 0){
        const item = new ProductsModel();
        item.sale_id = sale.id;
        item.product_id = '0b865464-1f06-4a6c-b367-6c996daf14a1';
        item.quantity = Number(sheet[i][4]);
        sale.items.push(item);
      }

      if(Number(sheet[i][5]) > 0){
        const item = new ProductsModel();
        item.sale_id = sale.id;
        item.product_id = 'fce51924-f9aa-4f75-8a4b-3d3aa2c8dc3c';
        item.quantity = Number(sheet[i][5]);
        sale.items.push(item);
      }

      if(Number(sheet[i][6]) > 0){
        const item = new ProductsModel();
        item.sale_id = sale.id;
        item.product_id = '967e707f-b61f-4dab-839a-abb94ab5e9fc';
        item.quantity = Number(sheet[i][6]);
        sale.items.push(item);
      }
      const totalItems = Number(sheet[i][6]);
      console.log('Linha&Items: ', i, totalItems);
      if(totalItems > 0) {
        const saleDay = new Date(`2020-${months.get(sheet[i][13].toUpperCase())}-01 12:00 PM`);
        sale.store_id = '87c5c5fb-b43c-4524-8cb8-2b1f981634a5'; 
        sale.sale_date = saleDay;
        sale.delivery_date = saleDay;
        sale.total = sale.items.reduce((accumulator, item) => accumulator + (item.value * item.quantity), 0);

        sales.push(sale);
      }
    }

    const sqlFilePath = path.resolve(__dirname, 'self online sql_sales_2020.txt');
    const sql = SqlGenerator.generateForAllSales(sales);
    await fs.promises.writeFile(sqlFilePath, sql,  { encoding:'utf8', flag: 'w'});
  } 
} 

module.exports = new Leitor();