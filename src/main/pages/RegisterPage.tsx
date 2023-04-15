import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { authStore } from "../features/auth/store";

type Inputs = { email: string; password: string; displayName: string };

export function RegisterPage() {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async ({
    displayName,
    email,
    password,
  }) => {
    const status = await authStore.register(email, displayName, password);
    if (status === "loggedIn") {
      navigate("/app");
    }
  };

  return (
    <div className="flex grow flex-col items-center justify-center">
      <h3 className="mb-8 text-4xl font-bold">Game hub</h3>
      <div className="w-96 rounded-lg border-2 border-stone-200 bg-stone-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex flex-col">
            <label htmlFor="displayName">Display name</label>
            <input
              {...register("displayName")}
              id="displayName"
              name="displayName"
              type="displayName"
              className="p-1"
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label htmlFor="email">Email address</label>
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              className="p-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              className="p-1"
            />
          </div>
          <div className="mt-8 text-center">
            <Button bgColor="yellow" size="lg" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
