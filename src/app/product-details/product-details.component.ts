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
  productQuantity:number=1;
  constructor(private route:ActivatedRoute,private product:ProductService){}
  ngOnInit():void{
    let prodId= this.route.snapshot.paramMap.get('id');
    // console.warn(prodId);
    prodId && this.product.getProductDetails(prodId).subscribe((result)=>{
      // console.warn(result);
      this.productDetails=result;
    })
  }
  handleQuantity(val :string){
    if(this.productQuantity<20 && val=='plus')
      this.productQuantity+=1;
    else if(this.productQuantity>1 && val=='min')
      this.productQuantity-=1;
  }
}
