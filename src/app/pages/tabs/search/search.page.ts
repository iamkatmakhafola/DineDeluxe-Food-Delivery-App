import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @Input() restaurant: Restaurant
  @ViewChild('searchInput') Input;
  isLoading: boolean;
  query: any;
  allPlaces: Restaurant[] = [];
  restaurants: Restaurant[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.allPlaces = this.data.allPlaces;
    this.restaurants = this.allPlaces;
  }

  getCuisine(cuisine) {
    return cuisine.join(', ');
  }

  async onSearchChange(event) {
    this.query = event.detail.value.toLowerCase();
    this.restaurants = [];
    if(this.query.length > 0) {
      this.restaurants = await this.allPlaces.filter((element: any) => {
        return element.name.toLowerCase().includes(this.query);
      });
    }
    else{
      this.restaurants = this.allPlaces;
    };
  }

}
