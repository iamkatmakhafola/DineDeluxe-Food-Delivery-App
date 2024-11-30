import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { Cart } from 'src/app/models/cart.model';
import { Request } from 'src/app/models/request.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { BaseService } from 'src/app/services/base/base.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;
  urlCheck: any;
  url: any;
  model = {} as Cart;
  deliveryCharge = 20;
  instruction: any;
  location = {} as Address;
  cartSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private requestService: RequestService,
    private base: BaseService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartSub = this.cartService.cart.subscribe(cart => {
      this.model = cart;
    })
    this.getData();
  }

  async getData() {
    await this.checkUrl(); 
    await this.cartService.getCartData();
  }

  checkUrl() {
    let url: any = (this.router.url).split('/');
    const spliced = url.splice(url.length - 2, 2); 
    this.urlCheck = spliced[0];
    url.push(this.urlCheck);
    this.url = url;
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  async makePayment() {
    const data = {
      restaurant_id: this.model.restaurant.uid,
      instruction: this.instruction ? this.instruction : '',
      restaurant: this.model.restaurant,
      request: this.model.items, 
      time: moment().format('lll'),
      address: this.location,
      total: this.model.totalPrice,
      grandTotal: this.model.grandTotal,
      deliveryCharge: this.deliveryCharge,
      status: 'Delivered',
      paid: 'COD'
    };
    await this.requestService.placeOrder(data);
    await this.cartService.clearCart();
    this.model = {} as Cart;
    this.base.successToast('Order Placed Successfully');
    this.navCtrl.navigateRoot(['tabs/account']);
  }

}
