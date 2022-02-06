import React from 'react';
import Select, { components } from 'react-select';
import { AiFillDownCircle } from 'react-icons/ai';
import { Colors } from '../../utils/colors';

export interface UISelectProps {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name?: string;
  errorKey?: string;
  value?: { value: any; label: string } | Array<{ value: any; label: string }>;
  options: Array<{ value: any; label: string }>;
  isSearchable?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  inputRef?: any;
  isDisabled?: boolean;
  onChange?: (s: { value: any; label: string } & Array<{ value: any; label: string }>) => void;
}
const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <AiFillDownCircle color={Colors.secondary} />
    </components.DropdownIndicator>
  );
};
function UISelect(props: UISelectProps) {
  return (
    <div className={`form-group ${props.className}`}>
      {props.labelKey && (
        <label className={props.labelClassName} htmlFor={props.name}>
          {props.labelKey}
        </label>
      )}
      <Select
        options={props.options}
        placeholder={props.placeholderKey}
        value={props.value}
        className={`${props.inputClassName || ''}`}
        components={{ DropdownIndicator }}
        onChange={props.onChange}
        isSearchable={props.isSearchable}
        isMulti={props.isMulti}
        isClearable={props.isClearable}
        inputRef={props.inputRef}
        name={props.name}
        isDisabled={props.isDisabled}
      />
      {props.errorKey && (
        <div id={`${props.name}Feedback`} className="invalid-feedback d-block">
          {props.errorKey}
        </div>
      )}
    </div>
  );
}

const _UISelect = React.memo(UISelect);

export { _UISelect as UISelect };
