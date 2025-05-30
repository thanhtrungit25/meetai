"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import DataPagination from "../components/data-pagination";

export default function AgentsView() {
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));

  return <div className="flex-1 px-4 py-4 md:px-8 flex flex-col gap-y-4">
    <DataTable data={data.items} columns={columns} />
    <DataPagination
      page={filters.page}
      totalPages={data.totalPages}
      onPageChange={(page) => setFilters({ page })}
    />

    {data.items.length === 0 && (
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
