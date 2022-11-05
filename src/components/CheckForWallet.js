import React from 'react'
import LoadingIcon from './LoadingIcon';
import Button from './Button';

export default function CheckForWallet(props) {
    const { isCheckingForWallet, walletConnected, checkIfWalletIsConnected, userMessage } = props;

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
            <div className='border border-solid border-cyan-400 p-5'>
                <h3 className='mb-5'>Wallet not connected or you do not have a wallet installed.</h3>
                <h3 className='mb-5'>If you do not have one installed, we recommend MetaMask.</h3>
                <p className='mb-5 text-red-600'>{userMessage}</p>
                <Button buttonText='Connect Wallet' buttonClassNames='bg-cyan-500' buttonFunction={checkIfWalletIsConnected}/>
            </div>
        )
    }

    return (
        <>
        </>
    )
}
