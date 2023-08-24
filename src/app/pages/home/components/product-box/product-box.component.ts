import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Product} from "../../../../models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false
  product: Product | undefined = {
    id: 1,
    title: "Nike Air Jordan I",
    price: 100,
    category: "shoes",
    description: "Dumb description dasdasdasdasda",
    image: "https://placeholder/150"

}
@Output() addToCart = new EventEmitter()

  onAddToCart(): void {
    this.addToCart.emit(this.product)

  }

}
