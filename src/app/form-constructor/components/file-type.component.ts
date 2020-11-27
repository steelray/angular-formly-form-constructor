import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-field-file',
  template: `
    <button (click)="input.click()" mat-raised-button color="accent" class="formly-field-file-btn">
      <input (change)="fileHandler($event)" #input type="file" [formControl]="formControl" [formlyAttributes]="field">
      <span>{{to.label ? to.label : 'Choose File'}}</span>
    </button>
    <span *ngIf="this.file">{{this.file.name}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldFile extends FieldType {
  formControl: any;
  file: File | undefined;

  fileHandler(e: any): void {
    const files = e.target?.files;
    if (files.length) {
      this.file = files[0];
    }
  }

}
