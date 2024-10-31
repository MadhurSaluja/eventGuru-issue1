import CategoryFilter from "@/components/shared/FilterCategory";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Collection from "@/components/shared/Collection";
import { auth } from '@clerk/nextjs/server'
import Link from "next/link";
import Image from "next/image";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const { userId }: { userId: string | null } = auth();

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
      <section className="md:my-10 my-9 lg:mx-40 mx-10">
        <div className="flex gap-12 lg:flex-row flex-col">
          <div>
            <h1 className="text-4xl md:text-5xl md:mt-6 font-bold">
              Create, Organize, Host and Manage Events with EventGuru
            </h1>
            <p className="mt-4">
              EventGuru is a platform for creating, organizing, hosting, and
              managing events. Sign up today and start planning your next event
              with EventGuru!
            </p>

            <div className="mt-4">
              <Button
                variant="default"
                className="w-full md:w-auto transition-all duration-200"
                size="lg"
              >
                <Link href={userId? '/events/create' : '/sign-in'}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
          <div className="text-black -z-10">
            <Image
              className="rounded-lg object-contain max-h-[70vh] skew-y-6 origin-left"
              src="/hero-1.jpg"
              alt="A Banner Image"
              width={1100}
              height={1100}
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <Separator className="mt-24" />
      <section className="md:my-6 my-5 lg:mx-40 mx-10">
        <div className="text-center">
          <h3 className="font-bold text-2xl">Some Hosted Events</h3>
        </div>
        <div className="flex w-full flex-col gap-5 md:flex-row items-center">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data} // Ensure events.data contains unique identifiers
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />

      </section>
      <Separator />
    </>
  );
}
