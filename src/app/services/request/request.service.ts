import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _request = new BehaviorSubject<Request[]>([]);

  get requests() {
    return this._request.asObservable();
  }

  constructor(private data: DataService) { }

  getRequest() {
    const request = this.data.requests;
    this._request.next(request);
  }

  placeOrder(param) {
    param.user_id = '1';
    param.id = 'o1';
    let currentRequests: Request[] = [];
    currentRequests.push(new Request(
      param.address,
      param.restaurant,
      param.restaurant_id,
      param.request,
      param.total,
      param.grandTotal,
      param.deliveryCharge,
      param.status,
      param.time,
      param.paid,    
      param.id,
      param.user_id, 
    ));
    currentRequests = currentRequests.concat(this._request.value);
    this._request.next(currentRequests);
  }
}
