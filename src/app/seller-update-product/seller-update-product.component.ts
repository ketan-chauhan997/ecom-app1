import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData:undefined|Product;
  productUpdateMessage:undefined|string;
  constructor(private route:ActivatedRoute, private product:ProductService, private rout:Router){}
  ngOnInit():void{
    let productId= this.route.snapshot.paramMap.get('id');
    // console.warn("productId="+productId);
    productId && this.product.getProductDetails(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result;
    })
  }
  updateProducts(data:Product){
    if (this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productUpdateMessage="Product has been updated"
      }
      setTimeout(() => {
        this.productUpdateMessage=undefined;
        this.rout.navigate(['/seller-home'])
      }, 3000);
    })
  }
}
