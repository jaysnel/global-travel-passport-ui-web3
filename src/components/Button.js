import React from 'react'

export default function Button(props) {
    const { buttonText, buttonClassNames, buttonFunction } = props;
  return (
    <button 
    type='submit'
    aria-label={buttonText}
    className={`${buttonClassNames} w-full`}
    onClick={() => buttonFunction ? buttonFunction() : undefined}>{buttonText}</button>
  )
}
