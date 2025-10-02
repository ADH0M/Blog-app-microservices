"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { use } from "react";
import { socket } from "@/socket";
import { Message } from "@/lib/types";
import { sendMessage } from "@/lib/actions/messages";
import AddImg, { AddImgHandle } from "@/components/chat/AddImg";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";

const UserIdPage = ({
  userId,
  channelId,
  msg,
}: {
  userId: string | undefined;
  channelId: string;
  msg: Promise<Message[]>;
}) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const lastMsg = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = use(msg); // for initial render only
  const [messages, setMessages] = useState<Message[]>(initialMessages); // dynamic messages
  const [action, setAction] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const activeBtn = useRef<AddImgHandle>(null);

  const msgAction = async (
    {
      user_id,
      userChannel_id,
    }: { user_id: string | undefined; userChannel_id: string | undefined },
    formData: FormData
  ) => {
    const content = formData.get("content")?.toString().trim();
    const type = formData.get("type");

    if (!content) return;

    const newMsg: Message = {
      _id: Date.now().toString(),
      userChannel_id,
      user_id,
      type: [type ? "text" : "img"],
      content,
      createdAt: new Date().toISOString(),
    };

    // Add optimistically
    setMessages((prev) => [...prev, newMsg]);
    lastMsg.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Emit via socket
    socket.emit("sendMsg", { msg: newMsg, roomId: channelId });

    // Call server action
    await sendMessage({ user_id, userChannel_id }, formData);

    setImgURL("");
    setAction(null);
  };

  useEffect(() => {
    if (!action) return;
    const url = URL.createObjectURL(action);
    setImgURL(url);
    return () => URL.revokeObjectURL(url);
  }, [action]);

  useEffect(() => {
    socket.emit("create-room", channelId);
  }, [channelId]);

  useEffect(() => {
    const handler = (data: Message) => {
      startTransition(() => {
        setMessages((prev) => [...prev, data]);
      });
    };

    socket.on("recieveMsg", handler);
    return () => {
      socket.off("recieveMsg", handler);
    };
  }, []);

  useEffect(() => {
    if (lastMsg.current) {
      lastMsg.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  console.log(userId, messages);

  if (!userId) return <div />;

  return (
    <main className="p-4 grid grid-rows-8 sm:p-6 max-w-4xl min-w-full max-h-screen transition-colors duration-300 backdrop-blur-sm bg-main-bg dark:bg-main-dark text-text-main dark:text-text-dark rounded-b-sm shadow-lg">
      {/* Header */}
      <section className="flex row-span-1 items-center gap-4 mb-6 p-4 border-b border-sky-blue/30 bg-primary-bg dark:bg-primary-dark rounded-t-lg">
        <div className="w-12 h-12 rounded-full bg-sky-blue flex items-center justify-center text-white font-bold shadow-md" />
        <div>
          <h1 className="text-lg font-semibold text-text-username dark:text-text-dark-username"></h1>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-600 dark:text-gray-300">Active now</span>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section
        ref={messageRef}
        className="flex-1 row-span-6 mb-6 max-h-96 overflow-y-auto min-h-full p-4 rounded-2xl
        space-y-4 bg-secondry-bg dark:bg-secondry-dark  msg-section scroll-smooth "
      >
        {!messages.length ? (
          <div className="text-center text-sm text-gray-500 ">
            No messages yet
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={msg._id}>
                <div
                  className={`flex ${
                    userId === msg.user_id ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`min-w-96 px-4 py-2 rounded-lg ${
                      userId === msg.user_id
                        ? "bg-sky-blue/80 rounded-tl-none text-text-main dark:text-text-dark"
                        : "bg-redg-blue rounded-tr-none"
                    } text-white shadow-md`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-80 float-right mt-1">
                      {new Date(msg.createdAt!).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div ref={lastMsg} />
          </>
        )}
      </section>

      {/* Message Input */}
      <section className="p-4 row-span-1 bg-main-bg dark:bg-main-dark border-t border-primary-dark/30">
        {imgURL && (
          <div className="p-4">
            <div className="relative w-[71px] h-[100px]">
              <img
                src={imgURL}
                alt="preview"
                className="border border-s-cyan-300 dark:border-gray-300 rounded-md"
              />
              <span
                onClick={() => {
                  setImgURL("");
                  setAction(null);
                }}
              >
                <MdDeleteOutline
                  className="absolute top-1 right-1 text-red-400 hover:text-rose-500 cursor-pointer"
                  size={20}
                />
              </span>
            </div>
          </div>
        )}

        <form
          className="flex gap-2"
          action={msgAction.bind(null, {
            user_id: userId,
            userChannel_id: channelId,
          })}
        >
          <div className="flex-1 w-full flex relative">
            <input
              name="content"
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 rounded-full border border-sky-blue/40 focus:outline-none focus:ring-2
               focus:ring-sky-blue/50 bg-white/70 dark:bg-primary-dark text-text-main dark:text-text-dark
                placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
            />
            <AddImg ref={activeBtn} action={action} setAction={setAction} />
          </div>

          <input type="hidden" name="type" value={imgURL ? "image" : "text"} />

          <button
            type="submit"
            className="px-6 py-2 rounded-full hover:bg-sky-blue dark:bg-secondry-dark dark:hover:bg-primary-dark font-medium shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <VscLoading className="animate-spin text-text-main" />
            ) : (
              <IoMdSend size={24} />
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default UserIdPage;
