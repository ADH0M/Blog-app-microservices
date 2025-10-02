import { getPost } from "@/lib/actions/post-action";
import React from "react";



const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id } = await params;
    const post = await getPost(id);

    if(!post ){
        return <div>there is post not found</div>
    }

  return (
    <main className=" ">

      <header>
        <nav>
          <ul>
            <li>update</li>
            <li>delete</li>
            <li>add section</li>
          </ul>
        </nav>
      </header>

      <section>
            {/* post section  */}

            <div key={post._id}>
                <div>{post.title}</div>
                <div>{post.content}</div>
            </div>
      </section>
    </main>
  );
};

export default page;
