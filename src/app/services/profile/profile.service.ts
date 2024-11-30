import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileDataSubject = new BehaviorSubject<any>(null);
  profileData$ = this.profileDataSubject.asObservable();

  constructor() { }

  async getProfileData(): Promise<void> {
    // Simulate fetching profile data from local storage or any other source
    const profileData = {
      name: 'John Doe',
      phone: '012 345 6789',
      email: 'johndoe@gmail.com'
    };
    this.profileDataSubject.next(profileData);
  }

  async addNewProfile(newProfileData: any): Promise<void> {
    // Get the current profile data
    const currentProfileData = this.profileDataSubject.getValue();
    
    // Add the new profile to the list of profiles
    const updatedProfileData = [...currentProfileData, newProfileData];
    
    // Update the profile data subject
    this.profileDataSubject.next(updatedProfileData);
  }

  async saveProfileData(updatedProfileData: any): Promise<void> {
    // Update the profile data subject
    this.profileDataSubject.next(updatedProfileData);
    
    // Simulate saving profile changes to local storage or any other destination
    localStorage.setItem('profileData', JSON.stringify(updatedProfileData));
  }
}
