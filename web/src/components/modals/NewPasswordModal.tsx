import { Dialog } from "@headlessui/react";
import { FC, useState } from "react";
import { api } from "../../api/api.config";
import {toast} from "react-toastify";

interface Props {
    reset: () => void;
    id: string;
}

const NewPasswordModal: FC<Props> = ({ reset, id }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState<string>('');

    const handleUpdatePassword = async (id: string, password: string) => {
        try {
            await api.patch(`/users/id/${id}/password`, { password: password }).then(
                ( () => {
                    toast.success("hasło zostało zmienione");
                }),
                (() => {
                    toast.error("błąd");
                }));
        } catch (error) {
            console.error(error);
        }
    }


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
                        <form>
                            <input
                                className="border border-gray-400 rounded p-2 w-full mb-4"
                                type="password"
                                placeholder="Nowe hasło"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-around">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white rounded p-2"
                                    onClick={() => {
                                        handleUpdatePassword(id, password);
                                        setIsOpen(false);
                                        reset();
                                    }}
                                >
                                    Zmień hasło
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white rounded p-2"
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        reset();
                                    }}
                                >
                                    Anuluj
                                </button>
                            </div>
                        </form>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default NewPasswordModal;