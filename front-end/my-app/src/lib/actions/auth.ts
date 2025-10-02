"use server";
import { redirect } from "next/navigation";
import dbConnect from "../db/dbConnect";
import User from "../models/user-model";
import { cookies } from "next/headers";

type SignupFormState = {
  message?: string;
  errors?: {
    username?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string;
  };
};

export async function signUpAction(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  const errors: {
    username?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string;
  } = {};

  let hasErrors = false;

  if (!username || username.length < 2) {
    errors.username = ["Username must be at least 2 characters long."];
    hasErrors = true;
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please enter a valid email address."];
    hasErrors = true;
  }

  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.phone = ["Please enter a valid phone number (e.g., +966500000000)."];
    hasErrors = true;
  }

  if (!password || password.length < 6) {
    errors.password = ["Password must be at least 6 characters long."];
    hasErrors = true;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = ["Passwords do not match."];
    hasErrors = true;
  }

  if (hasErrors) {
    return { message: "Validation failed.", errors };
  }

  try {
    await dbConnect();
    const cookieStore = await cookies();

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    }).exec();

    if (existingUser) {
      return {
        message: "User already exists.",
        errors: {
          general: "An account with this email or phone already exists.",
        },
      };
    }

    const user = await User.create({
      username,
      email,
      phone,
      password,
      role: ["customer"], // default role
    });

    console.log(user);

    cookieStore.set("user-id", user.id);
    cookieStore.set("user-email", user.email);
    cookieStore.set("user-name", user.name);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      message: "Something went wrong.",
      errors: {
        general: "Failed to create account. Please try again later.",
      },
    };
  }

  redirect("/login");
};

export async function loginUpAction(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // Validation
  const errors: {
    email?: string[];
    password?: string[];
    general?: string;
  } = {};

  let hasErrors = false;

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please enter a valid email address."];
    hasErrors = true;
  }

  if (!password || password.length < 6) {
    errors.password = ["Password must be at least 6 characters long."];
    hasErrors = true;
  }

  if (hasErrors) {
    return { message: "Validation failed.", errors };
  }

  try {
    await dbConnect();
    const cookieStore = await cookies();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return { errors: { general: "Invalid credentials" } };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { errors: { general: "Invalid credentials" } };
    }

    const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    const userSession = JSON.stringify({
      userId: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      expireSesion: expireDate.toISOString(),
    });

    const sessionToken = Buffer.from(userSession).toString("base64");
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expireDate,
      sameSite: "strict",
      path: "/",
    });

    cookieStore.set("userId", user?.id);
    cookieStore.set("email", user?.email);
    cookieStore.set("username", user?.username);
    cookieStore.set("role", user?.role);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      message: "Something went wrong.",
      errors: {
        general: "Failed to create account. Please try again later.",
      },
    };
  }

  redirect("/chat");
};

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    cookieStore.delete("user-id");
    cookieStore.delete("user-email");
    cookieStore.delete("user-name");
    cookieStore.delete("user-role");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      message: "Something went wrong.",
      errors: {
        general: "Failed to logout account. Please try again later.",
      },
    };
  }

  redirect("/");
};
