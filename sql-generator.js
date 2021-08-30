const dateFns = require('date-fns');

class SqlGenerator {
  generateForAllSales(sales) {
    let sql = 'BEGIN;\n';

    sales.forEach(sale => {
      sql += this.generateForSale(sale);

      sale.items.forEach(saleItem => {
        sql += this.generateForSaleItem(saleItem);
      });
    
    });

    sql += '\nCOMMIT;';
    return sql;
  }
  generateForSale(sale) {
    return `\nINSERT INTO sales(id,sale_date,delivery_date,total,status,customer_id,currency_id,company_id,salesman_id,billing_address_number,delivery_address_number,store_id,billing_address_id,delivery_address_id,payment_id) 
      VALUES('${sale.id}',
      '${dateFns.format(sale.sale_date, 'yyyy-MM-dd')}',
      '${dateFns.format(sale.delivery_date, 'yyyy-MM-dd')}',
      ${sale.total},${sale.status},
      '${sale.customer_id}','${sale.currency_id}','${sale.company_id}',
      '${sale.salesman_id}','${sale.billing_address_number}','${sale.delivery_address_number}',
      '${sale.store_id}','${sale.billing_address_id}','${sale.delivery_address_id}','${sale.payment_id}');\n`;
  }

  generateForSaleItem(saleItem) {
    return `\n INSERT INTO sales_items(id,sales_id,product_id,quantity,value,discount) 
      VALUES('${saleItem.id}','${saleItem.sale_id}','${saleItem.product_id}',${saleItem.quantity},${saleItem.value},${saleItem.discount});\n`;
  }
}

module.exports = new SqlGenerator();

// SQL SALE
// insert into sales (id,sale_date,delivery_date,total,status,customer_id,currency_id,company_id,salesman_id,billing_address_number,delivery_address_number,store_id,billing_address_id,delivery_address_id,payment_id) values ('028ac4cd-1db1-4b8d-ae8a-9c15d5df7a53',current_timestamp,current_timestamp,25178,1,(SELECT id FROM customers OFFSET floor(random() * (SELECT COUNT(*) FROM customers)) LIMIT 1),(SELECT id FROM currencies OFFSET floor(random() * (SELECT COUNT(*) FROM currencies)) LIMIT 1),(SELECT id FROM companies OFFSET floor(random() * (SELECT COUNT(*) FROM companies)) LIMIT 1),(SELECT id FROM staffs OFFSET floor(random() * (SELECT COUNT(*) FROM staffs)) LIMIT 1),'10','10',(SELECT id FROM stores OFFSET floor(random() * (SELECT COUNT(*) FROM stores)) LIMIT 1),(SELECT id FROM addresses OFFSET floor(random() * (SELECT COUNT(*) FROM addresses)) LIMIT 1),(SELECT id FROM addresses OFFSET floor(random() * (SELECT COUNT(*) FROM addresses)) LIMIT 1),(SELECT id FROM payment_methods OFFSET floor(random() * (SELECT COUNT(*) FROM payment_methods)) LIMIT 1));

// SQL SALE ITEM
// insert into sales_items(id,sales_id,product_id,quantity,value,discount) values ('22c44a22-9612-4b1c-8368-22f75c253ee1', (SELECT id FROM sales OFFSET floor(random() * (SELECT COUNT(*) FROM sales)) LIMIT 1), (SELECT id FROM products OFFSET floor(random() * (SELECT COUNT(*) FROM products)) LIMIT 1), (SELECT floor(random() * 10 + 1)::int), (SELECT floor(random() * 10 + 1)::int), 0);
