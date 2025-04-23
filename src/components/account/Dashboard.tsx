import { useForm } from "react-hook-form";
import InputForm from "../../ui/InputForm";
import { Input } from "@heroui/react";
import Error from "../../ui/Error";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  newPassword: string;
};

export default function Dashboard() {
  // const [isVisible, setIsVisible] = useState(true);
  // const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    console.log("Form Data:", data);
    reset();
  }

  return (
    <div>
      <InputForm
        // title="Account Details"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-xl">Account Details</h2>
        <div>
          <Input
            label="first name *"
            type="text"
            id="firstName"
            variant="underlined"
            {...register("firstName", { required: "First Name is required" })}
            size="sm"
            className="placeholder:text-sm font-semibold uppercase"
          />
          <Error>{errors?.firstName?.message}</Error>
        </div>

        <div>
          <Input
            label="last name *"
            type="text"
            id="lastName"
            variant="underlined"
            {...register("lastName", { required: "Last Name is required" })}
            size="sm"
            className="placeholder:text-sm font-semibold uppercase"
          />
          <Error>{errors?.lastName?.message}</Error>
        </div>

        <div>
          <Input
            label="email *"
            type="email"
            id="email"
            variant="underlined"
            {...register("email", { required: "Email is required" })}
            size="sm"
            className="placeholder:text-sm font-semibold uppercase"
          />
          <Error>{errors?.email?.message}</Error>
        </div>

        <h2 className="font-semibold text-xl mt-10">Password</h2>
        <div>
          <Input
            label="old password"
            type="text"
            id="password"
            variant="underlined"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message:
                  "Password must include uppercase, lowercase, and a number",
              },
            })}
            autoComplete="new-password"
            className="placeholder:text-sm font-semibold uppercase"
          />
          <Error>{errors?.password?.message}</Error>
        </div>

        <div>
          <Input
            label="new password"
            type="password"
            id="newPassword"
            variant="underlined"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message:
                  "Password must include uppercase, lowercase, and a number",
              },
            })}
            autoComplete="new-password"
            className="placeholder:text-sm font-semibold uppercase"
          />
          <Error>{errors?.newPassword?.message}</Error>
        </div>

        <div>
          <Input
            label="repeate new password"
            type="text"
            id="newPassword"
            variant="underlined"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message:
                  "Password must include uppercase, lowercase, and a number",
              },
            })}
            autoComplete="new-password"
            className="placeholder:text-sm font-semibold uppercase"
          />
          <Error>{errors?.newPassword?.message}</Error>
        </div>
      </InputForm>
    </div>
  );
}
