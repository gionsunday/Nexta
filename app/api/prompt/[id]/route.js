import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";


//GET A SINGLE PROMPT
export const GET = async(request, {params}) =>{
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).
        populate('creator')
        if(!prompt) return new Response ("Prompt Not found", {status:404})

        return new Response (JSON.stringify(prompt),
        {status:200})
    } catch (error) {
        return new Response ("Failed to fetch Prompts",
        {status:500})
    }
}

//UPDATE SIGNLE PROMPT

export const PATCH = async (request, { params }) =>{
    console.log(params)
    const {prompt, tag} = await request.json()

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)
        console.log(prompt)
        if(!existingPrompt) return new Response ("Prompt Not Found", {status:404})

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response (JSON.stringify(existingPrompt), {status:200})
    } catch (error) {
        console.log(error)
        return new Response ("Failed to Update rompts",
        {status:500})
    }
}


//DELETE PROMPT

export const DELETE = async (request, {params}) =>{
    try {
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)

        return new Response("PROMPT DELETED SUCCESSFULLY", {status:202} )
    } catch (error) {
        console.log(error)
        return new Response ("Failed to delete Prompts",
        {status:500})
    }
}