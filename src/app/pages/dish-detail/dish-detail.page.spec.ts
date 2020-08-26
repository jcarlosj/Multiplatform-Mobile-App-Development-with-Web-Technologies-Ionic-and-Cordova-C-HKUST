import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DishDetailPage } from './dish-detail.page';

describe('DishDetailPage', () => {
  let component: DishDetailPage;
  let fixture: ComponentFixture<DishDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DishDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
