import { Profile } from "@ensdomains/thorin";
import { useEnsName, useEnsAvatar } from "wagmi";
import { formatSCAddress } from "@/utils/scUtils";
import { nounsURL } from "@/hooks/profilePicture";

export default function CustomProfile({ address }: { address: string }) {
  const { data: ens } = useEnsName({
    address: formatSCAddress(address),
  });
  const { data: avatar } = useEnsAvatar({
    name: ens,
  });

  return (
    <>
    <Profile
      address={address}
      avatar={avatar || nounsURL}
      ensName={ens || undefined}
    />
    </>
  );
}