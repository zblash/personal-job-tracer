import React, { InputHTMLAttributes } from 'react';

interface UIButtonProps {
  border?: string;
  color?: string;
  height?: string;
  onClick: () => void;
  radius?: string;
  width?: string;
  disabled?: boolean;
  className?: string;
}
const UIButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<UIButtonProps>>((props, btnRef) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.className}
      ref={btnRef}
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
