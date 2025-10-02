"use client";
import { deletePost } from "@/lib/actions/post-action";
import Link from "next/link";
import React, {
  use,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";

export interface IAllPosts {
  username?: string;
  email?: string;
  ative?: string;
  createdAt: string;
  type: string;
  content: string;
  title: string;
  _id: string;
}

export interface PostType {
  _id: string;
  username: string;
  email: string;
  active: boolean;
  content: string;
  title: string;
  createdAt: string;
}

const AllPosts = ({
  getAllPosts,
}: {
  getAllPosts: Promise<PostType[] | undefined>;
}) => {
  const allPosts = use(getAllPosts);

  const [prefetch, setPrefetch] = useState<boolean>(false);
  const handleNavigation = () => {
    if (!prefetch) {
      setPrefetch(true);
    }
  };

  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    allPosts,
    (currentPost, newPost) => {
      return currentPost?.filter((post) => post._id !== newPost);
    }
  );

  const elementsRef = useRef<HTMLDivElement>(null);

  const handleDeletePost = async (id: string) => {
    setOptimisticPosts(id);
    await deletePost(id);
    console.log(id);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("action-test");
          } else {
            entry.target.classList.remove("action-test");
          }
        });
      }, {});

      if (elementsRef.current) {
        [...elementsRef.current.children].forEach((ele) => {
          observer.observe(ele);
        });
      }

      // 🧹 Cleanup observer on unmount
      return () => {
        if (elementsRef.current) {
          [...elementsRef.current.children].forEach((ele) => {
            observer.unobserve(ele);
          });
        }
      };
    }
  }, []);

  if (!allPosts) {
    return <div>there are no posts</div>;
  }

  return (
    <div className="container mx-auto p-3 " ref={elementsRef}>
      {optimisticPosts?.map((post) => (
        <div
          key={post._id}
          className="min-h-96 bg-blue-300 mb-2 p-5 action-test "
        >
          <Link
            href={`/hub/blog/${post._id}`}
            prefetch={prefetch ? null : false}
            onMouseEnter={handleNavigation}
          >
            <span>{post.username}</span>
            <span>{post.createdAt}</span>
          </Link>
          <div>{post.active ? "active" : "not active"}</div>

          <div>{post.title}</div>

          <div>{post.content}</div>

          <form action={handleDeletePost.bind(null, post._id)}>
            <button
              className="cursor-pointer bg-red-500 w-28 p-2 rounded-md "
              type="submit"
            >
              delete post
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
