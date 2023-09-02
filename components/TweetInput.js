import { db, storage } from "@/firebase";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { firestore } from "firebase/app";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { openLogInModal } from "@/redux/modalSlice";

export default function TweetInput() {
  const user = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  async function sendTweet() {
    const dispatch = useDispatch();
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    if (image) {
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);
      //uploads image to storage
      const uploadImage = await uploadString(imageRef, image, "data_url");
      //getdonwload url of image we just uploaded
      const downloadUrl = await getDownloadURL(imageRef);
      //update doc in database with same docRef.id
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadUrl,
      });
    }
    setText("");
    setImage(null);
    setLoading(false);
  }

  function addImagetoTweet(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }
  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={user.photoUrl || "/assets/twitter-logo.png"}
      />

      {!loading ? (
        <div className="w-full">
          <textarea
            placeholder="Whats on your mind?"
            className="bg-transparent resize-none outline-none w-full min-h-[50px] text-lg"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          {image && (
            <div className="relative mb-4">
              <div
                onClick={() => setImage(null)}
                className="absolute top-1 left-1 bg-[#272c26] rounded-full w-8 h-8 flex justify-center items-center cursor-pointer
            hover:bg-white hover:bg-opacity-10"
              >
                <XIcon className="w-5"></XIcon>
              </div>
              <img
                className="rounded-2xl max-h-80 object-contain"
                src={image}
              ></img>
            </div>
          )}
          {/* icons div */}
          <div className="flex justify-between border-t border-gray-700 pt-4">
            <div className="flex space-x-0">
              <div
                className="iconAnimation"
                onClick={() => {
                  filePickerRef.current.click();
                }}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <input
                ref={filePickerRef}
                type="file"
                className="hidden"
                onChange={addImagetoTweet}
              ></input>
              <div className="iconAnimation">
                <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="iconAnimation">
                <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="iconAnimation">
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="iconAnimation">
                <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
            </div>
            <button
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50
            "
              onClick={sendTweet}
              disabled={!text && !image}
            >
              Tweet
            </button>
          </div>
          <div></div>
        </div>
      ) : (
        <h1 className="text-2xl text-gray-500">Uploading Post... </h1>
      )}
    </div>
  );
}
