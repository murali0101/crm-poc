import { LoginForm } from "@/components/login-form";
import { Fragment } from "react/jsx-runtime";
import { SignInContextProvider } from "./contexts/SignInContextProvider";

function SignInScreen() {
  return (
    <Fragment>
      <SignInContextProvider>
        <SignInScreenWrapper />
      </SignInContextProvider>
    </Fragment>
  );
}

export default SignInScreen;

const SignInScreenWrapper = () => {
  return (
    <Fragment>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </Fragment>
  );
};
