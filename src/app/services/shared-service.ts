import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isAppOpen = localStorage.getItem('isRootAppOpen');


  sendMessageToApp1(value: any) {
    window.opener?.postMessage(
      { type: 'GREETING_FROM_APP2', payload: 'Hello back from App2!', process: value },
      'https://aishcodesangular.github.io/sso-main-authguard-prod/'
    );
  }
  
}
