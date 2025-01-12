import { getBaseURL } from "@/lib/helper";
export type CreateContactPayload = { first_name: string,last_name?:string,mobile?:string,address?:string }
export async function createContact(body:CreateContactPayload){
    const resp=await fetch(`${getBaseURL()}/contact`,{
        method:'POST',
        body:JSON.stringify(body)
    })
    if (resp.status==201){
        return (await resp.json()).data
    } else {
        const body =await resp.json()
        throw Error(body.message+" "+body.data)
    }
}
export async function deleteContact(id:number){
    return fetch(`${getBaseURL()}/contact/${id}`,{
        method:'DELETE',
    })
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