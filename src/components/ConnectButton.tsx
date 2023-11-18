import React from 'react';
import { Button, Profile, DotGridSVG, ExitSVG } from '@ensdomains/thorin';

import { useAuth } from '@/components/auth';
import { nounsURL } from '@/hooks/profilePicture';
import { Spinner } from  '@ensdomains/thorin';

export default function ConnectButton() {
  const { isConnected, loading, smartWallet, eoa, email, picture, signInWithWeb3Auth, signOutWithWeb3Auth } = useAuth();

  const UserProfile = () => {
    const address = email || smartWallet || eoa as string;
    return <Profile
    address={address}
    indicatorColor={smartWallet ? "red" : "blue"}
    avatar={picture || nounsURL}
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

  if (loading) {
    return  <Spinner />
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