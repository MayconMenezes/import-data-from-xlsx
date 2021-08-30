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
    const filePath = path.resolve(__dirname, 'sales_2021.xlsx');
    const sheet = await xlsxReader(filePath, { sheet: 6 });
    const sales = [];
    const weeks = [];
    for(let i =  1; i <= 52; i += 1){
      const sale = new SalesModel();

      if(Number(sheet[i][11]) > 0) {
        const sale = new SalesModel();
        const saleDay = new Date(`2019-${months.get(sheet[i][14].toUpperCase())}-01 12:00 PM`);
        console.log('Sale Total: ', i, saleDay, Number(sheet[i][11]));
        sale.store_id = '87c5c5fb-b43c-4524-8cb8-2b1f981634a5'; 
        sale.sale_date = saleDay;
        sale.delivery_date = saleDay;
        sale.total = Number(sheet[i][11]);

        sales.push(sale);
      }

      if(Number(sheet[i][12]) > 0) {
        const sale = new SalesModel();
        const saleDay = new Date(`2018-${months.get(sheet[i][14].toUpperCase())}-01 12:00 PM`);
        console.log('Sale Total: ', i, saleDay, Number(sheet[i][12]));
        sale.store_id = '87c5c5fb-b43c-4524-8cb8-2b1f981634a5'; 
        sale.sale_date = saleDay;
        sale.delivery_date = saleDay;
        sale.total = Number(sheet[i][12]);

        sales.push(sale);
      }
    }

    const sqlFilePath = path.resolve(__dirname, 'self online sql_sales_2019_2018.txt');
    const sql = SqlGenerator.generateForAllSales(sales);
    await fs.promises.writeFile(sqlFilePath, sql,  { encoding:'utf8', flag: 'w'});
  } 
} 

module.exports = new Leitor();