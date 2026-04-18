import React, { useState } from "react"
import Title from "../components/Title"
import UploadZone from "../components/UploadZone"

const Generator = () => {

    const [name,setName]=useState('')

    const [productName,setProductName]=useState('')

    const [productDescription,setProductDescription]=useState('')

    const [aspectRatio,setAspectRatio]=useState('')

    const [productImage,setProductImage]=useState<File | null>(null)

    const [modelImage,setModelImage]=useState<File | null>(null)

    const [ userPrompt , setUserPrompt] = useState('')

    const [isGenerating , setIsGenerating] = useState(false)

    const handleFileChange = (e :React.ChangeEvent<HTMLInputElement>,type:'product' | 'model')=>{
        if(e.target.files && e.target.files[0]){
            if(type === 'product') setProductImage(e.target.files[0])
            else setModelImage(e.target.files[0])
        }
    }


    const handleGenerate = async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

    }


  return (
    <div className="min-h-screen text-white p-6 md:p-12 mt-28">
      
      <form onSubmit={handleGenerate} className="max-w-4xl mx-auto mb-40">
        <Title heading="Create In-Context Image" description="Upload your model and product images to generate stunning UGC, short-form videos and social media posts"/>

            <div className="flex gap-20 max-sm:flex-col items-start justify-between">

                <div className="flex flex-col w-full sm:max-w-60 gap-8 mt-8 mb-12">
                   <UploadZone file={productImage} onClear={()=>setProductImage(null)} onChange={(e)=>handleFileChange(e,"product")} label="Product Image"/>
                   <UploadZone file={modelImage} onClear={()=>setModelImage(null)} onChange={(e)=>handleFileChange(e,"model")} label="Model Image"/>
                  
                </div>
{/* right col */}
                <div className="w-full ">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm mb-4">Project Name</label>
                    <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name Your Project" required className="w-full bg-white/3 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all"/>
                  </div>
                  
                </div>
            </div>

      </form>
      <form onSubmit={handleGenerate} className="max-w-4xl mx-auto mb-40">
        <Title heading="Create In-Context Image" description="Upload your model and product images to generate stunning UGC, short-form videos and social media posts"/>

            <div className="flex gap-20 max-sm:flex-col items-start justify-between">

                <div className="flex flex-col w-full sm:max-w-60 gap-8 mt-8 mb-12">
                   <UploadZone file={productImage} onClear={()=>setProductImage(null)} onChange={(e)=>handleFileChange(e,"product")} label="Product Image"/>
                   <UploadZone file={modelImage} onClear={()=>setModelImage(null)} onChange={(e)=>handleFileChange(e,"model")} label="Model Image"/>
                  
                </div>
{/* right col */}
                <div className="w-full ">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm mb-4">Project Name</label>
                    <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name Your Project" required className="w-full bg-white/3 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all"/>
                  </div>
                  
                </div>
            </div>

      </form>
    </div>
  )
}

export default Generator
