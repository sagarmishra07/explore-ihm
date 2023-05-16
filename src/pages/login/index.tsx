import {useState} from "react";
import {Button, Divider, Group, PasswordInput, TextInput,} from "@mantine/core";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
// import { APILoginUser } from "../../api/authAPI";
import {useRouter} from "next/router";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/firebase/firebase";
import showNotify from "@/utils/notify";

type LoginFormDataType = {
    username: string;
    password: string;
};

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // const [checked, setChecked] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<LoginFormDataType>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFormDataType> = async (
        data: LoginFormDataType
    ) => {
        signInWithEmailAndPassword(auth, data?.username, data?.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                router.push('/dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                showNotify("error", errorMessage)
            });


    };

    return (
        <div className="w-screen h-screen  flex justify-center items-center bg-[#E5E5E5] col-span-12">
            <div
                className=" h-[400px] w-[480px] flex flex-col items-center justify-center gap-8 rounded-sm bg-white px-8">

                <div className="w-full">
                    <Divider
                        label={
                            <div className="text-center text-black px-2">
                                <div className="text-xl">Login</div>
                            </div>
                        }
                        labelPosition="center"
                        size={"sm"}
                        color={"#CA8A04"}
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="true">
                    <Group spacing={12}>
                        <Controller
                            render={({field}) => (
                                <TextInput
                                    {...field}
                                    type="email"
                                    size="md"
                                    label="Email"
                                    className="w-full"
                                    placeholder="Enter Email"
                                    error={errors.username?.message}
                                />
                            )}
                            name="username"
                            control={control}
                            rules={{required: "required *"}}
                        />
                        <Controller
                            render={({field}) => (
                                <PasswordInput
                                    {...field}
                                    label="Password"
                                    size="md"
                                    placeholder="Enter password"
                                    className="w-full"
                                    error={errors.password?.message}
                                />
                            )}
                            name="password"
                            control={control}
                            rules={{required: "required *"}}
                        />
                        {/* <div className=" flex w-full  justify-between items-center pt-4">
              <Checkbox
                label="Remember me"
                size="xs"
                checked={checked}
                onChange={(e) => setChecked(e.currentTarget.checked)}
              />
              <div className="text-xs cursor-pointer text-secondary underline">
                Forgot Password?
              </div>
            </div> */}
                        <Button
                            type="submit"
                            loading={loading}
                            size="md"
                            className="my-5 w-full"
                        >
                            Login
                        </Button>
                    </Group>
                </form>
            </div>
        </div>
    );
};

export default Login;
