import React, { useEffect } from 'react'
import type { EditorPanelProps } from '../types'
import { XIcon } from 'lucide-react'

const EditorPanel = ({selectedElement, onUpdate, onClose}:EditorPanelProps) => {

    const [values, setValues] = React.useState<any>({
        text: '',
        className: '',
        style: {}
    });

    useEffect(() => {
    if (selectedElement) {
        setValues({
            text: selectedElement.text || '',
            className: selectedElement.className || '',
            style: selectedElement.style || {}
        });
    }
}, [selectedElement]);

    if (!selectedElement) return null;
    const handleChange = (field: string, value: string) => {
    const newValues = {
        ...values,
        [field]: value
    };

    setValues(newValues);

    onUpdate({ [field]: value });
};
    const handleStyleChange = (styleName: string, value: string) => {
    const newStyle = {
        ...(values.style || {}),
        [styleName]: value
    };

    const newValues = {
        ...values,
        style: newStyle
    };

    setValues(newValues);

    onUpdate({ style: { [styleName]: value } });
};
  return (
    <div className='absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-fade-in fade-in'>
        <div className='relative flex justify-between items-center mb-4'>
            <h3 className='font-semibold text-gray-800'>Edit Element</h3>
            <button onClick={onClose} className='p-1 hover:bg-gray-100 rounded-full'>
                <XIcon className='size-4 text-gray-600'></XIcon>
            </button>
        </div>
        <div className='space-y-4 text-black'>
            <div>
                <label htmlFor="" className='block text-xs font-medium text-gray-500 mb-1'>Content</label>
                <textarea value={values.text||''} className='w-full text-sm p-2 border border-gray-400  rounded-md focus:ring-2 focus:ring-indigo-500 outline-none min-h-20' onChange={(e)=>handleChange('text',e.target.value)}></textarea>
            </div>
            <div>
                <label className='block text-xs font-medium text-gray-500 mb-1'>Class Name</label>
                <input type='text' value={values.className||''} className='w-full text-sm p-2 border rounded-md border-gray-400  focus:ring-2 focus:ring-indigo-500 outline-none min-h-10' onChange={(e)=>handleChange('className',e.target.value)} />
            </div>
            <div className='grid grid-cols-2 gap-3'>
                           
            </div>
            
            <div className='grid grid-cols-2 gap-3'>
                <div className=''>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Padding</label>
                <input 
                    type='text' 
                    value={values.style?.padding||''} 
                    className='w-full text-sm p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none min-h-10' 
                    onChange={(e)=>handleStyleChange('padding',e.target.value)} />
                </div> 
                <div className=''>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Margin</label>
                <input 
                    type='text' 
                    value={values.style?.margin} 
                    className='w-full text-sm p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none min-h-10' 
                    onChange={(e)=>handleStyleChange('margin',e.target.value)} />
            </div> 
                <div className=''>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Font size</label>
                <input 
                    type='text' 
                    value={values.style?.fontSize} 
                    className='w-full p-2 text-sm border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none min-h-10' 
                    onChange={(e)=>handleStyleChange('fontSize',e.target.value)} />
                </div> 
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div className=''>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Background</label>
                    <div className='flex items-center gap-2 border border-gray-400 rounded-md p-1'>
                        <input 
                        type='color' 
                        value={values.style?.backgroundColor==='rgba(0, 0, 0, 0)'?'#ffffff':values.style?.backgroundColor} 
                        className='w-6 h-6 rounded cursor-pointer ' 
                        onChange={(e)=>handleStyleChange('backgroundColor',e.target.value)} />
                        <span className='text-sm text-gray-600 truncate'>{values.style?.backgroundColor}</span>
                    </div>
                </div> 
                <div className=''>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Text color</label>
                    <div className='flex items-center gap-2 border border-gray-400 rounded-md p-1'>
                        <input 
                        type='color' 
                        value={values.style?.color} 
                        className='w-6 h-6 rounded cursor-pointer ' 
                        onChange={(e)=>handleStyleChange('color',e.target.value)} />
                        <span className='text-sm text-gray-600 truncate'>{values.style?.color}</span>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default EditorPanel