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
  constructor(private product:ProductService){};
  ngOnInit():void{
    this.product.popularPorducts().subscribe((result)=>{
      console.warn(result);
      this.productsCarousel=result;
    })
  }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
