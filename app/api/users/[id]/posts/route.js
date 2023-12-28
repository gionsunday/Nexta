import Prompt from "@/models/prompt";

import { connectToDB } from "@/utils/database";

export const GET = async(request, {params}) =>{
    console.log(params.id)
    try {
        await connectToDB()

        const prompts = await Prompt.find({creator:params.id}).populate('creator')
        //console.log(params)
        return new Response (JSON.stringify(prompts),{status:200})
    } catch (error) {
        
        return new Response ("Failed to fetch Prompts",{status:500})
    }
}