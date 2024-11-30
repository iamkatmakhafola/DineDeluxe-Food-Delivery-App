import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { take } from 'rxjs/operators';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

  
  id: any;
  data = {} as Restaurant;
  items: Item[] = [];
  veg: boolean = false;
  isLoading: boolean;
  cartData: any = {};
  storedData: any = {};
  categories: Category[] = [];
  allItems: Item[] = [];
  cartSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private backend: DataService,
    private cartService: CartService
  ) { }

  ngOnInit() {    
    this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
      if(!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
    });
    this.cartSub = this.cartService.cart.subscribe(cart => {
      this.cartData = {};
      this.storedData = {};
      if(cart && cart?.totalItem > 0) {
        this.storedData = cart;
        this.cartData.totalItem = this.storedData.totalItem;
        this.cartData.totalPrice = this.storedData.totalPrice;
        if(cart?.restaurant?.uid === this.id) {
          this.allItems.forEach(element => {
            cart.items.forEach(element2 => {
              if(element.id != element2.id) return;
              element.quantity = element2.quantity;
            });
          });
          this.cartData.items = this.allItems.filter(x => x.quantity > 0);
          if(this.veg == true) this.items = this.allItems.filter(x => x.veg === true);
          else this.items = [...this.allItems];
        } else {
          this.allItems.forEach(element => {            
              element.quantity = 0;
          });
          if(this.veg == true) this.items = this.allItems.filter(x => x.veg === true);
          else this.items = [...this.allItems];
        }
      } 
      
    });    
    this.getItems();
  }

  getCuisine(cuisine) {
    return cuisine.join(', ');
  }

  async getItems() {
    this.isLoading = true;
      this.data = {} as Restaurant;
      this.cartData = {};
      this.storedData = {};
        this.allItems = this.backend.allItems;
        let data: any = this.backend.restaurants.filter(x => x.uid === this.id);
        this.data = data[0];
        this.categories = this.backend.categories.filter(x => x.uid === this.id);
        this.allItems = this.backend.allItems.filter(x => x.uid === this.id);
        this.allItems.forEach((element, index) => {
          this.allItems[index].quantity = 0;
        });
        this.items = [...this.allItems];
        await this.cartService.getCartData();
        this.isLoading = false;
  }

  quantityPlus(item) {
    const index = this.allItems.findIndex(x => x.id === item.id);
    if(!this.allItems[index].quantity || this.allItems[index].quantity == 0) {
      if(!this.storedData.restaurant || (this.storedData.restaurant && this.storedData.restaurant.uid == this.id)) {
        this.cartService.quantityPlus(index, this.allItems, this.data);
      }
    } else {
      this.cartService.quantityPlus(index, this.allItems, this.data);
    }  
  }

  quantityMinus(item) {
    const index = this.allItems.findIndex(x => x.id === item.id);
    this.cartService.quantityMinus(index, this.allItems);
  }

  saveToCart() {
    this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      this.cartService.saveCart();
  }

  async viewCart() {
    if(this.cartData.items && this.cartData.items.length > 0) await this.saveToCart();
    this.router.navigate([this.router.url + '/cart']);
  }

  ngOnDestroy() {
    if(this.cartSub) this.cartSub.unsubscribe();
  }
}
