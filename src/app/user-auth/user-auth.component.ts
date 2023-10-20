import { Component } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showUserLogin: boolean = false;
  showUserLoginError: undefined | string;
  constructor(private user: UserService, private prod: ProductService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  OpenLoginUser() {
    this.showUserLogin = true;
  }
  OpenUserSignUp() {
    this.showUserLogin = false;
  }
  UserSignUp(val: SignUp) {
    // console.warn(val);
    this.user.SignUpUser(val);
  }
  UserLogin(val: Login) {
    // console.warn(val);
    this.user.LoginUser(val);
    this.user.userLoginErrorMessage.subscribe(error => {
      if (error) {
        this.showUserLoginError = "Please enter Valid User Details";
      }
      else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 500);
        
      }
    })
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    // console.warn('Check',user);
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);

      // console.warn('Check',userId);
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          userId,
          productId: product.id
        }
        delete cartData.id;
        // console.warn(cartData);
        setTimeout(() => {
          this.prod.AddToUserCart(cartData).subscribe(result => {
            if (result) {
              console.warn("Item stored in db")
            }
          })
          if (cartDataList.length === index + 1) {
            console.warn("Items removing")
            localStorage.removeItem('localCart');
          }
        }, 2000);
      })
    }
    setTimeout(() => {
      this.prod.getCartList(userId);
    }, 2000);
  }

}
