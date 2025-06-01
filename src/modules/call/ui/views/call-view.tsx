"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { CallProvider } from "../components/call-provider";

type Props = {
  meetingId: string
}

export default function CallView({
  meetingId
}: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-between">
        <ErrorState
          title="Meeting has ended"
          descripiton="You can no longer join this meeting"
        />
      </div>
    );
  }

  return (
    <CallProvider meetingId={meetingId} meetingName={data.name} />
  );
};

export const CallViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      descripiton="This may be take a seconds"
    />
  );
};

export const CallViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      descripiton="Something went wrong"
    />
  );
};