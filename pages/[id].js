import PostsFeed from "@/components/PostsFeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import Moment from "react-moment";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data.username,
    name: data.name,
    photoUrl: data.photoUrl,
    text: data.tweet,
    commments: data.comments || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
  };
  return {
    props: {
      tweetData: formattedData,
    },
  };
}
export default function CommentsPage({ tweetData }) {
  return (
    <div>
      <div
        className="bg-black min-h-screen text-[#e7e9eA]
  max-w-[1400px] mx-auto flex"
      >
        <Sidebar />
        <div className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow border-gray-700 border border-x">
          <div
            className="flex space-x-2
          px-3 py-2 text-lg sm:text-xl font-bold border-b border-gray-700 sticky top-0 z-50"
          >
            <ArrowLeftIcon className="w-7" />
            <h1>Tweet</h1>
          </div>
          <div className="border-b border-gray-700">
            <div className="flex space-x-3 p-3  border-gray-700">
              <img
                className="w-11 h-11 rounded-full object-cover"
                src={tweetData.photoUrl}
              />
              <div>
                <div className="text-gray-500 flex items-center space-x-2 mb-1">
                  <h1 className="text-white font-bold">{name}</h1>
                  <span>@{tweetData.username} </span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>
                <span>{tweetData.text}</span>
              </div>
            </div>
            <div className="flex space-x-3 p-3  border-gray-700">
              <img
                className="w-11 h-11 rounded-full object-cover"
                src={photoUrl}
              />
              <div>
                <div className="text-gray-500 flex items-center space-x-2 mb-1">
                  <h1 className="text-white font-bold">{name}</h1>
                  <span>@{username} </span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{timestamp}</Moment>
                </div>
                <span>{text}</span>
              </div>
            </div>
          </div>
          <Tweet />
        </div>
        <Trending />
      </div>
    </div>
  );
}
