import React, { InputHTMLAttributes } from 'react';

export interface UIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
  shadow?: boolean;
  onType?: (e: string) => void;
}

const UIInput = React.forwardRef<HTMLInputElement, UIInputProps>(
  (
    { onType, className, labelKey, labelClassName, name, errorKey, type, placeholderKey, inputClassName, ...rest },
    ref,
  ) => {
    return (
      <div className={`form-group ${className || 'block'}`}>
        {labelKey && (
          <label className={labelClassName} htmlFor={name}>
            {labelKey}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type || 'text'}
          ref={ref}
          placeholder={placeholderKey}
          className={`form-control border ${inputClassName || ''}`}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={errorKey ? 'true' : 'false'}
          onChange={e => {
            onType(e.target.value);
          }}
          {...rest}
        />
        {errorKey && (
          <div id={`${name}Feedback`} className="invalid-feedback d-block">
            {errorKey}
          </div>
        )}
      </div>
    );
  },
);

export { UIInput };
