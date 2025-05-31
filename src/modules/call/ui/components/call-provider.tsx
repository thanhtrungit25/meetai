"use client";

import { LoaderIcon } from "lucide-react";

import { generatedAvatarUri } from "@/lib/avatar";
import { authClient } from "@/lib/auth-client";
import { CallConnect } from "./call-connect";

type Props = {
  meetingId: string;
  meetingName: string;
};

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generatedAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  );
};
