"use client";
import { newPost } from "@/lib/actions/post-action";
import React, { useActionState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3201");

export interface FormValidation {
  content?: string;
  title?: string;
}

export interface PrevStateForm {
  content?: string;
  title?: string;
  type?: string;
  userId?: string;
  errors?: FormValidation;
}

const preState: PrevStateForm = {
  content: "",
  title: "",
  type: "",
  userId: "",
};

const CreatePost = ({ userId }: { userId: string | undefined }) => {
  const newFormAction = async (
    userId: string,
    prevStateNewPost: PrevStateForm,
    formData: FormData
  ) => {
    const title = formData.get("post-title");
    socket.emit("notification-send", { title, userId });
    return await newPost(userId, prevStateNewPost, formData);
  };

  const [state, formAction, isPending] = useActionState(
    newFormAction.bind(null, userId!),
    preState
  );

  return (
    <form action={formAction}>
      <label htmlFor="">
        <span>title </span>
        <input type="text" name="post-title" placeholder="enter your title" />
        <span>{state.title}</span>
      </label>

      <label htmlFor="">
        <span>content</span>
        <textarea
          name="post-content"
          id=""
          placeholder="enter your content"
        ></textarea>
        <span>{state.content}</span>
      </label>

      <button type="submit">submit</button>
    </form>
  );
};

export default CreatePost;
