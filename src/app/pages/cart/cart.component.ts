import { Component } from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";

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

  ngOnInit(): void {
    this.dataSource = this.cart.items
  }

  getTotal(items: Array<CartItem>): number {
   return  items.map((item)=> item.price * item.quantity)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

}
