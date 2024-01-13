import { Dialog } from "@headlessui/react";
import { FC, useState } from "react";

interface Props {
    reset: () => void;
}

const AccountModal: FC<Props> = ({ reset }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Dialog open={isOpen} onClose={() => {
            setIsOpen(false);
            reset();
        }}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded bg-white shadow-md">
                    <Dialog.Title className="border-b-[1px] border-gray-400 p-4 font-bold">
                        Account
                    </Dialog.Title>
                    <div className="p-4">
                        <h1>Account</h1>
                    </div>
                    <div className="flex border-t-[1px] p-4 justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                reset();
                            }}
                            className="text-white bg-green-500 px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default AccountModal;