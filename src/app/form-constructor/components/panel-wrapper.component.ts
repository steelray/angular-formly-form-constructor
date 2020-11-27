import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formly-wrapper-panel',
  template: `

    <ng-container #fieldComponent></ng-container>

  `,
})
export class PanelWrapperComponent extends FieldWrapper { }
