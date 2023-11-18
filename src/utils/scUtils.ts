import { getAddress } from 'viem';

export function formatSCAddress(address: string | undefined): `0x${string}` {
  return address ? getAddress(address) : `0x${'0'.repeat(40)}`;
}