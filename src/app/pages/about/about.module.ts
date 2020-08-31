import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

/** Services */
import { LeaderService } from '../../services/leader.service';
import { ProcessHttpMessageService } from '../../services/process-http-message.service';

/** Router */
import { AboutPageRoutingModule } from './about-routing.module';

/** Page Components */
import { AboutPage } from './about.page';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from '../../shared/baseurl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AboutPageRoutingModule
  ],
  declarations: [AboutPage],
  providers: [
    LeaderService,
    ProcessHttpMessageService,
    {
        provide: 'BaseURL',
        useValue: BASE_URL
    }
  ]
})
export class AboutPageModule {}
