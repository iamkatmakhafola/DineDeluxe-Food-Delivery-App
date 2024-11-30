import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor() { }

  getRepo(key) {
    return Preferences.get({key: key});
  }

  removeRepo(key) {
    Preferences.remove({key: key});
  }

  setRepo(key, value) {
    Preferences.set({key: key, value: value});
  }
}
