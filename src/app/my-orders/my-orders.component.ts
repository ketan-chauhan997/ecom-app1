import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData:undefined|Order[];
  constructor(private prod:ProductService){}
  ngOnInit():void{
    this.getOrderedList();
  }
  cancelOrderItems(data:Order){
    data.id && this.prod.cancelOrder(data.id).subscribe(result=>{
      this.getOrderedList();
    });
  }

  getOrderedList(){
    this.prod.myOrders().subscribe(result=>{
      console.warn(result);
      this.orderData=result;
    })
  }
}
