import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/fields/Input";
import Button from "../../components/Button";
import spring_logo from "../../assets/spring-logo.png"

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
    console.log(values);
  });

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex w-[70vw] h-[80vh] shadow-large-shadow">
        <div className="bg-nice-green h-[100%] w-[40%]">
          <img src={spring_logo} alt="GreenGameIO" className="w-[55%] ml-auto mr-auto pt-[15%]" />
          <p className="font-sans text-3xl italic font-medium mt-7 text-center">GreenGameIO</p>
        </div>

        <div className="bg-white h-[100%] w-[60%] pt-40">
          <p className="font-sans text-xl italic font-medium mt-7 text-center">Logowanie</p>
          <div className="flex justify-center">
            <FormProvider {...methods}>
              <form onSubmit={onSubmit} className="pt-[50px] w-[60%]">
                <Input label="Login: " placeholder="Podaj hasło" name="login" />
                <Input label="Hasło: " placeholder="Podaj login" name="password" type="password" />
                <div className="flex justify-center">
                  <Button type="submit" label="Zaloguj się" className="bg-nice-green w-full mt-6 h-9 rounded-md font-medium" />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
