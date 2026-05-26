import * as  React from 'react'
import { useParams } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import type { Project, Version } from '../types';
import ProjectPreview from '../components/ProjectPreview';
import api from '../configs/axios';
import { toast } from 'sonner';
import { authClient } from '../lib/auth-client';

const Preview = () => {
  const {data:session,isPending}=authClient.useSession()
  const {projectId,versionId} = useParams();
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const fetchCode = async () => {
      try {
        const {data} = await api.post(`/api/project/preview/${projectId}`)
        setCode(data.project.current_code)
        if(versionId){
          data.project.version.forEach((version:Version)=>{
            if(version.id===versionId){
              setCode(version.code)
            }
          })
        }
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch project')
        console.log(error)
      }
    }
    React.useEffect(()=>{
      if(session?.user&&!isPending) {
        fetchCode()
      }else if(!isPending&&!session?.user){
        window.location.href='/'
      }
    },[session?.user])
    if (loading) {
    return(
      <>
        <div className='flex justify-center items-center h-screen'>
          <Loader2Icon className='size-7 animate-spin text-violet-200'></Loader2Icon>  
        </div>
      </>
    )
  }

  return (
    <div className='h-screen'>{code && <ProjectPreview project={{current_code:code} as Project} isGenerating={false}  showEditorPanel={false} />}</div>
  )
}

export default Preview