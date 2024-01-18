import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/fields/Input";
import Button from "../../components/Button";
import { RegisterRequest } from "../../types/registerRequest";
import { api } from "../../api/api.config.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage: FC = () => {

  const methods = useForm<RegisterRequest>({
    values: {
      email: "",
      login: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;
  const navigation = useNavigate();

  const onSubmit = handleSubmit((values) => {
    api.post('/authentication/register', values)
      .then(response => {
        toast.success("Utworzono konto");
        console.log(response);
        navigation("/login");
      },
        ((error => {
        toast.error(error.response.data);
        console.error(error);
      }))
      )
  });

  return (
    <>
      <p className="font-sans text-xl italic font-medium mt-20 text-center">Rejestracja</p>
      <div className="flex justify-center">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="pt-[50px] w-[60%]">
            <Input label="Email: " type="email" placeholder="Podaj email" name="email" />
            <Input label="Login: " placeholder="Podaj login" name="login" />
            <Input label="Hasło: " placeholder="Podaj hasło" name="password" type="password" />
            <div className="flex justify-center">
              <Button type="submit" label="Zarejestruj się" className="bg-nice-green w-full mt-6 h-9 rounded-md font-medium" />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

export default RegisterPage;