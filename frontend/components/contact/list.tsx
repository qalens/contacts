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
function SingleContact({ first_name,last_name,mobile, id }: { first_name: string,last_name?:string,mobile?:string, id: number }) {
    const [,deleteContact] = useAtom(deleteContactAtom)
    return <div className="p-1 flex flex-row items-center justify-left gap-3">
        <div className="text-xl">{first_name}{last_name?" "+last_name:""}</div>
        <div>{mobile?mobile:""}</div>
    </div>
}