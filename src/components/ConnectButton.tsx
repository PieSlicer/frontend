import React from 'react';
import { Button, Profile, DotGridSVG, ExitSVG } from '@ensdomains/thorin';

import { useAuth } from '@/components/auth';

export default function ConnectButton() {
  const { isConnected, smartWallet, eoa, email, signInWithWeb3Auth, signOutWithWeb3Auth } = useAuth();

  const UserProfile = () => {
    const address = email || smartWallet || eoa as string;
    return <Profile
    address={address}
    indicatorColor={smartWallet ? "red" : "blue"}
    dropdownItems={[
      {
        label: 'Dashboard',
        onClick: () => null,
        icon: <DotGridSVG />,
        showIndicator: true,
      },
      {
        label: 'Disconnect',
        onClick: () => signOutWithWeb3Auth(),
        color: 'red',
        icon: <ExitSVG />,
      },
    ]}
    />
  }

  return (
    <>
      {
        isConnected && (smartWallet || eoa) ?
        <UserProfile /> : 
        <Button onClick={signInWithWeb3Auth}> Sign In </Button>
      }
    </>
  );
}