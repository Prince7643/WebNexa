import * as  React from 'react'
import  { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Project, ProjectPreviewRef } from '../types';
import { ArrowBigDownDashIcon, EyeIcon, EyeOffIcon, FullscreenIcon, LaptopIcon, Loader2Icon, MessageSquareIcon, SaveIcon, SmartphoneIcon, TabletIcon, XIcon, PencilIcon, PencilOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ProjectPreview from '../components/ProjectPreview';
import api from '../configs/axios';
import { toast } from 'sonner';
import { authClient } from '../lib/auth-client';

const Projects = () => {
  const {projectId} = useParams();
  const navigate = useNavigate();
  const {data:session,isPending}=authClient.useSession()
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isGenerating, setIsGenerating] = React.useState(true);
  const [device, setDevice] = React.useState<'phone' | 'tablet' | 'desktop'>('desktop');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const previewRef = React.useRef<ProjectPreviewRef>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  console.log( "Project:",project?.isPublished)
  const fetchProject = async () => {
    try {
      const {data} = await api.get(`/api/user/project/${projectId}`)
      setProject(data.project)
      setIsGenerating(data.project.current_code?false:true)
      setLoading(false)
    } catch (error:any) {
      toast.error(error?.response?.data?.message||error.message)
      console.log(error);
    }
  }
  const saveProject=async()=>{
    if (!previewRef.current) return
    const code = previewRef.current.getCode()
    if (!code) return
    setIsSaving(true)
    try {
      const {data} = await api.post(`/api/project/save/${projectId}`,{code})
      toast.success(data.message)

    } catch (error:any) {
      toast.error(error?.response?.data?.message||error.message)
      console.log(error);
    }finally{
      setIsSaving(false)
    }
  
  }
  const downloadProject = () => {
    const code = previewRef.current?.getCode()||project?.current_code
    if (!code) {
      if(isGenerating){
        return
      }
      return
    }
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = 'index.html';
    document.body.appendChild(element);
    element.click();
  }
  const editsPanelOpen=()=>{
    setIsEditing(!isEditing)
    
  }
  const togglePublish = async () => {
    try {
      const {data} = await api.post(`/api/user/publish-toggle/${projectId}`)
      console.log('data:',data.message,data)
      toast.success(data.message)
      setProject((prev)=>prev?({...prev,isPublished:!prev.isPublished}):null)
    } catch (error:any) {
      toast.error(error?.response?.data?.message||error.message)
      console.log(error);
    }finally{
      setIsSaving(false)
    }
  }
  useEffect(  ()=>{
    if(session?.user) {
      fetchProject()
    }else if(!isPending&&!session?.user){
      navigate('/')
      toast.error('Please login to continue')
    }
    
  },[session?.user])

  useEffect(() => {
    if(project&&!project.current_code){
      const intervalId = setInterval(fetchProject,10000);
      return () => clearInterval(intervalId);
    }
  }, [projectId])

  if (loading) {
    return(
      <>
        <div className='flex justify-center items-center h-screen'>
          <Loader2Icon className='size-7 animate-spin text-violet-200'></Loader2Icon>  
        </div>
      </>
    )
  }
  return project ? (
    <div className='flex flex-col h-screen w-full text-white'>
      {/**Builder navbar */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollbar ">
        {/**left */}
        <div className='flex items-center gap-2 sm:min-w-90 text-nowrap'>
          <img src="/favicon.svg" alt="logo"  className='h-6 cursor-pointer' onClick={()=>navigate('/')}/>
          <div>
            <p className='text-sm text-medium capitalize truncate'>{project.name}</p>
            <p className='text-xs text-gray-400 -mt-0.5'>Previewing last saved version</p>
          </div>
          <div className='sm:hidden flex-1 flex justify-end'>
            {isMenuOpen ? <MessageSquareIcon onClick={()=>setIsMenuOpen(false)} className='size-6 cursor-pointer'/>:<XIcon onClick={()=>setIsMenuOpen(true)} className='size-6 cursor-pointer'/>}
          </div>
          
        </div>  
        {/**center */}
        <div className='hidden sm:flex gap-2 bg-gray-950 p-1.5 rounded-md'>
          <SmartphoneIcon onClick={()=>setDevice('phone')} className={`size-6 p-1 cursor-pointer rounded ${device === 'phone' ? 'bg-gray-700' : ''}`}></SmartphoneIcon>
          <TabletIcon onClick={()=>setDevice('tablet')} className={`size-6 p-1 cursor-pointer rounded ${device === 'tablet' ? 'bg-gray-700' : ''}`}></TabletIcon>
          <LaptopIcon onClick={()=>setDevice('desktop')} className={`size-6 p-1 cursor-pointer rounded ${device === 'desktop' ? 'bg-gray-700' : ''}`}></LaptopIcon>
        </div>
        {/**right */}
        <div className='flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm'>
          <button onClick={editsPanelOpen} className='bg-linear-to-br from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors'>
            {isEditing ? ( <><PencilIcon size={16}  />Edits</>) :(<><PencilOff size={16} />No Edits</>)}
          </button>
          <button onClick={saveProject} disabled={isSaving} className='max-sm:hidden bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-gray-700'>
            {isSaving ? <Loader2Icon className='size-4 animate-spin'></Loader2Icon> : <SaveIcon size={16} />}
            Save
          </button>
          <Link className='flex items-center gap-2 px-4 py-1 rounded sm:rounded-sm border border-gray-700 hover:border-gray-500 transition-colors' target='_blank' to={`/preview/${project.id}`}> 
            <FullscreenIcon size={16}/>Preview
          </Link>
          <button onClick={downloadProject} className='bg-linear-to-br from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors'>
            <ArrowBigDownDashIcon size={16}/>Download
          </button>
          <button onClick={togglePublish} className='bg-linear-to-br from-indigo-700 to-indigo-600 hover:from-indigo-600 hover:to-indigo-600 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors'>
            {project.isPublished ?  <EyeOffIcon size={16} />:<EyeIcon size={16} />}
            {project.isPublished ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>
      <div className='flex-1 flex overflow-auto'>
        {/** sidebar */}
        <Sidebar 
          isMenuOpen={isMenuOpen}
          project={project}
          setProject={(p)=>setProject(p)}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        <div className='flex-1 p-2 pl-0'>
          <ProjectPreview ref={previewRef} showEditorPanel={isEditing} project={project} isGenerating={isGenerating} device={device}></ProjectPreview>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-2xl font-medium text-gray-200'>Unable to load project!</p>
    </div>
  );
}

export default Projects