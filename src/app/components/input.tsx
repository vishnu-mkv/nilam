import React, { ForwardedRef, forwardRef } from 'react'

const Input = forwardRef((props: {label?: string, type: string, placeholder: string, required:boolean}, 
  ref: ForwardedRef<HTMLInputElement>) => {
    let label = props.label;
    // delete props['label'];
    let id = 'form'+label?.replace(' ', '-').toLowerCase();
    return (<div>
      <input {...props} id={id} ref={ref}/>
      <label htmlFor={id}>{label}</label>
    </div>)
});

export default Input;