import { Injectable } from '@angular/core';
// import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { Request } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  restaurants: Restaurant[] = [
    {
      uid: '1',
      cover: 'assets/imgs/1.jpeg',
      name: 'Dragons Delight',
      short_name: 'Dragons Delight',
      cuisines: [
        'Chinese Cuisine'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.59,
      price: 150
    },
    {
      uid: '2',
      cover: 'assets/imgs/2.jpeg',
      name: 'Curry House Express',
      short_name: 'Curry House Express',
      cuisines: [
        'Indian Cuisine'
      ],
      rating: 4.5,
      delivery_time: 20,
      distance: 1.98,
      price: 120
    },
    {
      uid: '3',
      cover: 'assets/imgs/3.jpeg',
      name: 'Ciao Bella Italiano',
      short_name: 'Ciao Bella Italiano',
      cuisines: [
        'Italian Cuisine'
      ],
      rating: 4.3,
      delivery_time: 12,
      distance: 1.52,
      price: 80
    },
    {
      uid: '4',
      cover: 'assets/imgs/4.jpeg',
      name: 'Burrito Bistro',
      short_name: 'Burrito Bistro',
      cuisines: [
        'Mexican Cuisine'
      ],
      rating: 4.1,
      delivery_time: 5,
      distance: 0.9,
      price: 110
    },
  ];

  allPlaces: Restaurant[] = [
    {
      uid: '1',
      cover: 'assets/imgs/1.jpeg',
      name: 'Dragons Delight',
      short_name: 'Dragons Delight',
      cuisines: [
        'Chinese Cuisine'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.59,
      price: 150
    },
    {
      uid: '2',
      cover: 'assets/imgs/2.jpeg',
      name: 'Curry House Express',
      short_name: 'Curry House Express',
      cuisines: [
        'Indian Cuisine'
      ],
      rating: 4.5,
      delivery_time: 20,
      distance: 1.98,
      price: 120
    },
    {
      uid: '3',
      cover: 'assets/imgs/3.jpeg',
      name: 'Ciao Bella Italiano',
      short_name: 'Ciao Bella Italiano',
      cuisines: [
        'Italian Cuisine'
      ],
      rating: 4.3,
      delivery_time: 12,
      distance: 1.52,
      price: 80
    },
    {
      uid: '4',
      cover: 'assets/imgs/4.jpeg',
      name: 'Burrito Bistro',
      short_name: 'Burrito Bistro',
      cuisines: [
        'Mexican Cuisine'
      ],
      rating: 4.1,
      delivery_time: 5,
      distance: 0.9,
      price: 110
    },
  ];
  
  categories: Category[] = [
    {
      id: "r1",
      name: "Chinese",
      uid: "1"
    },
    {
      id: "r2",
      name: "Indian",
      uid: "2"
    },
    {
      id: "r3",
      name: "Italian",
      uid: "3"
    },
    {
      id: "r4",
      name: "Mexican",
      uid: "4"
    },
    
    
  ]; 

  allItems: Item[] = [    
    {
      category_id: "r1",
      cover: "assets/imgs/1.jpeg",
      desc: "Savory noodle dish",
      id: "i1",
      name: "Dragons Delight",
      price: 150,
      rating: 5,
      status: true,
      uid: "1",
      variation: false,
      veg: false
    },
    {
      category_id: "r2",
      cover: "assets/imgs/2.jpeg",
      desc: "Spicy",
      id: "i2",
      name: "Curry House Express",
      price: 120,
      rating: 4.5,
      status: true,
      uid: "2",
      variation: false,
      veg: false
    },
    {
      category_id: "r3",
      cover: "assets/imgs/3.jpeg",
      desc: "Classic cheesy",
      id: "i3",
      name: "Ciao Bella Italiano",
      price: 80,
      rating: 4.3,
      status: true,
      uid: "3",
      variation: false,
      veg: false
    },
    {
      category_id: "r4",
      cover: "assets/imgs/4.jpeg",
      desc: "Hearty wrap",
      id: "i4",
      name: "Burrito Bistro",
      price: 110,
      rating: 4.1,
      status: true,
      uid: "4",
      variation: false,
      veg: false
    },   
  ];

  requests: Request[] = [];
  
  constructor() { }
}
