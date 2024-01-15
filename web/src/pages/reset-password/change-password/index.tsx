import {FC} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import Button from "../../../components/Button.tsx";
import {api} from "../../../api/api.config.ts";
import {toast} from "react-toastify";



const ChangePasswordMail : FC = () => {
    const {token} = useParams<{token: string}>();
    const methods = useForm({
        values: {
            newPassword: "",
            repeatPassword: "",
        },

    });
    const { handleSubmit, register, getValues , formState: {errors, isSubmitting}} = methods;
    const navigation = useNavigate();


    const onSubmit = handleSubmit((values) => {

        api.post(`/reset/password?token=${token}`, values)
            .then(response => {
                console.log(response.data.data);
                navigation("/login");
                toast.success("Hasło zostało zaktualizowane");
            })
            .catch(error => {
                toast.error(error.response.data);
                console.error(error);
            })
    });


    return (
        <>
            <p className="font-sans text-xl italic font-medium mt-28 text-center">Zmiana hasła</p>
            <div className="flex justify-center">
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit} className="pt-[50px] w-[60%]">
                        <div className="flex flex-col mb-5">
                            <label className="mb-2" htmlFor="newPassword">Now hasło</label>
                            <input {...register("newPassword")} type={"password"} placeholder="Podaj hasło"
                                   name="newPassword" className="border rounded-md h-9 pl-2 outline-nice-green"/>
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="mb-2" htmlFor="repeatPassword">Powtórz hasło:</label>
                            <input {...register("repeatPassword", {
                                validate: (value) => value === getValues("newPassword") || "Różne hasła",
                            })} type={"password"} placeholder="Powtórz hasło" name="repeatPassword" className="border rounded-md h-9 pl-2 outline-nice-green"/>
                            {errors.repeatPassword && (
                                <p className="text-red-500">{`${errors.repeatPassword.message}`}</p>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <Button disabled={isSubmitting} type="submit" label="Zmień hasło"
                                    className="bg-nice-green w-full mt-6 h-9 rounded-md font-medium"/>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export default ChangePasswordMail