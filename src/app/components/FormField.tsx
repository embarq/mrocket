import React, { useState } from 'react';

import './FormField.css';

type ControlProps = {
  [key: string]: any;
}

function Control(props: ControlProps) {
  const { controlType, controlProps } = props;

  switch (controlType) {
    case 'textarea': return <textarea {...controlProps} />
    case 'select': return <select {...controlProps} />
    case 'input':
    default: return <input {...controlProps} />
  }
}

export interface FormFieldProps {
  id: string;
  /** @default 'text' */
  type?: string;
  controlType?: 'input' | 'textarea' | 'select';
  className?: string;
  tabIndex?: number;
  value?: any;
  label?: string;
  /** @default false */
  autoComplete?: boolean;
  placeholder?: string;
  /** @default false */
  disabled?: boolean;
  /** @default false */
  readonly?: boolean;  // TODO: implement
  hint?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  config?: Partial<FormFieldProps>;
}

function FormField(props: FormFieldProps) {
  const [controlValue, setControlValue] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isLabelActive, setLabelActive] = useState(false);

  const defaultProps: Partial<FormFieldProps> = {
    type: 'text',
    controlType: 'input',
    className: '',
    label: '',
    autoComplete: false,
    placeholder: '',
    disabled: false,
    readonly: false,
    hint: '',
    tabIndex: undefined,
    onChange: () => {},
    onKeyUp: () => {}
  }
  const finalProps: FormFieldProps = { ...defaultProps, ...props.config, ...props };

  if (isFirstRender) {
    setIsFirstRender(false);

    if (typeof finalProps.value === 'string' && finalProps.value.trim().length > 0) {
      setControlValue(finalProps.value);
    }
  }

  const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setControlValue(event.target.value);

    if (typeof finalProps.onChange === 'function') {
      finalProps.onChange(event);
    }
  }

  const handleFormFieldKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      (event.target as HTMLInputElement).blur();
    }

    if (typeof finalProps.onKeyUp === 'function') {
      finalProps.onKeyUp(event);
    }
  }

  const handleControlFocus = () => setLabelActive(true);
  const handleControlBlur = () => setLabelActive(false);

  const isEmptyField = controlValue.trim().length === 0;
  const controlProps = {
    type: finalProps.type,
    id: finalProps.id,
    autoComplete: finalProps.autoComplete ? 'on' : 'off',
    placeholder: finalProps.placeholder,
    className: `form-control ${ finalProps.className }`,
    disabled: finalProps.disabled,
    value: controlValue,
    tabIndex: finalProps.tabIndex,
    readOnly: finalProps.readonly,
    onChange: handleControlChange,
    onKeyUp: handleFormFieldKeyUp,
    onFocus: handleControlFocus,
    onBlur: handleControlBlur
  };

  return <React.Fragment>
    {
      finalProps.label
      && <label
          htmlFor={finalProps.id}
          className={isLabelActive ? 'active' : ''}>
          {finalProps.label}
        </label>
    }
    <Control controlType={finalProps.controlType} controlProps={controlProps} />
    {finalProps.hint && !isEmptyField && <small className="px-2 text-muted">{finalProps.hint}</small>}
  </React.Fragment>
}

export default FormField;