import { cookies } from "next/headers";
import ClientComponent from "./ClientComponent";

export default async function page() {
  const cookieStore = await cookies();
  const username:string |undefined = cookieStore.get('username')?.value;
  const email:string |undefined = cookieStore.get('email')?.value;
  const userId:string |undefined = cookieStore.get('userId')?.value;

  return <ClientComponent username ={username} userId={userId} email={email}/>;
}
