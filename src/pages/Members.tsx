import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';

interface Member {
  id: number;
  name: string;
  email: string;
}

function Members(): JSX.Element {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log("Fetching members from API...");
        const response = await fetch('/api/members');
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const data = await response.json();
        setMembers(data);
      } catch (err: unknown) {
        console.error(err);
        Sentry.captureException(err);
        setError("Error fetching members");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div>Loading members...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Members</h2>
      <ul>
        {members.map(member => (
          <li key={member.id} className="mb-2">
            <strong>{member.name}</strong> ({member.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;