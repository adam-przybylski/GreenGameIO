import { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../Button";
import { Notification } from "../../types/Notification";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../fields/Input";
import { api } from "../../api/api.config";

interface Props {
  notification: Notification;
  reset: () => void;
}

const NotificationModal: FC<Props> = ({ notification, reset }) => {
  const [isOpen, setIsOpen] = useState(true);

  const methods = useForm<Notification>({
    values: {
      id: notification.id,
      title: notification.title,
      content: notification.content,
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((values) => {
    api.put("/notifications", values).catch((error) => {
      console.log(error);
    });
  });

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        reset();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white shadow-md">
          <Dialog.Title className="border-b-[1px] border-gray-400 p-4 font-bold">
            Edytuj powiadomienie
          </Dialog.Title>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="p-4">
                <Input label="ID" name="id" disabled />
                <Input label="Tytuł: " placeholder="title" name="title" />
                <Input label="Opis: " placeholder="content" name="content" />
              </div>
              <div className="flex border-t-[1px] p-4 justify-end">
                <Button
                  type="submit"
                  label="Aktualizuj"
                  className="bg-nice-green p-1 rounded text-white mr-1 hover:text-black ease-in-out duration-100"
                />
                <Button
                  className="bg-slate-500 p-1 rounded text-white hover:text-black ease-in-out duration-100"
                  label="Anuluj"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                />
              </div>
            </form>
          </FormProvider>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default NotificationModal;
