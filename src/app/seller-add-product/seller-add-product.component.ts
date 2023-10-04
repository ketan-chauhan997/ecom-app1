import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:undefined | string;
  constructor(private product:ProductService){}
  addProducts(data:Product):void{
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage="Product added successfully";
      }
      setTimeout(() => {
        this.addProductMessage=undefined;
      }, 3000);
    })
  }
}
