import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { openAPI } from "better-auth/plugins";
import openai from "../config/OpenAI.js";

// Controller function to  Make Revision

export const makeRevision=async (req:Request, res:Response) => {
    const userId =req.userId;
    try {
        const projectId  =req.params.projectId as string
        const {message}= req.body

        const user = await prisma.user.findUnique({
            where:{id:userId}
        })
        if (!userId||!user) {
            return res.status(403).json({message:"Not authorized"})
        }
        if(user.credits<5){
            return res.status(402).json({message:"Insufficient credits"})
        }
        if(!message||message.trim()==''){
            return res.status(400).json({message:"Message is required"})
        }
        const currentProject=await prisma.websiteProject.findUnique({
            where:{
                id:projectId,
                userId
            },
            include:
            {
                versions:true
            }
        })

        if(!currentProject){
            return res.status(404).json({message:"Project not found"})
        }
        await prisma.conversation.create({
            data:{
                role:'user',
                content:message,
                projectId:currentProject.id
            }
        })
        await prisma.user.update({
            where:{id:userId},
            data:{
                credits:{decrement:5}
            }
        })
        //enhance user prompts
        const promtEnhanceResponse = await openai.chat.completions.create({
            model:'openai/gpt-oss-120b:free',
            messages:[
                {
                    role:"system",
                    content:`You are a prompt enhancement specialist. The user wants to make change to their website. Enhance their request to be more specific and actionable for a web developer.
                    
                    Enhance this by:
                    1. Being specific about what elements to change
                    2. mentioning desing details (colors, layout, spacing, etc.)
                    3. Clarifying the desire outcome
                    4. Using clear technical terms
                    
                    return ONLY the enchanced request, noting else keep it concise(1-2 sentence)`
                },
                {
                    role:"user",
                    content:`User's request: ${message}`
                }
            ]
        })
        
        const enhancePrompt =promtEnhanceResponse.choices[0].message.content||"No code generated"

        await prisma.conversation.create({
            data:{
                role:"assistant",
                content:`I've enhanced your prompt to:${enhancePrompt}`||"No prompt provided",
                projectId:currentProject.id
            }
        })
        await prisma.conversation.create({
            data:{
                role:"assistant",
                content:"Now making changes to your website",
                projectId:currentProject.id
            }
        })
        
        const codeGenerationResponse = await openai.chat.completions.create({
            model:'openai/gpt-oss-120b:free',
            messages:[
                {
                    role:"system",
                    content:`You are a senior full stack web developer. 
                    
                    CRITICAL REQUIREMENTS:
                    - Return ONLY the complete update HTML code with requested changes.
                    - Use Tailwind CSS for all styling (NO CUSTOM CSS)
                    - Use Tailwind utility classes for all styling changes.
                    - Include all JavaScript in <script> tags before closing </body>
                    - Make sure it's a complete, standalone HTML document with Tailwind CSS
                    - Return the HTML Code only nothing else
                        
                    Apply the requested changes while maintaining the Tailwind CSS styling approach`
                },
                {
                    role:"user",
                    content:`Current codebase:
                    ${currentProject.current_code}

                    Changes requested:
                    ${enhancePrompt}

                    Please provide the complete new codebase with the changes implemented.`
                }
            ]
        })

        const code = codeGenerationResponse.choices[0].message.content||"No code generated"
        if (!code) {
            await prisma.conversation.create({
            data:{
                role:'assistant',
                content:"Unable to gernate the code, please try again",
                projectId
            }
            })
            await prisma.user.update({
                where:{id:userId},
                data:{
                    credits:{increment:5}
                }
            })
        }
        const version =await prisma.version.create({
            data:{
                code:code.replace(/```[a-z]*\n?|```/gi,'')
                .replace(/```$/g, "")
                .trim(),
                description:"Changes made",
                projectId
            }
        })
        await prisma.conversation.create({
            data:{
                role:'assistant',
                content:"I've made the changes you requested!",
                projectId:currentProject.id
            }
        })
        await prisma.websiteProject.update({
            where:{id:projectId},
            data:{
                current_code:code.replace(/```[a-z]*\n?|```/gi,'')
                .replace(/```$/g, "")
                .trim(),
                current_version_index:version.id
            }
        })


        res.json({message:"Changes made successfully"})

    } catch (error:any) {
        await prisma.user.update({
            where:{id:userId},
            data:{
                credits:{increment:5}
            }
        })
        console.log(error.code||error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

//Controller to role back to specific version

export const rollbackToVersion=async (req:Request, res:Response) => {
    try {
        const userId=req.userId
        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }
        const projectId= req.params.projecId as string
        const project = await prisma.websiteProject.findUnique({
            where:{
                id:projectId,
                userId
            },
            include:{
                versions:true
            }
        })
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        const versionId= req.params.versionId as string
        const version = project.versions.find((v)=>v.id===versionId)
        if(!version){
            return res.status(404).json({message:"Version not found"})
        }
        await prisma.websiteProject.update({
            where:{id:projectId},
            data:{
                current_code:version.code,
                current_version_index:version.id
            }
        })
        await prisma.conversation.create({
            data:{
                role:"assistant",
                content:`Rolled back to version ${version.description}`,
                projectId:project.id
            }
        })
        res.json({message:"Rolled back successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

// Controller function to delete project

export const deleteProject=async (req:Request, res:Response) => {
    try {
        const userId=req.userId
        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }
        const projectId= req.params.projectId as string
        await prisma.websiteProject.delete({
            where:{
                id:projectId,
                userId
            }
        })
        res.json({message:"Project deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

// Controller for getting project code for preview

export const getProjectPreview=async (req:Request, res:Response) => {
    try {
        const userId=req.userId
        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }
        const projectId= req.params.projectId as string
        const project = await prisma.websiteProject.findFirst({
            where:{
                id:projectId,
                userId
            },
            include:{
                versions:true
            }
        })
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        res.json({project})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

//Get published project

export const getPublishedProject=async (req:Request, res:Response) => {
    try {
        
        const project = await prisma.websiteProject.findMany({
            where:{
                isPublished:true
            },
            include:{
                user:true
            }
        })
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        res.json({project})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

//get a single project by id

export const getSingleProject=async (req:Request, res:Response) => {
    try {
        const userId=req.userId
        const projectId= req.params.projectId as string
        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }
        const project = await prisma.websiteProject.findFirst({
            where:{
                id:projectId,
            }
        })
        if(!project||project.isPublished===false||!project.current_code){
            return res.status(404).json({message:"Project not found"})
        }
        res.json({code:project.current_code})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

// Controller to save project code

export const saveProjectCode=async (req:Request, res:Response) => {
    try {
        const userId=req.userId
        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }
        const projectId= req.params.projectId as string
        const {code}=req.body
        if(!code||code.trim()===''){
            return res.status(400).json({message:"Code is required"})
        }
        const project = await prisma.websiteProject.update({
            where:{
                id:projectId,
                userId
            },
            data:{
                current_code:code,
                current_version_index:''
            }
        })
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        res.json({message:"Code saved successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}