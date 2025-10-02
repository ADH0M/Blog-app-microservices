import CreatePost from "@/components/posts/CreatePost";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const page = async() => {

    const cookieStore = await cookies();
    const userId:string|undefined = cookieStore.get('userId')?.value;
    if(!userId) {
        redirect('/login');
    };

  return (
    <div>
        <CreatePost userId={userId}/>
    </div>
  );
};

export default page;
