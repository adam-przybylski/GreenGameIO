import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import Input from "../../../components/fields/Input.tsx";
import Button from "../../../components/Button.tsx";
import {api} from "../../../api/api.config.ts";
import { toast } from "react-toastify";


const ResetPasswordEmail : FC = () => {
    const methods = useForm<{email: string}>({
        values: {
            email: "",
        },
    });
    const { handleSubmit } = methods;
    const navigation = useNavigate();
    const [submitting, setSubmitting ] = useState(false)

    const onSubmit = handleSubmit((values) => {
        setSubmitting(true);
        api.post('/authentication/reset-password', values)
            .then(response => {
                console.log(response.data.data);
                toast.success("Email został wysłany")
                setSubmitting(false);
                navigation("/login");
            })
            .catch(error => {
                toast.error(error.response.data)
                setSubmitting(false);
                console.error(error);
            })
    });


    return (
        <>
            <p className="font-sans text-xl italic font-medium mt-28 text-center">Zmiana hasła</p>
            <div className="flex justify-center">
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit} className="pt-[50px] w-[60%]">
                        <Input type={"email"} label="Email: " placeholder="Podaj email" name="email"/>
                        <div className="flex justify-center">
                            <Button disabled={submitting} type="submit" label={submitting ? "Wysyłanie...": "Wyślij email"}
                                    className="bg-nice-green w-full mt-6 h-9 rounded-md font-medium disabled:bg-gray-500"/>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export default ResetPasswordEmail