// app/users/[id]/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import ProfileCard from "@/app/components/profile";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  image: string | null;
}

const UserDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/users/${id}`);
        if (!response) {
          throw new Error("Network response was not ok");
        }
        setUser(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-eggplant dark:border-honeyDew"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="min-h-screen flex flex-col text-eggplant dark:text-honeyDew dark:bg-eggplant bg-honeyDew">
      <Navbar title="Profile" />
      <main className="flex flex-col px-10 font-poppins items-center justify-center">
        <section>
          <ProfileCard
            id={user.id}
            name={user.name}
            email={user.email}
            bio={user.bio}
            image={user.image}
          />
        </section>
      </main>
    </div>
  );
};

const UserPage = () => {
  return (
    <Suspense fallback={<div>Loading user details...</div>}>
      <UserDetails />
    </Suspense>
  );
};

export default UserPage;
