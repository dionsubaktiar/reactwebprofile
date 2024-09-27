"use client";

import Image from "next/image";
// import Router from "next/router";
import EmptyProfilePic from "../../public/assets/images/emptyprofile.png";
import BasicModal from "./modal"; // Assuming BasicModal is your modal component
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
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
  // Open and close modal edit
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  //Open and close modal delete
  const [isDeleteOpen, setIsDelete] = useState(false);
  const openDelete = () => setIsDelete(true);
  const closeDelete = () => setIsDelete(false);

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

  //handle delete
  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:2000/users/${id}`);
      if (response.status === 200 || response.status === 204) {
        console.log(
          "User deleted successfully: ",
          response.status,
          response.data
        );
        window.location.href = `/users`;
        closeDelete();
      }
    } catch (error) {
      console.error("Error deleting user data:", error);
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
        <div className="flex justify-between rounded-xl border border-eggplant px-3 py-3 shadow-lg items-center dark:border-white">
          <div className="text-left">
            {/* <p>{id}</p> */}
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm">{email}</p>
            <p className="text-sm">{bio || "No bio available"}</p>
          </div>
          <div className="flex justify-between flex-col gap-3">
            <div className="border-2 rounded-lg px-2 py-1 border-eggplant dark:border-white">
              <LuPencil
                onClick={openModal}
                className="hover:animate-bounce cursor-pointer"
              />
            </div>
            <div className="border-2 rounded-lg px-2 py-1 border-eggplant dark:border-white">
              <LuTrash2
                className="hover:animate-bounce cursor-pointer"
                onClick={openDelete}
              ></LuTrash2>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Profile */}
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
      {/* Modal for Deleting Profile */}
      <BasicModal
        isOpen={isDeleteOpen}
        closeModal={closeDelete}
        modalTitle="Delete Profile"
        content={
          <div className="flex-col items-center">
            <Dialog.Description>
              are you sure you want to delete this user? <br />
              this action cannot be undone.
            </Dialog.Description>
            <form onSubmit={handleDeleteSubmit}>
              <button
                type="submit"
                className="bg-brandColor-mainRed border-2 border-brandColor-mainRed
                text-white hover:bg-transparent px-3 rounded-lg mt-3
                hover:border-brandColor-mainRed hover:text-brandColor-mainRed
                transition ease-in-out duration-300
                "
              >
                Delete
              </button>
            </form>
          </div>
        }
      ></BasicModal>
    </div>
  );
};

export default ProfileCard;
