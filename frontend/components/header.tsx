'use client'
import { setBulkContactsAtom } from "@/state/contact";
import { Button } from "@nextui-org/button";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Header({contacts}:{contacts:any[]}){
    const [,setBulkContacts] = useAtom(setBulkContactsAtom)
    useEffect(()=>{
        setBulkContacts({contacts})
    },[contacts])
    return <div className="flex flex-row"><div className="grow text-3xl">My Contacts</div><Button onPress={()=>{
        document.cookie = "token=; path=/; secure; samesite=strict; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        redirect("/")

    }}>Logout</Button></div>
}