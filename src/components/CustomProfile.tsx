import { Profile } from "@ensdomains/thorin";
import { useEnsName, useEnsAvatar } from "wagmi";
import { formatSCAddress } from "@/utils/scUtils";
import useNounsPicture from "@/hooks/profilePicture";

export default function CustomProfile({ address }: { address: string }) {
  const svg = useNounsPicture();
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
        avatar={avatar || `data:image/svg+xml,${encodeURIComponent(svg as string)}`}
        ensName={ens || undefined}
      />
    </>
  );
}