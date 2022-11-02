import React from 'react'
import LoadingIcon from './LoadingIcon';

export default function CheckForWallet(props) {
    const { isCheckingForWallet } = props;
  return (
    <div>
        <h3>Checking For Wallet</h3>
        <LoadingIcon />
    </div>
  )
}
