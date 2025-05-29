import { Dispatch, SetStateAction } from "react";

import {
  CommandInput,
  CommandList,
  CommandItem,
  CommandResponsiveDialog,
} from "@/components/ui/command";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardCommand({ open, setOpen }: Props) {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
        <CommandItem>Test2</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
}
