"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export default function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div className="flex-1 px-4 py-4 md:px-8 flex flex-col gap-y-4">
    <DataTable data={data} columns={columns} />

    {data.length === 0 && (
      <EmptyState
        title="Create your first agent"
        descripiton="Create an agent to join our meetings. Each agent will follow your instructions and can interact with participants during the call."
      />
    )}
  </div>;
}

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      descripiton="This may be take a seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      descripiton="Something went wrong"
    />
  );
};
