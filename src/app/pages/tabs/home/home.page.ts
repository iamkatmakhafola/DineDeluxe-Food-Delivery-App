import { Component, Input, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  swiperModules = [IonicSlides];
  @Input() restaurant: Restaurant
  restaurants: Restaurant[] = [];

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
      this.restaurants = this.data.restaurants;
  }

  getCuisine(cuisine) {
    return cuisine.join(', ');
  }
}
