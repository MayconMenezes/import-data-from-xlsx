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

const excelDateToJSDate = (excelDate) => {
  var date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
  var converted_date = date.toISOString().split('T')[0];
  return converted_date;
}

class Leitor {
  async getData() {
    const filePath = path.resolve(__dirname, 'sales_2021.xlsx');
    const sheet = await xlsxReader(filePath, { sheet: 3 });
    const sales = [];
    for(let i =  1; i <= 364; i += 1){
      
      if(Number(sheet[i][13]) > 0) {
        const sale = new SalesModel();
        const saleDay = new Date('2019' + excelDateToJSDate(sheet[i][0]).substring(4, 24) + ' 12:00 PM');
        console.log('Sale Total: ', i, saleDay, Number(sheet[i][13]));
        sale.store_id = 'e4cadd8a-ff90-4eba-aec3-37c117902c74'; 
        sale.sale_date = saleDay;
        sale.delivery_date = saleDay;
        sale.total = Number(sheet[i][13]);

        sales.push(sale);
      }

      if(Number(sheet[i][14]) > 0) {
        const sale = new SalesModel();
        const saleDay = new Date('2018' + excelDateToJSDate(sheet[i][0]).substring(4, 24) + ' 12:00 PM');
        console.log('Sale Total: ', i, saleDay, Number(sheet[i][14]));
        sale.store_id = 'e4cadd8a-ff90-4eba-aec3-37c117902c74'; 
        sale.sale_date = saleDay;
        sale.delivery_date = saleDay;
        sale.total = Number(sheet[i][14]);

        sales.push(sale);
      }
    }

    const sqlFilePath = path.resolve(__dirname, 'oxford street sql_sales_2019_2018.txt');
    const sql = SqlGenerator.generateForAllSales(sales);
    await fs.promises.writeFile(sqlFilePath, sql,  { encoding:'utf8', flag: 'w'});
  } 
} 

module.exports = new Leitor();