'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export default function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      descripiton="This may be take a seconds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      descripiton="Something went wrong"
    />
  );
};
