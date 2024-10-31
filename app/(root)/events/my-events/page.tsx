import Collection from '@components/shared/Collection';
import { getAllEvents } from '@lib/actions/event.actions';
import { useUser } from '@clerk/nextjs';
import React from 'react';

const MyEvents = async () => {
  const { user } = useUser();

  if (!user) {
    return <div>Please log in to view your events.</div>;
  }

  const userId = user.id; // Get the Clerk user ID
  
  // Pass all required parameters with default values for optional fields
  const events = await getAllEvents({ 
    userId, 
    query: '',           // Default empty string for query
    category: '',        // Default empty string for category
    limit: 6,            // Default limit
    page: 1              // Default page
  });

  return (
    <section className="md:my-10 my-9 lg:mx-40 mx-10">
      <Collection
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Create your first event to see it listed here."
        collectionType="Events_Organized"
        limit={6}
        page={1}
        totalPages={events?.totalPages || 1}
      />
    </section>
  );
};

export default MyEvents;
