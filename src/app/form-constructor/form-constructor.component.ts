import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit, Output, ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { FcFieldAddDialogComponent } from './fc-field-add-dialog/fc-field-add-dialog.component';


/*
  // Field Example structure
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email address',
      placeholder: 'Enter email',
      required: true,
    }
  };
*/

@Component({
  selector: 'app-form-constructor',
  templateUrl: './form-constructor.component.html',
  styleUrls: ['./form-constructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormConstructorComponent implements OnDestroy {
  form = new FormGroup({});
  model: { [key: string]: any } = {};
  subscription = new Subscription();

  fields: FormlyFieldConfig[] = [];

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSave = new EventEmitter();

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  onSubmit(): void {
    const fieldsToSave = this.fields.map(field => {
      const {
        key,
        type,
        templateOptions,
        defaultValue
      } = field;
      return {
        key, type, templateOptions: {
          label: templateOptions?.label,
          placeholder: templateOptions?.placeholder,
          required: templateOptions?.required,
          options: templateOptions?.options,
          attributes: templateOptions?.attributes
        },
        defaultValue,
      };
    });
    this.onSave.emit(fieldsToSave);
  }

  onFieldAdd(): void {
    this.subscription.add(
      this.dialog.open(
        FcFieldAddDialogComponent,
        {
          width: '600px',
          data: this.fields
        }
      ).afterClosed().pipe(
        filter(res => !!res),
        tap(res => this.addField(res))
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private addField(field: FormlyFieldConfig): void {
    console.log(field);
    this.fields = [field, ...this.fields];
    // const key: any = field.key;
    // this.model[key] = field?.defaultValue;
    this.cdRef.detectChanges();
  }

}
