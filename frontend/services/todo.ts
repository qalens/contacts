import { getBaseURL } from "@/lib/helper";

export async function createContact(title:string){
    const resp=await fetch(`${getBaseURL()}/contact`,{
        method:'POST',
        body:JSON.stringify({title})
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