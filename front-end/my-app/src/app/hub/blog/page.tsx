import AllPosts from "@/components/posts/AllPosts";
import { getAllPosts } from "@/lib/actions/post-action";
import React from "react";

const page = () => {
  const post: Promise<
    | {
        _id: string;
        username: string;
        email: string;
        active: boolean;
        content: string;
        title: string;
        createdAt: string;
      }[]
    | undefined
  > = getAllPosts();

  return (
    <main>
      {/* aside */}
      <aside>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </aside>

      {/* posts */}
      <section>
        <AllPosts getAllPosts={post} />
      </section>
    </main>
  );
};

export default page;
