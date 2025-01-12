'use client'
import { deleteContactAtom, setBulkContactsAtom, contactsAtom } from "@/state/contact";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useDisclosure } from "@nextui-org/modal";
import { useAtom, useAtomValue } from "jotai";
import ViewEdit from "./viewedit";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
export default function List() {
    const currentContacts = useAtomValue(contactsAtom)
    console.log(JSON.stringify(currentContacts))
    return <Listbox>
        {Object.entries(currentContacts).map(([_, contact]) => <ListboxItem key={contact.id} id={"" + contact.id}>
            <SingleContact {...contact} />
        </ListboxItem>)}
    </Listbox>
}
function SingleContact(contact: { first_name: string, last_name?: string, mobile?: string, id: number }) {
    const { toast } = useToast()
    const [, deleteContact] = useAtom(deleteContactAtom)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return <div className="p-1 flex flex-row items-center justify-left" onClick={onOpen}>
        <div className="flex-row items-center justify-left gap-3 grow">
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
        <ViewEdit contact={contact} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
}