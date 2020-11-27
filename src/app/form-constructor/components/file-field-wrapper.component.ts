import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'file-field-wrapper',
  template: `
    <div class="file-field-wrapper">
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class FileFieldWrapperComponent extends FieldWrapper { }
