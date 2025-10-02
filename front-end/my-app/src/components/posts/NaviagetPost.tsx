"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IAllPosts } from "./AllPosts";
import { deletePost } from "@/lib/actions/post-action";

const NaviagetPost = ({ post }: { post: IAllPosts }) => {
  const [prefetch, setPrefetch] = useState<boolean>(false);
  const handleNavigation = () => {
    if (!prefetch ) {
      setPrefetch(true);
    }
};

  const handleDeletePost = ()=>{
    deletePost(post._id);
    console.log(post._id);
    
  };



  return (
    <>
    <Link
      href={`/hub/blog/${post._id}`}
      prefetch={prefetch ? null : false}
      onMouseEnter={handleNavigation}
      >
      <span>{post.username}</span>
      <span>{post.createdAt}</span>
    </Link>
      <div>
        {post.ative ? 'active' :'not active'}
      </div>

      <div>
        {post.title}
      </div>

      <div>
        {post.content}
      </div>

      <div onClick={handleDeletePost} className="cursor-pointer bg-red-500 w-28 p-2 rounded-md " >
          delete post
      </div>
      </>
  );
};

export default NaviagetPost;
