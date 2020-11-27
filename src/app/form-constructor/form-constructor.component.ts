import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
export class FormConstructorComponent implements OnInit, AfterViewInit, OnDestroy {
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.form.get('email'));
  }

  onSubmit(): void {
    this.onSave.emit(this.model);
  }

  onFieldAdd(): void {
    this.subscription.add(
      this.dialog.open(
        FcFieldAddDialogComponent,
        {
          width: '600px'
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
    this.fields = [field, ...this.fields];
    const key: any = field.key;
    this.model[key] = field?.defaultValue;
    this.cdRef.detectChanges();
    console.log(this.fields);
  }

}
