import Modal from "@mui/material/Modal";
import { useState } from "react";
import { openSignUpModal, closeSignUpModal } from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpModal() {
  //   const [isOpen, setIsOpen] = useState(false);
  const isOpen = useSelector((state) => state.modals.signUpModalOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
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
            <button className="bg-white text-black w-full font-bold text-lg p-2 roudned-md">
              Sign in as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="text-center mt-4 font-bold text-3xl">
              Create your account
            </h1>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Full Name"
              type={"text"}
            ></input>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Email"
              type={"email"}
            ></input>
            <input
              className="h-10 mt-8 rouded-md bg-transparent border border-gray-700 p-6"
              placeholder="Password"
              type={"password"}
            ></input>
            <button className="bg-white text-black w-full font-bold text-lg p-2 mt-8 rounded-md">
              Create Account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
