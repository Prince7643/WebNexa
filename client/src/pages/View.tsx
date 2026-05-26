import * as  React from 'react'
import { useParams } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import ProjectPreview from '../components/ProjectPreview';
import type { Project } from '../types';
import api from '../configs/axios';
import { toast } from 'sonner';

const View = () => {
  const {projectId} = useParams();
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const fetchCode = async () => {
    try {
        const {data} = await api.post(`/api/project/published/${projectId}`)
        setCode(data.code)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch project')
        console.log(error)
      }
  }

  React.useEffect(() => {
    fetchCode();
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

  return (
    <div className='h-screen'>{code && <ProjectPreview project={{current_code:code} as Project} isGenerating={false}  showEditorPanel={false} />}</div>
  )
}

export default View