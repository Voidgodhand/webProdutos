import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProdutosComponent } from './consulta-produtos.component';

describe('ConsultaProdutosComponent', () => {
  let component: ConsultaProdutosComponent;
  let fixture: ComponentFixture<ConsultaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaProdutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
