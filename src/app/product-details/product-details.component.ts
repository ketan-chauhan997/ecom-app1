import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetails:undefined|Product;
  productQuantity:number=1;
  showRemoveCart=false;
  cartData:Product|undefined;
  constructor(private route:ActivatedRoute,private product:ProductService){}
  ngOnInit():void{
    let prodId= this.route.snapshot.paramMap.get('id');
    // console.warn(prodId);
    prodId && this.product.getProductDetails(prodId).subscribe((result)=>{
      // console.warn(result);
      this.productDetails=result;

      let cartData=localStorage.getItem('localCart');
      if(cartData && prodId){
        let items = JSON.parse(cartData);
        items = items.filter((item:Product)=>item.id.toString()==prodId);
        if(items.length){
          this.showRemoveCart=true;
        }
        else{
          this.showRemoveCart=false;
        }
      }
      let user =localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user)[0].id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe(result=>{
          let item = result.filter((item:Product)=>prodId===item.productId?.toString());
          if(item.length){
            this.cartData=item[0];
            this.showRemoveCart=true;
          }
        })
      }
    });

  }
  handleQuantity(val :string){
    if(this.productQuantity<20 && val=='plus')
      this.productQuantity+=1;
    else if(this.productQuantity>1 && val=='min')
      this.productQuantity-=1;
  }
  AddToCart(){
    if(this.productDetails){
      this.productDetails.quantity=this.productQuantity;
      if(localStorage.getItem('user')){
        console.warn('user logged in')
        // console.warn(this.productDetails);
        let user= localStorage.getItem('user');
        let userId= user && JSON.parse(user)[0].id;
        console.warn(userId);
        let cartData:Cart={
          ...this.productDetails,
          userId,
          productId:this.productDetails.id
        }
        delete cartData.id;
        // console.warn(cartData)
        this.product.AddToUserCart(cartData).subscribe(result=>{
          // console.warn(result);
          this.product.getCartList(userId);
          this.showRemoveCart=true;
          alert('Product is added to cart!')
        })
      }
      else{
        console.warn('user not logged in');
        this.product.localAddToCart(this.productDetails);
        this.showRemoveCart=true;
      }
    }
  }
  RemoveFromCart(prodId:number){
      if(localStorage.getItem('user')){
        let user= localStorage.getItem('user');
        let userId= user && JSON.parse(user)[0].id;
        console.warn(this.cartData);
        this.cartData && this.product.RemoveToCartDb(this.cartData.id).
        subscribe(result=>{
          if(result){
            this.product.getCartList(userId);
          }
        });
      }
      else{
        this.product.RemoveToCart(prodId);
        
      }
      this.showRemoveCart=false;
  }
}
