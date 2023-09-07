import { Component } from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {HttpClient} from "@angular/common/http";
import {loadStripe} from "@stripe/stripe-js";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  cart: Cart = {items: [
      {
        product: "https://placeholder.com/150",
        name: "Air Jordan II",
        price: 100,
        quantity: 25,
        id: 1
      }
    ]}
  dataSource: Array<CartItem> = []

  displayedColumns: Array<string> = [
      'product', 'name', 'price', 'quantity', 'total', 'action'
  ]

  constructor(private cartService: CartService, private http: HttpClient) {
  }

  ngOnInit(): void {

    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  getTotal(items: Array<CartItem>): number {
   return  this.cartService.getTotal(items)
  }

  onClearCart(): void {
    return this.cartService.clearCart()

  }

  onDeleteItem(item: CartItem): void {
    this.cartService.deleteItem(item)

  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item)
  }

  onCheckout(): void {
    console.log("Hello World")
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51Nnhb5Bb3CD4mMr7sSM5RhtTq2DKCNx5qwS1Iu9exLOFkDKdNr5NusyLOdcx6lFg8UHpfuWsuKAAij39ZlQfn1PW00RNEuBGnE')
      stripe?.redirectToCheckout({
        sessionId: res.id

      })
    })

  }

}
