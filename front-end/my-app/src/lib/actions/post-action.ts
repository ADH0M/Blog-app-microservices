"use server";

import { FormValidation, PrevStateForm } from "@/components/posts/CreatePost";
import Post from "../models/post-model";
import dbConnect from "../db/dbConnect";
import { PostType } from "../types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function newPost(
  userId: string,
  prevStateNewPost: PrevStateForm,
  formData: FormData
) {
  const title = formData.get("post-title");
  const content = formData.get("post-content");
  const errors: FormValidation = {};

  if (!title) {
    errors.title = "title is required";
  }

  if (!content) {
    errors.content = "content is required";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  try {
    await dbConnect();
    const post = new Post({ title, content, userId });
    const save = await post.save();

    console.log(save);
  } catch (err) {
    console.log(err);
  }

  return { content: "", title: "", type: "", userId: "" };
};

export async function updatePost(
  postId: string,
  prevStateNewPost: PrevStateForm,
  formData: FormData
) {
  const title = formData.get("post-title");
  const content = formData.get("post-content");
  const errors: FormValidation = {};

  if (!title) {
    errors.title = "title is required";
  }

  if (!content) {
    errors.content = "content is required";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  try {
    await dbConnect();
    const post = await Post.updateOne(
      { _id: postId },
      {
        $set: {
          content,
          title,
          updatedAt: new Date(),
        },
      }
    );
    console.log(post);
  } catch (err) {
    console.log(err);
  }

  return { content: "", title: "", type: "", userId: "" };
};

export async function getAllPosts() {

  try {
    await dbConnect();
    const posts: PostType[] = await Post.find()
      .populate({ path: "userId", select: "username email active" })
      .exec();

    const blogs = posts.map((p) => ({
      _id: p._id.toString(),
      username: p.userId.username,
      email: p.userId.email,
      active: p.userId.active,
      content: p.content,
      title: p.title,
      createdAt: p.createdAt.toLocaleDateString(),
    }));

    return blogs;
  } catch (err) {
    console.log(err);
  }
};

export async function getPost(id: string) {
  if (!id) {
    redirect("/hub/blog");
  }

  try {
    await dbConnect();
    const post: PostType | null = await Post.findById(id);
    if (!post) {
      redirect("/hub/blog");
    }

    const newPost = {
      _id: post._id.toString(),
      userId: post.userId.toString(),
      createdAt: post.createdAt.toLocaleDateString(),
      type: post.type,
      content: post.content,
      title: post.title,
    };

    return newPost;
  } catch (err) {
    console.log(err);
  }
};


export async function deletePost(id: string) {
  if (!id) {
    redirect("/hub/blog");
  }

  try {
    await dbConnect();
    const post = await Post.deleteOne({_id:id});
    console.log(post);

    revalidatePath('/hub/blog');
    if (!post) {
      redirect("/hub/blog");
    };
    
    return null;
  } catch (err) {
    console.log(err);
  }
};