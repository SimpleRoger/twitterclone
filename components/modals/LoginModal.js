import Modal from "@mui/material/Modal";
import { useState } from "react";
import { openLogInModal, closeLogInModal } from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function LoginModal() {
  //   const [isOpen, setIsOpen] = useState(false);
  const isOpen = useSelector((state) => state.modals.logInModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignin() {
    await signInWithEmailAndPassword(auth, "guest12345678@gmail.com", "123456");
  }
  return (
    <>
      <button
        onClick={() => dispatch(openLogInModal())}
        className=" bg-transparent border border-white text-white w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
      >
        Log In
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLogInModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[660px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <h1 className="text-center mt-4 font-bold text-3xl">
              Sign into your account
            </h1>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              type={"email"}
            ></input>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              className="bg-white text-black w-full font-bold text-lg p-2 mt-8 rounded-md"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <button
              className="mt-3 bg-white text-black w-full font-bold text-lg p-2 roudned-md"
              onClick={handleGuestSignin}
            >
              Sign in as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
