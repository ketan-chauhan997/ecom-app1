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
    prodPrice:string,
    prodColor:string,
    prodCategory:string,
    prodDescription:string,
    prodImageUrl:string,
    id:number
}