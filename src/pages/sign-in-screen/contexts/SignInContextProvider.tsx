import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

type SignInContextType = {
  handleOnClickForLoginBtn: () => void;
  handleOnClickForSignUpBtn: () => void;
};

const SignInContext = createContext<SignInContextType | undefined>(undefined);

export function SignInContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const handleOnClickForSignUpBtn = () => {
    navigate("/sign-up");
  };
  const handleOnClickForLoginBtn = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    navigate("/home");
  };
  const value = {
    handleOnClickForLoginBtn,
    handleOnClickForSignUpBtn,
  };

  return (
    <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
  );
}

export function useSignInContext() {
  const context = useContext(SignInContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
