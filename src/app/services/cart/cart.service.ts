import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Item } from 'src/app/models/item.model';
import { Request } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { BaseService } from '../base/base.service';
import { RepoService } from '../repo/repo.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  model = {} as Cart;
  deliveryCharge = 20;
  private _cart = new BehaviorSubject<Cart>(null);

  get cart() {
    return this._cart.asObservable();
  }

  constructor(
    private repo: RepoService, 
    private base: BaseService,
    private router: Router
  ) { }

  getCart() {
    return this.repo.getRepo('cart');
  }

  async getCartData() {
    let data: any = await this.getCart();
    if(data?.value) {
      this.model = await JSON.parse(data.value);
      await this.calculate();
      this._cart.next(this.model);
    }
  }

  async requestToCart(request: Request) {
    const data = {
      restaurant: request.restaurant,
      items: request.request
    };
    this.model = data;
    await this.calculate();
    this.saveCart();
    this._cart.next(this.model);
    this.router.navigate(['/', 'tabs', 'restaurants', request.restaurant_id]);
  }

  async quantityPlus(index, items?: Item[], restaurant?: Restaurant) {
    if(items) {
      this.model.items = [...items];
    }
    if(restaurant) {
      this.model.restaurant = restaurant; 
    }
    console.log('q plus: ', this.model.items[index]);
    if(!this.model.items[index].quantity || this.model.items[index].quantity == 0) {
      this.model.items[index].quantity = 1;
    } else {
      this.model.items[index].quantity += 1;
    }
    await this.calculate();
    this._cart.next(this.model);
  }

  async quantityMinus(index, items?: Item[]) {
    if(items) {
      this.model.items = [...items];
    }
    console.log('item: ', this.model.items[index]);
    if(this.model.items[index].quantity && this.model.items[index].quantity !== 0) {
      this.model.items[index].quantity -= 1;
    } else {
      this.model.items[index].quantity = 0;
    }
    await this.calculate();
    this._cart.next(this.model);
  }

  async calculate() {
    let item = this.model.items.filter(x => x.quantity > 0);
    this.model.items = item;
    this.model.totalPrice = 0;
    this.model.totalItem = 0;
    this.model.deliveryCharge = 0;
    this.model.grandTotal = 0;
    item.forEach(element => {
      this.model.totalItem += element.quantity;
      this.model.totalPrice += element.price * element.quantity;
    });
    this.model.deliveryCharge = this.deliveryCharge;
    this.model.grandTotal = this.model.totalPrice + this.model.deliveryCharge;
    if(this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = {} as Cart;
    }
  }

  async clearCart() {
    this.base.showLoader();
    await this.repo.removeRepo('cart');
    this._cart.next(null);
    this.base.hideLoader();
  }

  saveCart(model?) {
    if(model) this.model = model;
    this.repo.setRepo('cart', JSON.stringify(this.model));
  }

}
