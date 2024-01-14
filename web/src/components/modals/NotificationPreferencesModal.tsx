import { FC, useEffect, useState } from "react";
import { UserPreferences } from "../../types/UserPreferences";
import { api } from "../../api/api.config";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import Button from "../Button";
import Checkbox from "../fields/Checkbox";

interface Props {
  reset: () => void;
}

const NotificationPreferencesModal: FC<Props> = ({ reset }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<UserPreferences>();

  useEffect(() => {
    api.get("/user/preferences").then((res) => {
      setData(res.data);
    });
  }, []);

  const methods = useForm<UserPreferences>({
    values: {
      getPopUpNotification: data?.getPopUpNotification || true,
      getEmailNotification: data?.getEmailNotification || true,
      getEventNotification: data?.getEventNotification || true,
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    setIsOpen(false);
    reset();
  });

  return (
    <>
      {data && (
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
                Preferencje powiadomień
              </Dialog.Title>
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <Checkbox
                        name="getPopUpNotification"
                        label="Dostawaj powiadomienia popup"
                      />
                    </div>
                    <div>
                      <Checkbox
                        name="getEmailNotification"
                        label="Dostawaj powiadomienia email"
                      />
                    </div>
                    <div>
                      <Checkbox
                        name="getEventNotification"
                        label="Dostawaj powiadomienia o wydarzeniach"
                      />
                    </div>
                  </div>
                  <div className="flex border-t-[1px] p-4 justify-end">
                    <Button
                      type="submit"
                      label="Zaktualizuj"
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
      )}
    </>
  );
};

export default NotificationPreferencesModal;
