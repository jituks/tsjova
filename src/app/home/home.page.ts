import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { warningOutline } from 'ionicons/icons';

addIcons({
  'warning-outline': warningOutline,
});

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
  ],
})
export class HomePage implements OnInit {
  // Replace with the real URL for your tsjovan app.
  websiteUrl = 'https://example.com';

  loading = true;
  loadError = false;

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.loadError) {
        this.loading = false;
      }
    }, 1800);
  }

  onPageLoaded(): void {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  onPageError(): void {
    this.loadError = true;
    this.loading = false;
  }

  reloadPage(): void {
    this.loadError = false;
    this.loading = true;

    const frame = document.getElementById(
      'website-frame'
    ) as HTMLIFrameElement | null;

    if (frame) {
      frame.src = this.websiteUrl;
    }
  }
}
