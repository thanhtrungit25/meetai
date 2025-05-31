import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import MeetingsView, { MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/views/meetings-view";
import MeetingsListHeader from "@/modules/meetings/ui/components/meetings-list-header";

import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/modules/meetings/params";

type Props = {
  searchParams: Promise<SearchParams>;
}

export default async function MeetingsPage({
  searchParams
}: Props) {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};