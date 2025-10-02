import { cookies } from "next/headers";
import UserIdPage from "../UserIdPage";
import { getMessages } from "@/lib/actions/messages";
import { Message } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId: string | undefined = cookieStore.get("userId")?.value;

  if (!userId){    
    redirect('/login')
  };
  
  const  msg : Promise<Message[] >  =getMessages(id);
  
  return (
    <div className=" h-full w-ful ">
      {id && <UserIdPage userId={userId} channelId={id} msg={msg} />}
    </div>
  );
}
