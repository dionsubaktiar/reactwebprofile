import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import InputForm from "@/app/components/input";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateUserModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [message, setMessage] = useState<string>("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2000/users", user);
      window.location.reload();
      setMessage(`User created: ${user.name}`);
      closeModal(); // Close modal on success
    } catch (error) {
      setMessage("Error creating user: " + error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create User
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="gap-4">
                    <InputForm
                      id="name"
                      type="text"
                      inputName="Name"
                      name="name"
                      placeholder="masukkan nama"
                      value={user.name}
                      onChangeValue={handleChange}
                    />
                    <InputForm
                      id="email"
                      type="email"
                      inputName="Email"
                      name="email"
                      placeholder="masukkan email"
                      value={user.email}
                      onChangeValue={handleChange}
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-customGreen-default border-2 border-customGreen-default text-honeyDew
                              hover:bg-transparent hover:text-customGreen-default dark:text-eggplant dark:bg-customGreen-light
                              dark:border-customGreen-light dark:hover:bg-transparent dark:hover:text-customGreen-light py-1 px-5 transition ease-linear duration-300"
                    >
                      Daftar
                    </button>
                  </div>
                </form>
                {message && <p>{message}</p>} {/* Success/Error Message */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateUserModal;
