import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData:undefined|Product;
  constructor(private route:ActivatedRoute, private product:ProductService){}
  ngOnInit():void{
    let productId= this.route.snapshot.paramMap.get('id');
    // console.warn("productId="+productId);
    productId && this.product.getProductDetails(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result;
    })
  }
  updateProducts(data:any){
    
  }
}
