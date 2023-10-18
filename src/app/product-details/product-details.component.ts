import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetails:undefined|Product;
  constructor(private route:ActivatedRoute,private product:ProductService){}
  ngOnInit():void{
    let prodId= this.route.snapshot.paramMap.get('id');
    // console.warn(prodId);
    prodId && this.product.getProductDetails(prodId).subscribe((result)=>{
      // console.warn(result);
      this.productDetails=result;
    })
  }

}
