import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Publication from "../../Components/Publication/Publication";
import PostForm from "./PostForm";
import Friend from "../../Components/Friend/Friend";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home-container container">
        <PostForm />
        <Friend />
        <Publication />
      </main>
    </>
  );
}
