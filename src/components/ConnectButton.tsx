import React from 'react';
import { Button, Profile, DotGridSVG, ExitSVG } from '@ensdomains/thorin';

import { Connector, useConnect, useAccount, useDisconnect } from "wagmi";

import { nounsURL } from '@/hooks/profilePicture';

export default function ConnectButton() {
  const { connect, connectors, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const connector = connectors[0] as Connector;

  const UserProfile = () => {
    return <Profile
    address={address?.toString() as string}
    avatar={nounsURL}
    dropdownItems={[
      {
        label: 'Dashboard',
        onClick: () => null,
        icon: <DotGridSVG />,
        showIndicator: true,
      },
      {
        label: 'Disconnect',
        onClick: () => disconnect(),
        color: 'red',
        icon: <ExitSVG />,
      },
    ]}
    />
  }

  return (
    <>
      {
        (isConnected && address) ?
        <UserProfile /> : 
        <Button onClick={() => {
          connect({ connector });
        }}> Sign In </Button>
      }
    </>
  );
}