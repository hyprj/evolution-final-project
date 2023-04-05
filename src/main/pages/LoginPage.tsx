import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/button/Button";
import { firebaseAuth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../features/auth/useAuth";
import { useNavigate } from "react-router-dom";

type Inputs = { emailId: string; password: string };

export function LoginPage() {
  const { setStatus, setUser } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async ({ emailId, password }) => {
    try {
      setStatus("loading");
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        emailId,
        password
      );
      const { displayName, email, uid } = user.user;
      setUser({ displayName, email, uid });
      setStatus("loggedIn");
      navigate("/app");
    } catch (err) {
      setStatus("visitor");
    }
  };
  return (
    <div className="flex grow flex-col items-center justify-center">
      <h3 className="mb-8 text-4xl font-bold">Game hub</h3>
      <div className="w-96 rounded-lg border-2 border-stone-200 bg-stone-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex flex-col">
            <label htmlFor="emailId">Email address</label>
            <input
              {...register("emailId")}
              id="emailId"
              name="emailId"
              type="emailId"
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
            <Button bgColor="green" size="lg" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
