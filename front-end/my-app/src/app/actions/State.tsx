"use client";
import React from "react";
import { loginActions } from "./actions";

const StatesForm = () => {
    
  return <button onClick={(e) => {
    e.currentTarget.form?.requestSubmit()
  }}>
    Submit the form
  </button>;
};

export default StatesForm;
