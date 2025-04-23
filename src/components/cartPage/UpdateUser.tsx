import { Input } from "@heroui/react";
import Error from "../../ui/Error";
import { useForm } from "react-hook-form";
import InputForm from "../../ui/InputForm";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import { useUpdateUser } from "../authentication/useUpdateUser";
import { useState } from "react";

type FormValues = {
  fullName: string;
  avatarImage: string;
  email: string;
};

function UpdateUser() {
  const { user } = useUser();
  const currentFullName = user?.user_metadata?.fullName;
  const userEmail = user?.email;

  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit() {
    if (!fullName) return;
    updateUser(
      { fullName, avatar: avatar || undefined },
      {
        onSuccess: () => {
          setAvatar(null);
          reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
    setAvatarUrl(null);
    reset();
  }

  return (
    <InputForm
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md pt-4 pm-10"
    >
      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold">Update your account</h2>

        <div>
          <Input
            label="Full Name *"
            type="text"
            id="fullName"
            variant="underlined"
            {...register("fullName", {
              required: "First Name is required",
              value: fullName,
            })}
            size="sm"
            className="placeholder:text-sm font-semibold uppercase bg-bg-color dark:bg-grey-800 rounded-md pl-2"
            value={fullName}
            onChange={(e) => {
              setValue("fullName", e.target.value);
              setFullName(e.target.value);
            }}
            disabled={isUpdating}
          />
          <Error>{errors?.fullName?.message}</Error>
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            id="email"
            variant="underlined"
            {...register("email", {
              // required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            size="sm"
            className="placeholder:text-sm font-semibold uppercase bg-bg-color rounded-md pl-2 dark:bg-grey-800"
            value={userEmail}
            // onChange={(e) => setValue("email", e.target.value)}
            disabled
          />
        </div>

        <div>
          <Input
            label="Avatar Image*"
            type="file"
            id="avatar"
            variant="underlined"
            accept="image/*"
            {...register("avatarImage", {
              // required: "Avatar Image is required",
            })}
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                setAvatar(file);
                setAvatarUrl(URL.createObjectURL(file));
              }
            }}
            size="sm"
            className="placeholder:text-sm font-semibold uppercase rounded-md pl-2 dark:bg-grey-800"
            disabled={isUpdating}
          />
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar preview"
              className="w-20 h-20 object-cover rounded-full mt-2"
            />
          )}
        </div>

        <div className="flex self-start gap-4 mt-6">
          <Button
            type="submit"
            className="~text-sm/base ~px-6/12"
            disabled={isUpdating}
          >
            Update account
          </Button>
          <Button
            type="reset"
            className="~text-sm/base bg-bg-color ~px-6/12 dark:bg-grey-400"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </InputForm>
  );
}

export default UpdateUser;
