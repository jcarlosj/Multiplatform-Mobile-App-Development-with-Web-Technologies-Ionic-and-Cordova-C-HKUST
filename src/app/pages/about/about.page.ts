import { Component, OnInit, Inject } from '@angular/core';

/** Models */
import { Leader } from '../../shared/interfaces/Leader';

/** Services */
import { LeaderService } from '../../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
    /** Atributes */
    leaders: Leader[];
    leadersErrorMessage: string;

    constructor(
        private leaderService: LeaderService,
        @Inject( 'BaseURL' ) public BaseURL            // Mechanism for letting Angular know that a parameter must be injected
    ) { 
        console .log( 'BaseURL', this .BaseURL );
    }

    ngOnInit() {
        /** Receive a Observable */
        this .leaderService .getLeaders()
              .subscribe(
                  leaders => this .leaders = leaders,
                  error => this . leadersErrorMessage = <any>error
              );
    }

}
