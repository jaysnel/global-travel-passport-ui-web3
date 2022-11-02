import React from 'react'
import LoadingIcon from './LoadingIcon';
import Button from './Button';

export default function CheckForWallet(props) {
    const { isCheckingForWallet, walletConnected, checkIfWalletIsConnected } = props;

    if(isCheckingForWallet) {
        return (
            <div>
                <h3>Checking For Wallet</h3>
                <LoadingIcon classNames='m-auto mt-5' fill='rgb(34 211 238)'/>
            </div>
        )
    }

    if(!walletConnected) {
        return (
            <div>
                <h3>Wallet doesnt seem to be connected</h3>
                <Button buttonText='Connect Wallet' buttonClassNames='bg-cyan-500' buttonFunction={checkIfWalletIsConnected}/>
            </div>
        )
    }

    return (
        <>
        </>
    )
}
