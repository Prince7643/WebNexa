export interface User{
    id:string;
    email:string;
    fullName?:string;
    imageUrl?:string;
    name?:string;
    image?:string;
}

export interface Message {
    id: string;
    role:any;
    content: string;
    timestamp: string;
}

export interface Version{
    id:string;
    timestamp:string;
    code:string;
    role:string
}

export interface Project{
    id:string;
    name:string;
    initial_prompt:string;
    current_code:string;
    updatedAt:string;
    createdAt:string;
    userId:string;
    user?:User;
    isPublished:boolean;
    versionId?:string;
    conversations?:Message[];
    version?:Version[];
    current_version_index?:string;
}

export interface Plan{
    id:string;
    name:string;
    price:string;
    credits:number;
    description:string;
    features:string[];
}

export interface sidebarProps{
    isMenuOpen:boolean;
    project:Project;
    setProject:(project:Project)=>void;
    isGenerating:boolean;
    setIsGenerating:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProjectPreviewProps{
    project:Project;
    device?:'phone'|'tablet'|'desktop';
    isGenerating:boolean;
    showEditorPanel?:boolean;
}

export interface ProjectPreviewRef{
    getCode:()=>string|undefined;
}

export interface EditorPanelProps{
    selectedElement:{
        tagname:string;
        className:string;
        text:string;
        style:{
            padding:string;
            margin:string;
            backgroundColor:string;
            color:string;
            fontSize:string;
        };
        onupdate:(updates:any)=>void;
        onClose:()=>void;
    };
    onUpdate:(updatedElement:any)=>void;
    onClose:()=>void;
}