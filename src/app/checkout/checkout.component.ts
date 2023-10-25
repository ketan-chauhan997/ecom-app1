import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Order, Summary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:undefined|number;
  cartData:undefined|Cart[];
  orderMessage:string|undefined;
  constructor(private prod:ProductService, private route:Router){}
  ngOnInit():void{

    this.prod.currentCart().subscribe((result)=>{
      let price:number=0;
      this.cartData=result;
      result.forEach(item=>{
        if(item.quantity)
        price=price+ (+item.prodPrice* +item.quantity);
      })
      this.totalPrice=price*(110/100)+100-(price/10);
    })
  }
  orderNow(data:{email:string,address:string,contact:string}){
    let user= localStorage.getItem('user');
    let userId= user && JSON.parse(user)[0].id;
    if(this.totalPrice){
      let orderData:Order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.prod.deleteCartItems(item.id);
        }, 700);
      })
      this.prod.orderNow(orderData).subscribe(result=>{
        if(result){
          // alert('Order placed');
          this.orderMessage="Your order has been placed"
          setTimeout(() => {
            this.route.navigate(['/my-orders']);
            this.orderMessage=undefined;
          }, 4000);
        }
      })
    }
  }
}
