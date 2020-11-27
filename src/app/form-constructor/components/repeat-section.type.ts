import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-repeat-section',
  template: `
    <ng-container *ngIf="field.fieldGroup">
      <mat-card class="example-card">
        <mat-card-content>
          <div class="fields-group-row" *ngFor="let field of field.fieldGroup; let i = index;">
            <formly-field [field]="field"></formly-field>
            <div class="col-sm-2 d-flex align-items-center">
              <button mat-raised-button color="warn" type="button" (click)="remove(i)">Remove</button>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="accent" type="button" (click)="add()">{{ to.addText }}</button>
        </mat-card-actions>
      </mat-card>
    </ng-container>
  `,
})
export class RepeatTypeComponent extends FieldArrayType { }
