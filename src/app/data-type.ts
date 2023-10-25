export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface Login{
    email:string,
    password:string
}
export interface Product{
    prodName:string,
    prodPrice:number,
    prodColor:string,
    prodCategory:string,
    prodDescription:string,
    prodImageUrl:string,
    id:number,
    quantity:undefined|number
    productId:undefined|number
}
export interface Cart{
    prodName:string,
    prodPrice:number,
    prodColor:string,
    prodCategory:string,
    prodDescription:string,
    prodImageUrl:string,
    id:number|undefined,
    quantity:undefined|number,
    userId:number,
    productId:number
}

export interface Summary{
    amount:number,
    tax:number,
    delivery:number,
    discount:number,
    total:number
}