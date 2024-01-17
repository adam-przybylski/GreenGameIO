import { FC, useEffect, useState } from "react";
import { SchedulerSettings } from "../../types/SchedulerSettings";
import { api } from "../../api/api.config";
import { Dialog } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import Checkbox from "../fields/Checkbox";
import Input from "../fields/Input";
import Button from "../Button";

interface Props {
  reset: () => void;
  id: number;
}

type SchedulerSettingsUpdate = {
  active: boolean;
  time?: Date;
  infinite: boolean;
  repeat?: number;
};

const NotificationSettingsModal: FC<Props> = ({ reset, id }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<SchedulerSettings>();

  useEffect(() => {
    api.get(`/scheduler/settings/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  console.log(data);

  const methods = useForm<SchedulerSettingsUpdate>({
    values: {
      active: data?.active ?? true,
      time: data?.time ?? undefined,
      infinite: data?.infinite ?? true,
      repeat: data?.repeat || undefined,
    },
  });

  const onSubmit = methods.handleSubmit((values) => {
    console.log(values);
    api.put(`/scheduler/settings/${id}`, values);
    setIsOpen(false);
  });

  const formValues = methods.watch();

  return (
    <>
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
          <Dialog.Panel
            className="w-full max-w-sm rounded bg-white shadow-md"
            aria-hidden="true"
          >
            <Dialog.Title className="border-b-[1px] border-gray-400 p-4 font-bold">
              Ustawienia schedulera
            </Dialog.Title>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <Checkbox name="active" label="Powiadomienie aktywne" />
                  </div>
                  {formValues.active && (
                    <>
                      <div>
                        <Input type="datetime-local" name="time" label="Czas" />
                      </div>
                      <div>
                        <Checkbox name="infinite" label="Czy nieskończone" />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="repeat"
                          label="Powtórzenia"
                          disabled={formValues.infinite}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex border-t p-4 justify-end">
                  <Button
                    className="bg-nice-green p-1 rounded text-white mr-1 hover:text-black ease-in-out duration-100"
                    type="submit"
                    label="Update"
                  />
                </div>
              </form>
            </FormProvider>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default NotificationSettingsModal;
