import Login from "../components/AuthForm";
import Signup from "../components/ForgotPassword";

export default function Home() {
  return (
    <div>
      <h1>Welcome - Public Page</h1>
      <Signup />
      <Login />
    </div>
  );
}
