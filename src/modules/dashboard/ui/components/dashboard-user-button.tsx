import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, ChevronUpIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";

export function DashboardUserButton() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in")
      }
    })
  }

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="bg-white/5 rounded-lg w-full flex items-center justify-between overflow-hidden border border-border/10 p-3 gap-2">
          {data.user.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="botttsNeutral"
              className="size-9 mr-3"
            />
          )}
          <ChevronUpIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.name}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant='outline'
              onClick={() => {}}
            >
              <CreditCardIcon className="size-4" />
              Billing
            </Button>
            <Button
              variant='outline'
              onClick={() => {}}
            >
              <LogOutIcon className="size-4" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white/5 rounded-lg w-full flex items-center justify-between overflow-hidden border border-border/10 p-3 gap-2">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="botttsNeutral"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">
            {data.user.name}
          </p>
          <p className="text-xs truncate w-full">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">
              {data.user.name}
            </span>
            <span className="text-sm font-medium text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="flex items-center justify-between cursor-pointer">
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
