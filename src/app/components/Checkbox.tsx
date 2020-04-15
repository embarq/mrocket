import React from 'react';

import './Checkbox.css';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox(props: CheckboxProps) {
  return (
    <React.Fragment>
      <input onChange={props.onChange} checked={props.checked || false} type="checkbox" id={props.id} className="mrocket-checkbox-input" />
      <label htmlFor={props.id} className="mrocket-checkbox">
        <span className="gg-check mrocket-checkbox-icon"></span>
      </label>
    </React.Fragment>
  );
}

export default Checkbox;