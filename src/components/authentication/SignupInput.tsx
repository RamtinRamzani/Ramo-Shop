import { Checkbox, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Error from "../signUp/Error";
import { useSignup } from "./useSignup";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export default function SignupInput() {
  const { signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    signup(
      {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        terms: data.terms,
      },
      { onSettled: () => reset() }
    );
    console.log(data);
  }

  return (
    <form
      className="flex flex-col flex-wrap w-full gap-3 md:flex-nowrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          label="Full Name"
          type="fullName"
          id="fullName"
          variant="underlined"
          {...register("fullName", {
            required: "fullName is required",
          })}
          disabled={isPending}
        />

        <Error>{errors?.fullName?.message}</Error>
      </div>

      <div>
        <Input
          label="Email address"
          type="email"
          id="email"
          variant="underlined"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              // value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
          disabled={isPending}
        />

        <Error>{errors?.email?.message}</Error>
      </div>

      <div>
        <Input
          label="Password (8 characters minimum)"
          type="text"
          id="password"
          variant="underlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
              message:
                "Password must include uppercase, lowercase, and a number",
            },
          })}
          autoComplete="new-password"
          disabled={isPending}
        />

        <Error>{errors?.password?.message}</Error>
      </div>

      <div>
        <Input
          label="Confirm Password"
          type="text"
          id="confirmPassword"
          variant="underlined"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues().password || "Password needs to match",
          })}
          autoComplete="new-password"
          disabled={isPending}
        />

        <Error>{errors?.confirmPassword?.message}</Error>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <Checkbox
          {...register("terms", { required: "You must agree to the terms" })}
          color="secondary"
          radius="sm"
          size="sm"
          disabled={isPending}
        >
          I agree with
          <a
            href="#"
            className="mx-2 text-blue-500 underline underline-offset-4"
          >
            Privacy Policy
          </a>
          and
          <a
            href="#"
            className="ml-2 text-blue-500 underline underline-offset-4"
          >
            Terms of Use
          </a>
        </Checkbox>

        <Error>{errors?.terms?.message}</Error>
      </div>

      <div className="flex justify-between ~gap-4/10 ~mt-2/8">
        <Button type="submit" className="~text-sm/lg ~px-6/12">
          Sign Up
        </Button>

        <Button
          type="reset"
          className="~px-6/12 text-black ~text-sm/lg bg-gray-400"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
