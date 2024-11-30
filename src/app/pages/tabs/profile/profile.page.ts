import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;

  constructor(private router: Router,private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfileData();
    this.profileService.profileData$.subscribe(data => {
      this.profile = data;
    });
  }

  saveChanges() {
    this.profileService.saveProfileData(this.profile);
    this.router.navigate(['/', 'tabs', 'account']);
  }

  addNewProfile() {
    const newProfile = {
      name: 'New User',
      phone: '',
      email: ''
    };
    this.profileService.addNewProfile(newProfile);
    this.router.navigate(['/', 'tabs', 'account']);
  }
}
