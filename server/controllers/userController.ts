import { Request, Response } from "express"
import prisma from "../lib/prisma.js";
import openai from "../config/OpenAI.js";
import Stripe from "stripe";



//get user credits
export const getUserCredits=async (req:Request,res:Response) => {
    try {
        const userId =req.userId;
        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }

        const user =await prisma.user.findUnique({
            where:{id:userId},
        })

        res.json({credits:user?.credits})

    } catch (error:any) {
        console.log(error.code||error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const createUserProject=async (req:Request,res:Response) => {
    
    const userId =req.userId;
    try {
        const {initial_prompt}=req.body
        
        if (!userId) {
            console.log("user")
            return res.status(401).json({message:"Not authorized"})
        }

        const user =await prisma.user.findUnique({
            where:{id:userId},
        })

        if(user?.credits&&user.credits<5){
            return res.status(403).json({message:"Not enough credits"})
        }
        //create new project
        const project = await prisma.websiteProject.create({
            data:{
                name:initial_prompt.length>50 ?initial_prompt.substring(0,47)+'...':initial_prompt,
                initial_prompt,
                userId
            }
        })
        
        //update user credits
        await prisma.user.update({
            where:{id:userId},
            data:{
                totalCreation:{increment:1}
            }
        })
        console.log("hellow")
        await prisma.conversation.create({
            data:{
                role:"user",
                content:initial_prompt,
                projectId:project.id
            }
        })
        console.log('hellow2')
        await prisma.user.update({
            where:{id:userId},
            data:{
                credits:{decrement:5}
            }
        })
        console.log('hellow3')
        //enhance user prompt
        const promptEnhaceResponse =await openai.chat.completions.create({
            model:"openai/gpt-oss-120b:free",
            messages:[
                {
                    role:"user",
                    content:`You ar a prompt enhancement specialist. Take the user's website requst and expand it into a detailed, comprehensive prompt that will help create the best possible website.
                    
                    Enhance this prompt by:
                    1. Adding specific design details(layout, color scheme, typography)
                    2. specifying key sections and features
                    3. describing the user experience and interactions
                    4. including modern web design best practices
                    5. Mentioning responsive design requirments
                    6. Adding any missing but important elemets
                    
                    return only the enhanced prompt, noting else. Make it detailed but concise (2-3 paragraphs max).`
                },{
                    role:"user",
                    content:initial_prompt
                }
            ]
        })
        if(!promptEnhaceResponse.choices[0].message.content){
            return res.status(400).json({message:"No prompt generated"})
        }
        const enhancedPrompt = promptEnhaceResponse?.choices?.[0]?.message?.content || initial_prompt;
        
        await prisma.conversation.create({
            data:{
                role:"assistant",
                content:`I've enhanced your prompt to:${enhancedPrompt}`||"No prompt provided",
                projectId:project.id
            }
        })
        await prisma.conversation.create({
            data:{
                role:"assistant",
                content:'now gererating your website...',
                projectId:project.id
            }
        })

        const codeGenerationRespponse = await openai.chat.completions.create({
            model:"openai/gpt-oss-120b:free",
            messages:[
                {
                    role:'system',
                    content:`
                    You are an expert web developer. Create a complete production ready, single-page website based on this request:
                    ${enhancedPrompt}
                    
                    CRITICAL REQUIREMENT:
                    -you MUST output valid HTML only
                    -use tailwind css for all styling
                    -Include this exact script in the <head>:<script src='https:/cdn.jsdelivr.net/npm/@tailwindcss//browser@4"></script>
                    - Use Tailwind utility classes extensively for styling,animations, and responsiveness
                    - Make it fully functional and interactive with JavaScript in <script>tag before closing </body>
                    - Use modern, beautiful design with great UX using Tailwind classes
                    - Make it responsive using Tailwind responsive classes (sm:,md:,lg:, xl:)
                    - Use tailwind animation and transitions(animate-*,transiton-*)
                    - Include all necessary meta tags
                    - Use Google font CDN if needed for custum fonts
                    - Use placeholder images from https://placehold.com/600x400
                    - Use tailwind gradient classes for beautify backgrounds 
                    - Make sure all buttonsm card m and components use Tailwind styling
                    
                    CRITICAL HARD RULE:
                    1. You MUST put ALL output only into message.content.
                    2. You MUST NOT place anyting in "reasoning","analysis", "reasoning_details", or any hidden fields.
                    3. You MUST NOT include internal thoughts,explanations, analysis, comments or markdown.
                    4. DO NOT include markdown, explanations, notes or code fences,
                    
                    The HTML should be complete and ready to render as-is with Tailwind CSS.`
                },{
                    role:"user",
                    content:enhancedPrompt||""             
                }
            ]
        })
        const code =codeGenerationRespponse.choices[0].message.content||"No code generated"
        if (!code) {
            await prisma.conversation.create({
            data:{
                role:'assistant',
                content:"Unable to gernate the code, please try again",
                projectId:project.id
            }
            })
            await prisma.user.update({
                where:{id:userId},
                data:{
                    credits:{increment:5}
                }
            })
            return res.status(500).json({message:"Code generation failed"})
        }
        // create versions for the project

        const version = await prisma.version.create({
            data:{
                code:code.replace(/```[a-z]*\n?|```/gi,'')
                .replace(/```$/g, "")
                .trim(),
                description:"Initial version",
                projectId:project.id
            }
        })
        await prisma.conversation.create({
            data:{
                role:'assistant',
                content:"I've created your website! You can now preview it and request any changes",
                projectId:project.id
            }
        })

        await prisma.websiteProject.update({
            where:{id:project.id},
            data:{
                current_code:code.replace(/```[a-z]*\n?|```/gi,'')
                .replace(/```$/g, "")
                .trim(),
                current_version_index:version.id
            }
        })
        res.json({project,version})
    } catch (error:any) {
        await prisma.user.update({
            where:{id:userId},
            data:{
                credits:{increment:5}
            }
        })
        console.log(error||error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

// controller function to get a single user project

export const getUserProject=async (req:Request, res:Response) => {
    try {
        const userId =req.userId;
        
        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }

        const projectId  = req.params.projectId as string;

        const project=await prisma.websiteProject.findUnique({
            where:{
                id:projectId,
                userId
            },
            include:{
                conversations:{
                    orderBy:{timestamp:'asc'}
                },
                versions:{
                    orderBy:{
                        timestamp:'asc'
                    }
                }
            }
        })

        res.json({project})
        
    } catch (error:any) {
        console.log(error.code||error.message)
        res.status(500).json({message:"Internal server error"})
    }
}


//to get all user projects

export const getUserProjects=async (req:Request, res:Response) => {
    try {
        const userId =req.userId;

        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }

        const projects=await prisma.websiteProject.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:'desc'
            }
        })

        res.json({projects})

    } catch (error:any) {
        console.log(error.code||error.message)
        res.status(500).json({message:"Internal server error"})
    }
}


