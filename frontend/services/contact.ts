import { getBaseURL } from "@/lib/helper";
export type CreateContactPayload = { first_name: string,last_name?:string,mobile?:string,address?:string }
export type UpdateContactPayload = { id:number,first_name?: string,last_name?:string,mobile?:string,address?:string }
export async function createContact(payload:CreateContactPayload){
    const resp=await fetch(`${getBaseURL()}/contact`,{
        method:'POST',
        body:JSON.stringify(payload)
    })
    if (resp.status==201){
        return (await resp.json())
    } else {
        const body =await resp.json()
        throw Error(body.message+" "+body.data)
    }
}
export async function updateContact(payload:UpdateContactPayload){
    const {id,...body}=payload
    const resp=await fetch(`${getBaseURL()}/contact/${id}`,{
        method:'PATCH',
        body:JSON.stringify(body)
    })
    if (resp.status==200){
        return (await resp.json())
    } else {
        const body =await resp.json()
        throw Error(body.data)
    }
}
export async function deleteContact(id:number){
    const resp=await fetch(`${getBaseURL()}/contact/${id}`,{
        method:'DELETE'
    })
    if (resp.status==200){
        return (await resp.json())
    } else {
        const body =await resp.json()
        throw Error(body.data)
    }
}
export async function getAllContacts(token:string){
    const resp=await fetch(`${getBaseURL()}/contact`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    const data=await resp.json()
    return data.data;
}