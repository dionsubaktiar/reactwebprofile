"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import UserCard from "../components/userCard";
import CreateUserButton from "../components/createButton";
import axios from "axios";

const profileUrl = "http://localhost:2000/users";

interface User {
  id: string;
  name: string;
  email: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      axios.get(profileUrl).then((response) => {
        setUsers(response.data);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Initial fetch
    const intervalId = setInterval(fetchUsers, 2000); // Refresh every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  if (loading)
    return (
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
    );

  return (
    <div className="min-h-screen flex flex-col text-eggplant dark:text-honeyDew dark:bg-eggplant bg-honeyDew">
      <Navbar title="User" />
      <main className="flex flex-col px-10 font-poppins">
        <section>
          {users.map((user) => (
            <UserCard
              name={user.name}
              key={user.id}
              email={user.email}
              id={user.id}
            />
          ))}
        </section>
        <section>
          <div>
            <CreateUserButton></CreateUserButton>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserPage;
