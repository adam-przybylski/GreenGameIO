import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/fields/Input";
import Button from "../../components/Button";
import {request, setAuthHeader} from "../../api/api.config.ts";

interface LoginSchema {
  login: string;
  password: string;
}

const LoginPage: FC = () => {
  const methods = useForm<LoginSchema>({
    values: {
      login: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((values) => {

    request("POST", "api/v1/authentication/login", values).then(
        (response) => {
          setAuthHeader(response.data.token);
        }).catch(
        (error) => {
          setAuthHeader("");
          console.log(error);
        });
    console.log();
  });

  return (
    <>
      <p className="font-sans text-xl italic font-medium mt-7 text-center">Logowanie</p>
      <div className="flex justify-center">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="pt-[50px] w-[60%]">
            <Input label="Login: " placeholder="Podaj login" name="login" />
            <Input label="Hasło: " placeholder="Podaj hasło" name="password" type="password" />
            <div className="flex justify-center">
              <Button type="submit" label="Zaloguj się" className="bg-nice-green w-full mt-6 h-9 rounded-md font-medium" />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default LoginPage;
