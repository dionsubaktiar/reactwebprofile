"use client";

import Image from "next/image";
import EmptyProfilePic from "../../public/assets/images/emptyprofile.png";
import BasicModal from "./modal"; // Assuming BasicModal is your modal component
import { LuPencil } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";
import InputForm from "./input";

interface UserProfileProps {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  image: string | null;
}

const ProfileCard = ({ name, email, bio, image, id }: UserProfileProps) => {
  // Open and close modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // State to hold user data for editing
  const [user, setUser] = useState<UserProfileProps>({
    id,
    name,
    email,
    bio,
    image,
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log("Updated input field:", user);
  };

  //submit handler
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = user.id;

    try {
      console.log("Submitting data:", user);
      const response = await axios.put(
        `http://localhost:2000/users/${id}`,
        user
      );

      if (response.status === 200 || response.status === 204) {
        console.log("User updated successfully:", response.data);
        window.location.reload();
        closeModal(); // Only close modal after successful update
      } else {
        console.error("Failed to update user:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="items-center justify-center flex flex-col">
      <div className="flex flex-col px-3 py-3 my-3 mx-3">
        <div className="mx-auto bg-gradient-to-b rounded-full w-60 h-60 relative overflow-hidden mt-5 mb-16 md:h-96 md:w-96">
          {image ? (
            <Image
              src={image}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          ) : (
            <Image
              src={EmptyProfilePic}
              alt="No Image Available"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className="flex justify-between rounded-xl border border-eggplant px-3 py-3 shadow-lg items-center">
          <div className="text-left">
            {/* <p>{id}</p> */}
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm">{email}</p>
            <p className="text-sm">{bio || "No bio available"}</p>
          </div>
          <LuPencil onClick={openModal} />
        </div>
      </div>

      {/* Basic Modal for Editing Profile */}
      <BasicModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalTitle="Edit Profile"
        content={
          <form onSubmit={handleEditSubmit}>
            <div>
              <InputForm
                id="name"
                name="name"
                inputName="Nama"
                type="text"
                placeholder="masukkan nama"
                value={user.name}
                onChangeValue={handleChange}
              />
              <InputForm
                id="email"
                inputName="Email"
                type="email"
                name="email"
                placeholder="masukkan email"
                value={user.email}
                onChangeValue={handleChange}
              />
              <InputForm
                id="bio"
                inputName="Bio"
                type="text"
                name="bio"
                placeholder="masukkan bio"
                value={user.bio || ""}
                onChangeValue={handleChange}
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-customGreen-default border-2 border-customGreen-default text-honeyDew
              hover:bg-transparent hover:text-customGreen-default dark:text-eggplant dark:bg-customGreen-light
              dark:border-customGreen-light dark:hover:bg-transparent dark:hover:text-customGreen-light py-1 px-5 
              transition ease-linear duration-300 w-full"
            >
              Save changes
            </button>
          </form>
        }
      />
    </div>
  );
};

export default ProfileCard;
