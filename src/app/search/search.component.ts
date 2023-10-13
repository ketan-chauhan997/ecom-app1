import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|Product[];
  constructor(private route:ActivatedRoute,private prod:ProductService){}
  ngOnInit():void{
    this.route.params.subscribe(params=>{
      let query=params['query'];
      this.searchResult=undefined;
      this.loadData(query);
    })
    // let query = this.route.snapshot.paramMap.get('query');
    // console.warn(query);
    
  }
  loadData(val:string){
    val && this.prod.serachedProducts(val).subscribe((result)=>{
      this.searchResult=result;
      console.warn(this.searchResult);
    })
  }
  // ngOnChanges(){
  //   let query = this.route.snapshot.paramMap.get('query');
  //   console.warn(query);
  //   query && this.prod.serachedProducts(query).subscribe((result)=>{
  //     this.searchResult=result;
  //     console.warn(this.searchResult);
  //   })
  // }
}
