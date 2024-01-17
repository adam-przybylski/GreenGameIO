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
  isActive: boolean;
  time?: Date;
  isInfinite: boolean;
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
      isActive: data?.isActive ?? true,
      time: data?.time ?? undefined,
      isInfinite: data?.isInfinite ?? true,
      repeat: data?.repeat || undefined,
    },
  });

  const onSubmit = methods.handleSubmit((values) => {
    console.log(values);
    api.put(`/scheduler/settings/${id}`, values);
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
            <Dialog.Title>Ustawienia schedulera</Dialog.Title>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <Checkbox name="isActive" label="Powiadomienie aktywne" />
                  </div>
                  {formValues.isActive && (
                    <>
                      <div>
                        <Input type="datetime-local" name="time" label="Czas" />
                      </div>
                      <div>
                        <Checkbox name="isInfinite" label="Czy nieskończone" />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="repeat"
                          label="Powtórzenia"
                          disabled={formValues.isInfinite}
                        />
                      </div>
                    </>
                  )}
                </div>
                <Button type="submit" label="Update" />
              </form>
            </FormProvider>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default NotificationSettingsModal;
