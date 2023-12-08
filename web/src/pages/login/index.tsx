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
        <div className="bg-[#1aebb6] h-[100%] w-[40%]">
          <img src={spring_logo} alt="GreenGameIO" className="w-[55%] ml-auto mr-auto pt-[15%]" />
          <p className="font-sans text-3xl italic font-medium mt-7 text-center">GreenGameIO</p>
        </div>

        <div className="bg-white">
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <Input label="Login: " name="login" />
              <Input label="Haslo: " name="password" type="password" />
              <Button type="submit" label="Zaloguj sie" />
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
