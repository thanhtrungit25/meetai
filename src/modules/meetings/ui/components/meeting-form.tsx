import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { meetingsInsertSchema } from "../../schemas";
import { MeetingGetOne } from "../../types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import NewAgentDialog from "@/modules/agents/ui/components/new-agent-dialog";


type Props = {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
};

export default function MeetingForm({
  initialValues,
  onCancel,
  onSuccess,
}: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(trpc.agents.getMany.queryOptions({
    pageSize: 100,
    search: agentSearch
  }));

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({...values, id: initialValues.id })
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g Math Consulations" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      )
                    }))}
                    placeholder="Select Agent"
                    value={field.value}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Create a new agent
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
            {onCancel && (
              <Button
                variant="outline"
                disabled={isPending}
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isEdit ? "Upadate" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
