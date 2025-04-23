import { Input } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/Spinner";
import Error from "./Error";
import { useLogin } from "./useLogin";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../assets/icons";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginInput() {
  // const [email, setEmail] = useState<string>("ramtin@example.com");
  // const [password, setPassWord] = useState<string>("RAMTIN1234");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    // defaultValues: { email: "ramtin@example.com", password: "RAMTIN1234" },
  });

  function onSubmit(data: FormValues) {
    if (!data.email || !data.password) return;
    login(
      { email: data.email, password: data.password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <form
      className="flex flex-col flex-wrap w-full gap-3 md:flex-nowrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          label="Your Username or Email address"
          type="text"
          id="email"
          variant="underlined"
          {...register("email", {
            required: "Username or Email address is required",
            validate: (value) =>
              value.includes("@") ||
              value.length >= 3 ||
              "Enter a valid email or at least 3 characters for username",
          })}
        />

        <Error>{errors?.email?.message}</Error>
      </div>

      <div>
        <Input
          label="Password"
          type={isVisible ? "text" : "password"}
          id="password"
          variant="underlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
              value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
              message:
                "Password must include uppercase, lowercase, and a number",
            },
          })}
          autoComplete="new-password"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
              ) : (
                <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
              )}
            </button>
          }
        />

        <Error>{errors?.password?.message}</Error>
      </div>

      <div className="flex justify-between ~gap-4/10 ~mt-2/8">
        <Button type="submit" className="~text-sm/lg ~px-6/12">
          {!isPending ? "Log in" : <SpinnerMini />}
        </Button>

        <Button
          onClick={reset}
          type="reset"
          className="~px-6/12 text-black ~text-sm/lg bg-gray-400"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

/* deactive confirm email :in supabase/authenication/sign up/email/confirm email , read documentations */
/* SUPABASE : go to API docs we need Authentication and user management */
