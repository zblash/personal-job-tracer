/* eslint-disable react/button-has-type */
import React from 'react';

interface UIButtonProps {
  border?: string;
  height?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
const UIButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<UIButtonProps>>((props, btnRef) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`btn ${props.className || 'btn-primary'}`}
      ref={btnRef}
      type={props.type}
      style={{
        border: props.border,
        borderRadius: props.radius,
        height: props.height,
        width: props.width,
      }}
    >
      {props.children}
    </button>
  );
});

const _UIButton = React.memo(UIButton);

export { _UIButton as UIButton };
