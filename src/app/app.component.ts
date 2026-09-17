import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import {
  IonApp,
  IonRouterOutlet,
  Platform,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private backButtonListener?: PluginListenerHandle;
  private lastBackPress = 0;
  private readonly exitDelay = 2000;

  constructor(
    private platform: Platform,
    private router: Router,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.platform.ready();

    if (!this.platform.is('android')) {
      return;
    }

    this.backButtonListener = await App.addListener('backButton', async () => {
      const now = Date.now();

      const isHomePage =
        this.router.url === '/' ||
        this.router.url === '/home' ||
        this.router.url === '/tabs/home';

      if (!isHomePage) {
        window.history.back();
        return;
      }

      if (now - this.lastBackPress < this.exitDelay) {
        await App.exitApp();
        return;
      }

      this.lastBackPress = now;

      const toast = await this.toastController.create({
        message: 'Press back again to exit',
        duration: this.exitDelay,
        position: 'bottom',
        color: 'dark'
      });

      await toast.present();
    });
  }

  ngOnDestroy() {
    this.backButtonListener?.remove();
  }
}
