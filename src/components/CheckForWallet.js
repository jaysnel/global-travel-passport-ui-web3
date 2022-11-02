import React from 'react'
import LoadingIcon from './LoadingIcon';
import Button from './Button';

export default function CheckForWallet(props) {
    const { isCheckingForWallet, walletConnected } = props;

    if(isCheckingForWallet) {
        return (
            <div>
                <h3>Checking For Wallet</h3>
                <LoadingIcon />
            </div>
        )
    }

    if(!walletConnected) {
        return (
            <div className='m-auto text-center w-80'>
                <h3>Wallet doesnt seem to be connected</h3>
                <Button buttonText='Connect Wallet' buttonClassNames='bg-cyan-500'/>
            </div>
        )
    }

    return (
        <>
        </>
    )
}
