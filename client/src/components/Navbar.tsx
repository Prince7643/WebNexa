import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import {UserButton} from '@daveyplate/better-auth-ui'
import api from '../configs/axios'
import { toast } from 'sonner'
const Navbar = () => {
    const Navigate=useNavigate()
    const [menuOpen,setMenuOpen]=React.useState(false)
    const {data:session}=authClient.useSession()
    const [credits,setCredits]=React.useState(0)
    const getCreadits =async () => {
        try {
            const {data} = await api.get('/api/user/credits')
            setCredits(data.credits)
        } catch (error:any) {
            toast.error(error.message?.data?.message||error.message)
            console.log(error)
        }
    }
    useEffect(()=>{
        if(session?.user){
            getCreadits()
        }
    },[session?.user])
  return (
    <>
         <nav className="flex flex-col items-center w-full" >
        <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
            <Link to="/">
                <div className='flex gap-3 justify-center items-center'>
                    <img src="favicon.svg" alt="" className='h-9 sm:h-11 ' />
                    <span className="text-xl font-bold text-white">WebNexa - AI Site Builder </span>
                </div>
            </Link>
            <div id="menu" className="max-md:w-0 max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm">
                <Link to="/" className="menu-item text-white/70 hover:text-white/80">Home</Link>
                <Link to="/projects" className="menu-item text-white/70 hover:text-white/80">My Projects</Link>
                <Link to="/community" className="menu-item text-white/70 hover:text-white/80">Community</Link>
                <Link to="/pricing" className="menu-item text-white/70 hover:text-white/80 mr-6">Pricing</Link>
                <div className='p-[0.5px]  rounded-full'>
                    {!session?(
                        <button onClick={()=>Navigate('/auth/signup')} className="hidden md:flex items-center gap-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-800 font-medium px-4 py-2.5 rounded-full text-sm transition cursor-pointer group">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.795.605v2.593m1.245-1.296h-2.488M1.845 13.565c.687 0 1.244-.58 1.244-1.296s-.557-1.296-1.244-1.296-1.244.58-1.244 1.296.557 1.296 1.244 1.296M6.209 1.13a.65.65 0 0 1 .214-.379.61.61 0 0 1 .795 0 .66.66 0 0 1 .214.38l.653 3.601c.047.256.166.492.343.676s.403.309.649.357l3.456.681a.62.62 0 0 1 .364.223.665.665 0 0 1 0 .828.62.62 0 0 1-.364.223l-3.456.681a1.23 1.23 0 0 0-.65.358c-.176.184-.295.42-.342.675l-.653 3.602a.65.65 0 0 1-.214.38.61.61 0 0 1-.795 0 .65.65 0 0 1-.214-.38l-.654-3.602a1.3 1.3 0 0 0-.342-.675 1.23 1.23 0 0 0-.649-.358l-3.456-.68a.62.62 0 0 1-.365-.224.665.665 0 0 1 0-.828.62.62 0 0 1 .365-.223l3.456-.68c.246-.05.472-.174.649-.358s.296-.42.342-.676z" stroke="#1e2939" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                            <div className="relative overflow-hidden">
                            <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                                Get Started
                            </span>
                            <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">
                                Get Started
                            </span>
                        </div>
                    </button>):(
                        <div className=''>
                            <button className='bg-black px-5 py-1.5 text-sm sm:text-sm border text-gray-200 rounded-full'>Credits : <span className='text-indigo-300'>{credits}</span></button>

                            <UserButton className='bg-white ml-5' classNames={{
                            content:{
                                base:"bg-white",
                            }
                            }} size={'icon'} />
                        </div>
                    )
                    }
                </div>
            </div>

            <button id="open-menu" className="md:hidden bg-gray-900 hover:bg-gray-800 text-gray-50 p-2 rounded-md aspect-square font-medium transition" onClick={()=>setMenuOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                </svg>
            </button>
        </div>
    </nav>
    </>
  )
}

export default Navbar