import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { Observable, of } from 'rxjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import * as enUS from '../assets/i18n/en-US.json';
import * as frFR from '../assets/i18n/fr-FR.json';

const langs = {
  'en-US': (enUS as any).default || enUS,
  'fr-FR': (frFR as any).default || frFR
};

export class JSONLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(langs[lang] || enUS);
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: JSONLoader
      }
    }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
