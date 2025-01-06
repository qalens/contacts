'use client'
import { deleteContactAtom, setBulkContactsAtom, contactsAtom } from "@/state/contact";
import { Button } from "@nextui-org/button";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useAtom, useAtomValue } from "jotai";
export default function List() {
    const currentContacts = useAtomValue(contactsAtom)
    console.log(JSON.stringify(currentContacts))
    return <Listbox>
        {Object.entries(currentContacts).map(([_,contact]) => <ListboxItem key={contact.id} id={""+contact.id}>
            <SingleContact {...contact} />
        </ListboxItem>)}
    </Listbox>
}
function SingleContact({ title, status, id }: { title: string, status: string, id: number }) {
    const [,deleteContact] = useAtom(deleteContactAtom)
    return <div className="flex flex-row items-center justify-left">
        <div className="grow">{title}</div>
        <div><Button onClick={() => {
            deleteContact({id})
        }} color="danger">Delete</Button></div>
    </div>
}