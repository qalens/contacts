'use client'
import { createContactAtom } from "@/state/contact";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Create() {
    const [first_name,setFirstName] = useState('')
    const [,createContact] = useAtom(createContactAtom)
    return <div className="flex flex-row gap-2 p-2">
        <Input placeholder="Contact FirstName" className="grow" value={first_name} onChange={(e)=>{setFirstName(e.target.value)}}/>
        <Button color="primary" onClick={()=>{
            createContact({first_name}).then(()=>{
                setFirstName('')
            })
        }}>Add</Button>
    </div>
}