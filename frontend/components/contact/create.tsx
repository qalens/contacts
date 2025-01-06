'use client'
import { createContactAtom } from "@/state/contact";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Create() {
    const [title,setTitle] = useState('')
    const [,createContact] = useAtom(createContactAtom)
    return <div className="flex flex-row gap-2 p-2">
        <Input placeholder="Contact Title" className="grow" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <Button color="primary" onClick={()=>{
            createContact({title}).then(()=>{
                setTitle('')
            })
        }}>Add</Button>
    </div>
}