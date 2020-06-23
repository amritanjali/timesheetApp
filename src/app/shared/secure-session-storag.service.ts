import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecureSessionStoragService {

  constructor() { }

  gets(key){
    return localStorage.getItem(key)
  }

  sets(key, value){
      localStorage.setItem(key, value)
  }
  remove(key){
    localStorage.removeItem(key);
  }


}

