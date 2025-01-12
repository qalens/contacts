'use client'
import { setBulkContactsAtom } from "@/state/contact";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import CreateContactModal from "./contact/create";
const SearchIcon = (props:any) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  };
export default function Header({ contacts }: { contacts: any[] }) {
    const [, setBulkContacts] = useAtom(setBulkContactsAtom)
    const {isOpen,onOpen,onOpenChange} = useDisclosure()
    useEffect(() => {
        setBulkContacts({ contacts })
    }, [contacts])
    return <div className="flex flex-row gap-2 items-center justify-left">
        <Input className="grow"
        startContent={<SearchIcon/>}
        />
        <Button color="primary" onPress={onOpen}>Add</Button>
        <Button
            color="danger"
            onPress={() => {
                document.cookie = "token=; path=/; secure; samesite=strict; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                redirect("/")

            }}>Logout</Button>
            <CreateContactModal isOpen={isOpen} onOpenChange={onOpenChange}/>
    </div>
}