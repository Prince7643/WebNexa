import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import type { ProjectPreviewProps } from '../types'
import type { ProjectPreviewRef } from '../types'
import EditorPanel from './EditorPanel'
import LoaderSteps from './LoaderSteps'
import { iframeScripts } from '../assets/assets'


const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(({project, device='desktop', isGenerating,showEditorPanel},ref) => {
    
    const [selectedElement, setSelectedElement] = React.useState(null);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);

    const handleUpdate=(updatedFields:any)=>{
        if(iframeRef.current?.contentWindow){
            iframeRef.current.contentWindow.postMessage({
            type: 'UPDATE_ELEMENT',
            payload: { updatedFields }
        }, '*')
        } 
    }
    
    

    const injectPreview =(html:string)=>{
        if(!html) return;
        
        if (html.includes('</body>')) {
            return html.replace('</body>', iframeScripts + `</body>`)
        }
        else{
            return html + iframeScripts;
        }
    }
    const resolution =  {
        phone: 'w-[412px]',
        tablet: 'w-[768px]',
        desktop: 'w-full'
    };

    useImperativeHandle(ref, () => ({
        getCode:() => {
            const doc = iframeRef.current?.contentDocument;
            if (!doc) {
                return '';
            }
            doc.querySelectorAll('.ai-selected-element').forEach((el) => {el.classList.remove('ai-selected-element')
                el.removeAttribute('data-ai-selected');
                (el as HTMLElement).style.outline = '';
            });

            const previewStyle = doc.getElementById('ai-preview-style');
            if(previewStyle){
                previewStyle.remove();
            }
            const previewScript = doc.getElementById('ai-preview-script');
            if(previewScript){
                previewScript.remove();
            }
            const html = doc.documentElement.outerHTML;
            return html;
        }
    }))
console.log("Editing:", showEditorPanel);
    useEffect(() => {
        const handlemessage=(event:MessageEvent)=>{
            if (event.data.type === 'NAVIGATE') {
            const href = event.data.payload.href;

            if (!href) return;

            // fetch new page HTML (IMPORTANT)
            fetch(href)
                .then(res => res.text())
                .then(html => {
                    if (iframeRef.current) {
                        iframeRef.current.srcdoc = injectPreview(html) ?? '';
                    }
                });
        }
            if(event.data.type==='ELEMENT_SELECTED'){
                setSelectedElement(event.data.payload);
            }
            else if(event.data.type==='CLEAR_SELECTION'){
                // setCode(event.data.playload);
                setSelectedElement(null);
            }
        }
        window.addEventListener('message', handlemessage);
            return()=>{
                window.removeEventListener('message', handlemessage);
            }
    }, [project.current_code])

    useEffect(() => {
        const iframe = iframeRef.current;

        if (!iframe) return;

        const sendEditMode = () => {
            iframe.contentWindow?.postMessage({
                type: 'SET_EDIT_MODE',
                payload: { enabled: showEditorPanel }
            }, '*');
        };

        // small delay ensures iframe script is ready
        const timeout = setTimeout(sendEditMode, 100);

        return () => clearTimeout(timeout);
    }, [showEditorPanel]);
  return (
    <div className='relative h-full bg-gray-900 flex-1 rounded-xl overflow-hidden max-sm:ml-2'>
        {project.current_code ? (
            <>
            <iframe 
            
                ref={iframeRef} 
                srcDoc={injectPreview(project.current_code)} 
                onLoad={() => {
                    iframeRef.current?.contentWindow?.postMessage({
                        type: 'SET_EDIT_MODE',
                        payload:{enabled:showEditorPanel}
                    }, '*')
                }}
                className={`h-full 
             max-sm:w-full ${resolution[device]} mx-auto transition-all`}/>

                {showEditorPanel && selectedElement && ( 
                    <EditorPanel 
                        selectedElement={selectedElement}
                        onUpdate={handleUpdate} 
                        onClose={()=>{
                        setSelectedElement(null)
                        if(iframeRef.current?.contentWindow){
                            iframeRef.current.contentWindow.postMessage({type:'CLEAR_SELECTION_REQUEST'},'*')
                        }
                    }}/>)
                }
            </>
        ) : isGenerating&&(
            <LoaderSteps></LoaderSteps>
        )}
    </div>
  )
})

export default ProjectPreview