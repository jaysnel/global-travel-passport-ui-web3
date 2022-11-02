import React from 'react'
import Spinner from './Spinner'

export default function LoadingIcon() {
  return (
    <Spinner height={60} width={60} className='animate-spin' />
  )
}
