import { Dispatch, SetStateAction } from "react";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardCommand({ open, setOpen }: Props) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandDialog>
  );
}
