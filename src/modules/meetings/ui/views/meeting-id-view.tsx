"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import MeetingIdViewHeader from "../components/meeting-id-view-header";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateMeetingDialog from "../components/update-meeting-dialog";

type Props = {
  meetingId: string;
}

export default function MeetingIdView({ meetingId }: Props) {
  const router = useRouter();
  const trpc = useTRPC();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    removeMeeting.mutate({ id: meetingId })
  }

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      descripiton="This may be take a seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      descripiton="Something went wrong"
    />
  );
};