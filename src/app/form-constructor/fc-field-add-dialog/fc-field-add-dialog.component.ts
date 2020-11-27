import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { FIELD_TYPES } from '../enum/field-types.enum';
import { fcFields } from './fc-fields';


export interface IFormlySelectOptions { name: string; value: string | number; }

@Component({
  selector: 'app-fc-field-add-dialog',
  templateUrl: './fc-field-add-dialog.component.html',
  styleUrls: ['./fc-field-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FcFieldAddDialogComponent {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = fcFields;
  subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<FcFieldAddDialogComponent>
  ) { }


  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const {
      type,
      key,
      label,
      placeholder,
      options,
      required,
      defaultValue
    } = this.form.value;

    let fieldType; // input, select, radio, file, checkbox
    let inputType; // input[number, search etc]
    switch (type) {
      case FIELD_TYPES.NUMBER:
        fieldType = FIELD_TYPES.INPUT;
        inputType = 'number';
        break;
      case FIELD_TYPES.EMAIL:
        fieldType = FIELD_TYPES.INPUT;
        inputType = 'email';
        break;
      default:
        fieldType = type;
        break;
    }

    const fieldConfig: FormlyFieldConfig = {
      type: fieldType,
      key,
      templateOptions: {
        label,
        placeholder,
        options,
        required,
        type: inputType,
        defaultValue
      }
    };

    this.onClose(fieldConfig);
  }


  onClose(res: boolean | FormlyFieldConfig = false): void {
    this.dialogRef.close(res);
  }


}
