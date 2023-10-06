import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productsCarousel:undefined|Product[];
  prodList:undefined|Product[];
  constructor(private product:ProductService){};
  ngOnInit():void{
    this.product.popularPorducts().subscribe((result)=>{
      console.warn(result);
      this.productsCarousel=result;
    })
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.prodList=result;
    })
  }
}
