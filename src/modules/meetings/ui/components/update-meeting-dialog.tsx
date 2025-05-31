import { MeetingGetOne } from "../../types";

import ResponsiveDialog from "@/components/responsive-dialog";
import MeetingForm from "./meeting-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
};

export default function UpdateMeetingDialog({
  open,
  onOpenChange,
  initialValues,
}: Props) {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
