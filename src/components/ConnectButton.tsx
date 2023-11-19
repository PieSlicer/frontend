import { useEffect, useState } from 'react';
import { Button, Profile, DotGridSVG, ExitSVG, WalletSVG } from '@ensdomains/thorin';

import { Connector, useConnect, useAccount, useDisconnect } from "wagmi";
import { fetchBalance } from '@wagmi/core';
import { formatSCAddress } from '@/utils/scUtils';

import { nounsURL } from '@/hooks/profilePicture';

export default function ConnectButton() {
  const { connect, connectors, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const connector = connectors[0] as Connector;
  const [ balance, setBalance ] = useState<string>();

  useEffect(() => {
    if (address) {
      int();
    }
  }, [address]);

  async function int() {
    const balance = await fetchBalance({
      address: formatSCAddress(address),
    })
    setBalance(balance.formatted.slice(0, 4));
  }

  function redirectToUserPage() {
    window.location.href = '/user';
  }

  const UserProfile = () => {
    return (
    <Profile
    address={address?.toString() as string}
    avatar={nounsURL}
    dropdownItems={[
      {
        label: `${balance} ETH`,
        icon: <WalletSVG />,
      },
      {
        label: 'Dashboard',
        onClick: () => redirectToUserPage(),
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
    )
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