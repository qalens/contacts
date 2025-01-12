import { createContact, CreateContactPayload, deleteContact, updateContact, UpdateContactPayload } from "@/services/contact";
import { atom } from "jotai";

export const contactsAtom = atom<Record<number,any>>({})
export const setBulkContactsAtom = atom(null, (get, set, payload: {contacts:any[]}) => {
    const contactsVal:Record<number,any>={}
    console.log("Contacts",payload.contacts)
    for (const contact of payload.contacts){
        contactsVal[contact.id]=contact
    }
    console.log("Val",contactsVal)
    set(contactsAtom, contactsVal)
})
export const createContactAtom = atom(null, async (get, set, payload: CreateContactPayload ) => {
    const response = await createContact(payload)
    const contactsVal={...get(contactsAtom)}
    contactsVal[response.data.id]=response.data
    set(contactsAtom, contactsVal)
    return response

})
export const updateContactAtom = atom(null, async (get, set, payload: UpdateContactPayload ) => {
    const response = await updateContact(payload)
    const contactsVal={...get(contactsAtom)}
    contactsVal[response.data.id]=response.data
    set(contactsAtom, contactsVal)
    return response
})
export const deleteContactAtom = atom(null, async (get, set, payload: { id: number }) => {
    const contact = await deleteContact(payload.id)
    const contactsVal={...get(contactsAtom)}
    delete contactsVal[payload.id]
    set(contactsAtom, contactsVal)
    return contact

})