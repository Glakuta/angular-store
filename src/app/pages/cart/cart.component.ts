import { Component } from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";

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

  constructor(private cartService: CartService) {
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

}
