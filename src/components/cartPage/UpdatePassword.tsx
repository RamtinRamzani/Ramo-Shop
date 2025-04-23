import { Input } from "@heroui/react";
import InputForm from "../../ui/InputForm";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../authentication/useUpdateUser";
import Error from "../../ui/Error";

type FormData = {
  password: string;
  confirmPassword: string;
};

function UpdatePassword() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormData>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: { password: string }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)} className="rounded-md py-10">
      <div className="flex flex-col gap-10 py-5">
        <h2 className="text-xl font-semibold">Update your password</h2>

        <div>
          <Input
            label="Password (8 characters minimum)"
            type="password"
            id="password"
            variant="underlined"
            autoComplete="current-password"
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
            disabled={isUpdating}
            // className="dark:bg-grey-800 bg-bg-color rounded-md"
            className="placeholder:text-sm uppercase bg-bg-color dark:bg-grey-800 rounded-md pl-2"
            size="sm"
          />

          <Error>{errors?.password?.message}</Error>
        </div>

        <div>
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            variant="underlined"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues().password || "Password needs to match",
            })}
            autoComplete="new-password"
            disabled={isUpdating}
            className="placeholder:text-sm uppercase bg-bg-color dark:bg-grey-800 rounded-md pl-2"
            size="sm"
          />

          <Error>{errors?.confirmPassword?.message}</Error>
        </div>

        <div className="flex self-start gap-4 mt-6">
          <Button type="submit" className="~text-sm/base ~px-6/12">
            Update password
          </Button>
          <Button
            type="reset"
            className="~text-sm/base bg-bg-color ~px-6/12 dark:bg-grey-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </InputForm>
  );
}

export default UpdatePassword;
