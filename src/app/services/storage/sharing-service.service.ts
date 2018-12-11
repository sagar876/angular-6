import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  userID: string = "user_id";
  authState : string  ="auth state";

  constructor() { }

  setData(storageName :string,data: any) {
    localStorage.setItem(storageName, JSON.stringify(data));
  }

  getData(storageName :string) {
    let data = localStorage.getItem(storageName);
    return JSON.parse(data);
  }

  clearKayData(storageName :string) {
    localStorage.removeItem(storageName);
  }

  cleanAll() {
    localStorage.clear()
  }
}
