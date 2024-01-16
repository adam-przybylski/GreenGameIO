import { Dialog } from "@headlessui/react";
import { FC, useState } from "react";
import Button from "../Button";
import { AccountType } from "../../types/accountType";
import Input from "../fields/Input";
import { FormProvider, useForm } from "react-hook-form";
import { api } from "../../api/api.config";
import { logoutUser } from "../../api/logout";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/userContext";

interface Props {
    reset: () => void;
}

interface errorType {
    response: {
        data: string;
    };
}

const AccountModal: FC<Props> = ({ reset }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { account } = useUserContext();

    const methods = useForm<AccountType>({
        values: {
            id: account?.id || '',
            username: account?.username || '',
            email: account?.email || '',
            type: account?.type,
        },
    });

    const { handleSubmit } = methods;

    const onsubmit = handleSubmit(async (values) => {
        try {
            await api.patch("users/id/" + account?.id, { username: values.username });
            logoutUser();
            setIsOpen(false);
            reset();
        } catch (error) {
            toast.error((error as errorType).response.data);
        }
    });

    const deleteAccount = async () => {
        await api.delete("users/username/" + account?.username).then(
            (() => {
                toast.success("Konto nieaktywne");
            }),
            (error => {
                toast.error(error.response.data)
            })
        );
        logoutUser();
        setIsOpen(false);
        reset();
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
                        {account?.username}
                    </Dialog.Title>
                    <div className="p-4">
                        <FormProvider {...methods}>
                            <form onSubmit={onsubmit}>
                                <Input label="Nazwa użytkownika" name="username" />
                                <div className="flex justify-around">
                                    <Button
                                        type="submit"
                                        className="text-white bg-green-500 px-4 py-2 rounded"
                                        label="Zapisz"
                                    />
                                    {account?.type === "USER" && <Button
                                        onClick={deleteAccount}
                                        className="text-white bg-red-500 px-4 py-2 rounded"
                                        label="Dezaktywuj konto"
                                    />}
                                    <Button
                                        onClick={() => {
                                            setIsOpen(false);
                                            reset();
                                        }}
                                        className="text-white bg-green-500 px-4 py-2 rounded"
                                        label="Zamknij"
                                    />
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default AccountModal;