import List from "@/components/contact/list";
import Header from "@/components/header";
import { redirect } from 'next/navigation';
import { getAllContacts } from "@/services/contact";
import { cookies } from "next/headers";
export default async function Contact() {
  const store = await cookies()
  const token = store.get('token')
  if (!token) {
    redirect("/login")
  } else {
    const contacts = await getAllContacts(store.get('token')?.value!!)
    return (<>
      <Header contacts={contacts} />
      <div className="container mx-auto max-w-7xl p-6 flex-grow border my-2 rounded-xl ">
        <List />
      </div>
    </>
    );
  }
}
