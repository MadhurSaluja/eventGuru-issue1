import Collection from '@components/shared/Collection';
import { getAllEvents } from '@lib/actions/event.actions';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from 'react';

const MyEvents = async () => {
  // Fetch events created by the user
  const events = await getAllEvents({
    query: '',
    category: '',
    limit: 6,
    page: 1,
    userId:''
  });

  return (
    <section className="md:my-10 my-9 lg:mx-40 mx-10">
      <SignedIn>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          totalPages={events?.totalPages || 1}
        />
      </SignedIn>
      <SignedOut>
        <div>Please log in to view your events.</div>
      </SignedOut>
    </section>
  );
};

export default MyEvents;
