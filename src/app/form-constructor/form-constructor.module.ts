import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormConstructorComponent } from './form-constructor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FcFieldAddDialogComponent } from './fc-field-add-dialog/fc-field-add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { RepeatTypeComponent } from './components/repeat-section.type';
import { PanelWrapperComponent } from './components/panel-wrapper.component';
import { FormlyFieldFile } from './components/file-type.component';
import { FileValueAccessor } from './directives/file-value-accessor';
import { FileFieldWrapperComponent } from './components/file-field-wrapper.component';

@NgModule({
  declarations: [
    FormConstructorComponent,
    FcFieldAddDialogComponent,
    RepeatTypeComponent,
    PanelWrapperComponent,
    FormlyFieldFile,
    FileValueAccessor,
    FileFieldWrapperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'file', component: FormlyFieldFile, wrappers: ['file-field'] },
      ],
      wrappers: [
        { name: 'panel', component: PanelWrapperComponent },
        { name: 'file-field', component: FileFieldWrapperComponent },
      ],
    }),
    FormlyMaterialModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [FormConstructorComponent],
  entryComponents: [FcFieldAddDialogComponent]
})
export class FormConstructorModule { }
