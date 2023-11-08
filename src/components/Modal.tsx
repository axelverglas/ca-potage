"use client";

import { ReactNode, Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[10000] overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex md:items-center md:justify-center md:min-h-screen md:px-4 text-center w-screen h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full md:max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl md:rounded-bl-2xl md:rounded-tr-2xl">
              <div className="flex items-center border-b p-6">
                <Dialog.Title
                  as="h2"
                  className="font-bold text-xl flex-grow text-center"
                >
                  {title}
                </Dialog.Title>
                <button onClick={onClose} className="focus:outline-none">
                  <IoMdClose size={18} />
                </button>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
