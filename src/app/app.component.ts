import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

/** Components */
import { ReservationPage } from './pages/reservation/reservation.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      type: 'page'
    },
    {
      title: 'About Us',
      url: '/about',
      icon: 'information-circle',
      type: 'page'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'list',
      type: 'page'
    },
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'heart',
      type: 'page'
    },
    {
      title: 'Reservation',
      url: 'modal-reservation',
      icon: 'calendar',
      type: 'modal'
    },
    {
      title: 'Contact Us',
      url: '/contact',
      icon: 'mail',
      type: 'page'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname;

    console .log( 'path', path );

    if ( path !== undefined) {
        this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
  }

    async openModalReservation() {
        console .log( 'openModalReservation' );

        const modal = await this .modalController .create({
            component: ReservationPage
        });

        await modal .present();
    }
}
