import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { RequestService } from 'src/app/services/request/request.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ModalController } from '@ionic/angular';
import { HelpModalComponent } from 'src/app/components/help-modal/help-modal.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {
  profile: any;
  isLoading: boolean;
  requests: Request[] = [];
  requestsSub: Subscription;

  constructor(
    private router: Router,
    private requestService: RequestService,
    private cartService: CartService,
    private profileService: ProfileService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.profileService.profileData$.subscribe(data => {
      this.profile = data;
    });
    this.requestService.requests.subscribe(request => {
      this.requests = request;
    });
    this.getData();
  }

  getData() {
    this.profileService.getProfileData();
    this.requestService.getRequest();
  }

  editProfile() {
    this.router.navigate(['/', 'tabs', 'profile']);
  }

  async reorder(request: Request) {
    const data = await this.cartService.getCart();
    this.cartService.requestToCart(request);
  }

  async getHelp(request) {
    const modal = await this.modalController.create({
      component: HelpModalComponent,
      componentProps: {
        request: request
      }
    });
    return await modal.present();
  }
  
  ngOnDestroy() {
    if (this.requestsSub) { this.requestsSub.unsubscribe(); }
  }
}
