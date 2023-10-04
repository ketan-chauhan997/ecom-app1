import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList:undefined|Product[];
  deleteProductMessgae:undefined|string;
  constructor(private product:ProductService){}
  ngOnInit():void{
    this.loadProducts();
  }
  loadProducts(){
    this.product.viewProducts().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
    })
  }
  deleteProduct(id:number){
    console.warn(id);
    this.product.deleteProducts(id).subscribe((result)=>{
      if(result){
        this.deleteProductMessgae="Product is deleted successfully";
      }
      setTimeout(() => {
        this.deleteProductMessgae=undefined;
      }, 3000);
      this.loadProducts();
    })
  }
}
