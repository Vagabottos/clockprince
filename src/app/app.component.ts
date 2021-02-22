import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private updates: SwUpdate
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.watchAppChanges();
  }

  private watchAppChanges() {
    if (!this.updates.isEnabled) { return; }

    interval(1000 * 60 * 15).subscribe(() => this.updates.checkForUpdate());
    this.updates.checkForUpdate();
  }
}
