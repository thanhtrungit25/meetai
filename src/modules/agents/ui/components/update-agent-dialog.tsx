import { AgentGetOne } from "../../types";

import ResponsiveDialog from "@/components/responsive-dialog";
import AgentForm from "./agent-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
};

export default function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: Props) {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
