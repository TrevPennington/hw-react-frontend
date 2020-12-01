import React from "react";
import TitleBar from "../components/TitleBar";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkList";

export default function App() {
  return (
    <div className="App">
      <TitleBar />
      <LinkForm />
      <LinkList />
    </div>
  );
}
