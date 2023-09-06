import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cart, CartItem} from "../models/cart.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []})

  constructor(private _snackbar: MatSnackBar) {

  }
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]
    const itemInCart = items.find((_item) => _item.id === item.id)
    if(itemInCart){
      itemInCart.quantity +=1
    }else{
      items.push(item)
    }

    this.cart.next({items})
    this._snackbar.open('1 item added to cart', 'Ok', {duration: 3000})
    console.log(this.cart.value)

  }

  getTotal(items: Array<CartItem>): number {
    return  items.map((item)=> item.price * item.quantity)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

  clearCart(): void {
    this.cart.next({items: []})
    this._snackbar.open("Cart is clear", "Ok", {duration: 3000})

  }

  deleteItem(item: CartItem, updateCart = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
        (_item) => _item.id !== item.id
    )

    if(updateCart){

      this.cart.next({items: filteredItems})
      this._snackbar.open("1 item removed from the cart", "Ok", {duration: 3000})

    }

    return filteredItems

  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined
    let filteredItems = this.cart.value.items.map((_item) => {
      if(item.id === item.id){
        item.quantity--
      }

      if(item.id === 0){
        itemForRemoval = _item
      }
      return _item
    })

    if (itemForRemoval){
      filteredItems = this.deleteItem(itemForRemoval, false)
    }

    this.cart.next({items: filteredItems});
    this._snackbar.open("1 item removed from cart", "Ok", {duration: 3000})
  }
}
