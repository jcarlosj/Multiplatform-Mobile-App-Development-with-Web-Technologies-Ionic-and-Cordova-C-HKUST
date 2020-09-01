import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/** Services */
import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { FavoriteService } from './services/favorite.service';
import { ProcessHttpMessageService } from './services/process-http-message.service';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from './shared/baseurl';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DishService,
    LeaderService,
    FavoriteService,
    ProcessHttpMessageService,
    {
        provide: 'BaseURL',
        useValue: BASE_URL
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
