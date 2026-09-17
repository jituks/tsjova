import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonContent, IonIcon, IonButton } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { warningOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonButton],
})
export class HomePage implements OnInit {
  rawUrl: string = 'https://transjovancap.com'; // Replace with target URL
  websiteUrl!: SafeResourceUrl;
  loading: boolean = true;
  loadError: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
    addIcons({ warningOutline });
  }

  ngOnInit() {
    this.loadWebsite();
  }

  loadWebsite() {
    this.loading = true;
    this.loadError = false;
    // Bypasses Angular's XSS security filter for iframe src
    this.websiteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl);
  }

  onPageLoaded() {
    this.loading = false;
  }

  onPageError() {
    this.loading = false;
    this.loadError = true;
  }

  reloadPage() {
    this.loadWebsite();
  }
}