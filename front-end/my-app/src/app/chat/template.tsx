import AsideComponet from "@/components/chat/Aside";
import { getChannels, getUserChannels } from "@/lib/actions/channels";
import { ChannelType } from "@/lib/types";
import { cookies } from "next/headers";
import { serialize } from "v8";



const ChatLayout = async({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  // const channels = a
  const username:string|undefined = cookieStore.get('username')?.value;
  const userid :string|undefined = cookieStore.get('userId')?.value;
  
  const channels:ChannelType[] = await getUserChannels(userid);

  const serializedUserChannels:ChannelType[] = channels.map((ch) => ({
    _id: ch._id.toString(),
    channel_name: ch.channel_name,
    channel_type: ch.channel_type,
    createdAt: ch.createdAt,
  }));

  return (
    <main className=" flex h-screen bg-main-bg text-main-text dark:bg-primary-dark dark:text-text-dark">
      {/* Sidebar */}
        <AsideComponet username={username} channels={serializedUserChannels}/>

      {/* Main Chat Area */}
      <section
        className={`flex-1 transition-all duration-300 `}
      >
        {children}


      {/* search about users */}

      </section>

      {/* Optional Footer */}
      <footer className="hidden">Footer content if needed</footer>
    </main>
  );
};


// ${
//           isSidebarOpen ? "lg:ml-0" : ""
//         }
export default ChatLayout;
