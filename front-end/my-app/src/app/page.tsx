// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center  p-6 gradient-bg min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Welcome to Auth App
      </h1>
      <div className="space-x-6">
        <Link href="/signup">
          <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Log In
          </button>

          <div className="bg-light animate-bounce-slow">Hello World</div>
        </Link>
      </div>

      <div className="h-screen">data</div>
      <div className="h-screen">node</div>

      <div>
        <ul>
          <li className="bg-gray-400">value </li>
          <li className="">actions</li>
          <li className="">test </li>
        </ul>
         action 
      </div>
    </div>
  );
}
