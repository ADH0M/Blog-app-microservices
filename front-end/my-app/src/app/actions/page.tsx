import React from "react";
import { loginActions } from "./actions";
import StatesForm from "./State";

const page = () => {
  return (
    <div>
      <form
        action={loginActions}
        className="h-screen w-full bg-amber-50 text-gray-700 flex flex-col items-center p-20"
      >
        <label htmlFor="">
          <span>username</span>
          <input
            type="text"
            className="border border-blue-500 outline-none p-2 rounded-lg m-2"
            name="username"
          />
        </label>

        <label htmlFor="">
          <span>Email</span>
          <input
            name="email"
            type="text"
            className="border border-blue-500 outline-none p-2 rounded-lg m-2"
          />
        </label>

        <div>
          <label htmlFor="select-gender" className="select-none text-lg mx-2">
            gender
          </label>
          <select name="select_gender" id="select-gender">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <label htmlFor="check-box">
          <input
            type="checkbox"
            className="mx-2 "
            id="check_box"
            name="check_box"
          />
          <span className="text-blue-400 text-lg select-none">remember me</span>
        </label>

        <button type="submit">Submit</button>
        <StatesForm />
      </form>
    </div>
  );
};

export default page;
