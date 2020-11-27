import { FormlyFieldConfig } from '@ngx-formly/core';
import { FIELD_TYPES } from '../enum/field-types.enum';

export const fcFields: FormlyFieldConfig[] = [
  {
    type: FIELD_TYPES.SELECT,
    key: 'type',
    templateOptions: {
      required: true,
      label: 'Select field type',
      placeholder: '',
      options: [
        {
          value: FIELD_TYPES.INPUT,
          label: 'Text input'
        },
        {
          value: FIELD_TYPES.NUMBER,
          label: 'Number input'
        },
        {
          value: FIELD_TYPES.EMAIL,
          label: 'Email input'
        },
        {
          value: FIELD_TYPES.FILE,
          label: 'File input'
        },
        {
          value: FIELD_TYPES.SELECT,
          label: 'Select dropdown'
        },
        {
          value: FIELD_TYPES.RADIO,
          label: 'Radio button'
        },
        {
          value: FIELD_TYPES.CHECKBOX,
          label: 'Checkbox button'
        },
        {
          value: FIELD_TYPES.TEXTAREA,
          label: 'Textarea field'
        },
      ],
    }
  },
  {
    key: 'options',
    type: 'repeat',
    templateOptions: {
      addText: 'Add option'
    },
    wrappers: ['panel'],

    fieldArray: {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          type: FIELD_TYPES.INPUT,
          key: 'label',
          className: 'col-6',
          templateOptions: {
            required: true,
            label: 'Label',
            placeholder: 'e.g. The third planet in the solar system'
          }
        },
        {
          type: FIELD_TYPES.INPUT,
          key: 'value',
          className: 'col-6',
          templateOptions: {
            required: false,
            label: 'Value',
            placeholder: 'e.g. earth'
          }
        }
      ]
    },
    hideExpression: (model: any, formState: any, field: FormlyFieldConfig | undefined) => {
      return field?.parent?.model.type !== FIELD_TYPES.SELECT && field?.parent?.model.type !== FIELD_TYPES.RADIO;
    }
  },
  {
    type: FIELD_TYPES.INPUT,
    key: 'key',
    templateOptions: {
      required: true,
      label: 'Field name',
      placeholder: 'e.g. name',
    },
    hideExpression: '!model.type'
  },
  {
    type: FIELD_TYPES.INPUT,
    key: 'label',
    templateOptions: {
      required: false,
      label: 'Field label',
      placeholder: 'e.g. Your full name',
    },
    hideExpression: '!model.key'
  },
  {
    type: FIELD_TYPES.INPUT,
    key: 'placeholder',
    templateOptions: {
      required: false,
      label: 'Field placeholder',
      placeholder: 'e.g. John Smith',
    },
    hideExpression: '!model.key'
  },
  {
    type: FIELD_TYPES.CHECKBOX,
    key: 'required',
    templateOptions: {
      required: false,
      label: 'Field is required',
    },
    hideExpression: '!model.type'
  },
];
