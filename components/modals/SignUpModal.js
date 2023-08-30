import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { openSignUpModal, closeSignUpModal } from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { CurrencyEuroIcon } from "@heroicons/react/outline";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignUpModal() {
  //   const [isOpen, setIsOpen] = useState(false);
  const isOpen = useSelector((state) => state.modals.signUpModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(
        Math.random() * 6
      )}.png`,
    });
    router.reload();
  }

  async function handleGuestSignin() {
    await signInWithEmailAndPassword(auth, "guest12345678@gmail.com", "123456");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      //handle redux actions
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <button
        onClick={() => dispatch(openSignUpModal())}
        className=" bg-white border-white text-black w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
      >
        Sign Up
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[660px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <button
              className="bg-white text-black w-full font-bold text-lg p-2 roudned-md"
              onClick={handleGuestSignin}
            >
              Sign in as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="text-center mt-4 font-bold text-3xl">
              Create your account
            </h1>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              type={"text"}
            ></input>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Email"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
              className="bg-white text-black w-full font-bold text-lg p-2 mt-8 rounded-md"
              onClick={handleSignUp}
            >
              Create Account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
