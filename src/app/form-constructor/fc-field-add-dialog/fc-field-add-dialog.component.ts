import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EMPTY, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { FIELD_TYPES } from '../enum/field-types.enum';
import { fcFields } from './fc-fields';


export interface IFormlySelectOptions { name: string; value: string | number; }

@Component({
  selector: 'app-fc-field-add-dialog',
  templateUrl: './fc-field-add-dialog.component.html',
  styleUrls: ['./fc-field-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FcFieldAddDialogComponent implements AfterViewInit {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = fcFields;
  subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<FcFieldAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public addedFields: FormlyFieldConfig[]
  ) { }

  ngAfterViewInit(): void {
    if (this.addedFields) {
      this.handleParentOptions();
    }
  }


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
      defaultValue,
      hasParentField,
      parentField,
      parentFieldOption
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
      },
      defaultValue
    };

    if (hasParentField && fieldConfig.templateOptions) {
      fieldConfig.templateOptions.attributes = {
        parentField,
        parentFieldOption
      };
    }

    this.onClose(fieldConfig);
  }


  onClose(res: boolean | FormlyFieldConfig = false): void {
    this.dialogRef.close(res);
  }

  private handleParentOptions(): void {
    const options = this.addedFields.map(addField => ({
      value: addField.key,
      label: addField.templateOptions?.label
    }));
    this.fields = this.fields.map(field => {
      if (field.key === 'parentField' && field.templateOptions) {
        field.templateOptions.options = options;
      }
      return field;
    });
  }



}
