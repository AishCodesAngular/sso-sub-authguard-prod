import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { SharedService } from './services/shared-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
   message = signal<any>('Waiting for message... from App1');
   counter = signal<number>(0);
    public isRootAppOpen: any;

  constructor(
    private router: Router,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    window.addEventListener('message', this.handleMessage);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = (event: MessageEvent) => {
     const expectedPath = '/sso-main-authguard-prod/';
    if (event.origin + expectedPath !== 'https://aishcodesangular.github.io/sso-main-authguard-prod/') return; // ✅ security check
    if (event.data?.type === 'GREETING_FROM_APP1') {
        this.message.set(event.data);
        console.log('Message received in App2:', event.data);
         if(event.data.process.isRootAppOpen == 'true') {
          localStorage.setItem('isRootAppOpen', event.data.process.isRootAppOpen);
        } else {
          localStorage.removeItem('isRootAppOpen');
        }
        this.isRootAppOpen = localStorage.getItem('isRootAppOpen');
        this.sharedService.isAppOpen = this.isRootAppOpen;
        this.conterHandler(event.data.process)
        this.openForms(event.data.process.formName);

    }
  };

//   sendMessageToApp1(value: any) {
//   window.opener?.postMessage(
//     { type: 'GREETING_FROM_APP2', payload: 'Hello back from App2!', process: value },
//     'http://localhost:4200'
//   );
// }

conterHandler(value: any) {
  if(value === 'minus') {
    this.counter.set(this.counter() - 1);
  } else if(value === 'pluse') {
    this.counter.set(this.counter() + 1);
  }
}

openForms(value:any) {
  this.router.navigate(['/'+value]);
}

incrementApp1(value: any) {
    this.sharedService.sendMessageToApp1(value);
}

decrementApp1(value: any) {
  this.sharedService.sendMessageToApp1(value);
}
}
