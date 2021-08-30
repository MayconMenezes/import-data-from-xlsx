const { v4: uuidv4 } = require('uuid');

class SalesModel {
  // (id,sale_date,delivery_date,total,status,customer_id,currency_id,
  // company_id,salesman_id,billing_address_number,
  // delivery_address_number,store_id,billing_address_id,delivery_address_id,payment_id) 
  constructor() {
    this.id = uuidv4();
    this.store_id = '';
    this.sale_date = '';
    this.delivery_date = '';
    this.total = 0;
    this.status = 5,
    this.customer_id = 'e316dc15-5b27-4764-993b-8fe8d82c37a6';
    this.currency_id = '1a24973a-1d99-4acc-a7c8-a27600b4fb9e';
    this.company_id = '28366814-e658-471e-82ae-9771b399153c';
    this.salesman_id = 'efcb93a8-b41b-4dff-9a6a-5d7dcdea5ad5';
    this.billing_address_number = '123';
    this.delivery_address_number = '123';
    this.billing_address_id = 'b9b91425-e813-443c-9780-2aa5e6a74bba';
    this.delivery_address_id = 'b9b91425-e813-443c-9780-2aa5e6a74bba';
    this.payment_id = '16a87434-9122-4c3f-8197-3385aac13963';
    this.items = [];
  }


}

module.exports = SalesModel;

//STORES: 
// 87c5c5fb-b43c-4524-8cb8-2b1f981634a5 = selfrigde
// e4cadd8a-ff90-4eba-aec3-37c117902c74 = oxford street
// 60c3b6ef-3f5b-40d5-8cf7-6c05d695bb7d = st giles online


//PRODUCTS: 
// fce51924-f9aa-4f75-8a4b-3d3aa2c8dc3c = THE MECHANIC = MEC
// 967e707f-b61f-4dab-839a-abb94ab5e9fc = THE TYCOON = TYC
// 8d543e67-d0d8-4022-9bc7-9fe51fab79b7 = THE STYLIST = STY
// 72b7e1bd-a687-4a8c-ae5c-e470276fc397 = THE ACTRESS = ACT
// 0b865464-1f06-4a6c-b367-6c996daf14a1 = THE WRITER = WRI