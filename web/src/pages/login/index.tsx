import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/fields/Input";
import Button from "../../components/Button";

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
    <div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Input label="Login" name="login" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" label="Login" />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
