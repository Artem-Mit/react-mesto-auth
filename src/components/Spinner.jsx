import React from "react";
import { MoonLoader } from "react-spinners";

export default function Spinner(props) {
  return (
    <div className="spinner">
      <MoonLoader loading={props.isLoading} color="#fff" size={props.size} />
    </div>
  );
}
