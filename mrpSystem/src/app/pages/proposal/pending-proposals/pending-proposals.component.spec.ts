import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProposalsComponent } from './pending-proposals.component';

describe('PendingProposalsComponent', () => {
  let component: PendingProposalsComponent;
  let fixture: ComponentFixture<PendingProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
