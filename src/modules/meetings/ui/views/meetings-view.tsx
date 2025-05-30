'use client';

import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { columns } from "../components/columns";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import DataPagination from "@/components/data-pagination";

export default function MeetingsView() {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsFilters();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }));

  return (
    <div className="flex-1 px-4 pb-4 md:px-8 flex flex-col gap-y-5">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          descripiton="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time"
        />
      )}
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
