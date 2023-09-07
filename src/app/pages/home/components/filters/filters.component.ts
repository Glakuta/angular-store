import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {StoreService} from "../../../../services/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categorySubscription: Subscription | undefined
  categories = ["shoes", "hoodies"];

  constructor(private storeService: StoreService) {
  }

  ngOnInit(){
    this.getCategories()
  }



  getCategories() {
    this.categorySubscription = this.storeService.getAllCategories()
        .subscribe((_categories) => {
          this.categories = _categories
        })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy() {
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe()
    }
  }
}