//controler function to toggle project publish

export const togglePublishProject=async (req:Request, res:Response) => {
    try {
        const userId =req.userId;

        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }

        const projectId  = req.params.projectId as string;

        const project=await prisma.websiteProject.findUnique({
            where:{
                id:projectId,
                userId
            }
        })

        if(!project){
            return res.status(404).json({message:"Project not found"})
        }

        await prisma.websiteProject.update({
            where:{
                id:projectId,
                userId
            },
            data:{
                isPublished:!project.isPublished
            }
        })

        res.json({message:project.isPublished?"Project Unpublished":"Project Published"})

    } catch (error:any) {
        console.log(error.code||error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

//controler function to purchese creadits
export const purchaseCredits=async (req:Request, res:Response) => {
    try {
        interface Plan {
            credits: number;
            amount: number;
        }

        const plans:Record<string,Plan> = {
            Basic:{
                credits:100,
                amount:5
            },
            Pro:{
                credits:400,
                amount:19
            },
            Premium:{
                credits:1000,
                amount:49
            }
        }
        const userId =req.userId;

        if (!userId) {
            return res.status(401).json({message:"Not authorized"})
        }
        const {planId} = req.body as {planId: keyof typeof plans};
        console.log(planId)
        const origin = req.headers.origin as string
        const plan:Plan=plans[planId];
        if (!plan) {
            return res.status(400).json({message:"Plan not found"})
        }
        const transaction = await prisma.transaction.create({
            data:{
                userId:userId,
                planId:req.body.planId,
                amount:plan.amount,
                credits:plan.credits
            }
        })
        const stripe =new Stripe(process.env.STRIPE_SECRET_KEY||"");
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/loading`,
            cancel_url: `${origin}/`,
            line_items: [
                {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:`${plan.credits} Credits for Website Builder`
                    },
                    unit_amount:plan.amount*100
                },
                quantity:1
                },
            ],
            mode: 'payment',
            metadata:{
                transactionId:transaction.id,
                appId:"website-builder"

            },
            expires_at:Math.floor(Date.now()/1000)+30*60 // 30 minutes from now
            });
        res.json({payment_link:session.url})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
