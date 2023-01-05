import React from 'react';

export const TextField = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => {
  return <input {...props} ref={ref} />;
});
TextField.displayName = 'TextField';