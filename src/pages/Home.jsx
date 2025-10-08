import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Home() {
  return (
    <div>
      <h1>Welcome - Public Page</h1>
      <Signup />
      <Login />
    </div>
  );
}
