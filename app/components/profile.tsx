import Image from "next/image";
import EmptyProfilePic from "../../public/assets/images/emptyprofile.png";
import { LuPencil } from "react-icons/lu";

interface UserProfileProps {
  name: string;
  email: string;
  bio: string | null;
  image: string | null;
}

const ProfileCard = ({ name, email, bio, image }: UserProfileProps) => {
  return (
    <div className="items-center justify-center flex flex-col">
      <div className="flex flex-col px-3 py-3 my-3 mx-3">
        {/* Conditional rendering using ternary operator for Image from Next.js */}
        <div
          className="mx-auto bg-gradient-to-b rounded-full
          w-60 h-60 relative overflow-hidden mt-5 mb-16 md:h-96 md:w-96"
        >
          {image ? (
            <Image
              src={image}
              alt="Profile"
              layout="fill" // Fill the container
              objectFit="cover" // Crop the image if necessary to cover the whole container
              priority={true} // Optional: Optimizes the image loading
            />
          ) : (
            <Image
              src={EmptyProfilePic} // Placeholder image
              alt="No Image Available"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        {/* Displaying name, email, and bio */}
        <div className="flex justify-between rounded-xl border border-eggplant px-3 py-3 shadow-lg items-center">
          <div className="text-left ">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm">{email}</p>
            <p className="text-sm">{bio || "No bio available"}</p>
          </div>
          <LuPencil />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
