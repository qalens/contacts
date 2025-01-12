'use client'
import { deleteContactAtom, setBulkContactsAtom, contactsAtom } from "@/state/contact";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useDisclosure } from "@nextui-org/modal";
import { useAtom, useAtomValue } from "jotai";
import ViewEdit from "./viewedit";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
export default function List() {
    const currentContacts = useAtomValue(contactsAtom)
    const [selected, setSelected] = useState<number | null>(null)
    console.log(JSON.stringify(currentContacts))
    return <ul className="flex flex-col gap-2">
        {Object.entries(currentContacts).map(([_, contact]) => <li key={contact.id} id={"" + contact.id} className={"hover:bg-slate-700 border rounded-xl p-1 " + (selected == contact.id ? "bg-slate-700" : "")}>
            <SingleContact contact={contact} onEditOpenChange={(isOpen) => {
                if (isOpen) setSelected(contact.id)
                else setSelected(null)
            }} />
        </li>)}
    </ul>
}
function SingleContact({ contact, onEditOpenChange }: { contact: { first_name: string, last_name?: string, mobile?: string, id: number }, onEditOpenChange: (isOpen: boolean) => void }) {
    const { toast } = useToast()
    const [, deleteContact] = useAtom(deleteContactAtom)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    useEffect(() => {
        onEditOpenChange(isOpen)
    }, [isOpen])
    return <>
        <div className="p-1 flex flex-row items-center justify-left" onClick={onOpen}>
            <div className="flex flex-row items-center justify-left gap-3 grow">
                <div className="text-xl">{contact.first_name}{contact.last_name ? " " + contact.last_name : ""}</div>
                <div>{contact.mobile ? contact.mobile : ""}</div>
            </div>
            <Button onClick={() => {
                deleteContact({ id: contact.id })
                    .then((resp) => {
                        toast({
                            title: 'Success',
                            description: resp.message,
                        })
                        return true
                    }).catch(e => {
                        toast({
                            title: 'Failure',
                            description: e.message,
                            variant: 'destructive'
                        })
                        return false
                    })
            }}>Delete</Button>
        </div>
        <ViewEdit contact={contact} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
}