import React, { useState, useRef, useContext, FormEvent, ChangeEvent } from 'react'
import Image from "next/image"

import { AuthContext } from "../../context/auth-context"
import { formatSizeUnits } from '../../utils/functions'

import Button from '../ui/shared/Button/Button'

type Props = {
    handleFormSubmit: (e: FormEvent, text: string | undefined, files: File[]) => void
}

const readUploadedFileAsDataUrl = (inputFile: any) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsDataURL(inputFile);
    });
};

const getImgUrl = async (file: File) => {
    try {
        const res = await readUploadedFileAsDataUrl(file)
        return res;
    } catch (e) {
        console.error(e)
    }
}


const NewPostForm = ({ handleFormSubmit }: Props) => {
    const userDetails = useContext(AuthContext).authState;

    const [files, setFiles] = useState<
        {
            files: File[],
            preview: { url: string, name: string, size: number }[]
        }
    >({ files: [], preview: [] });
    const textRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        await handleFormSubmit(e, textRef.current?.value, files.files)
        if (textRef.current) {
            textRef.current.value = ""
        }
        setFiles({ files: [], preview: [] });
    }

    const clearForm = () => {
        if (textRef.current) {
            textRef.current.value = ""
        }
        setFiles({ files: [], preview: [] })
    }

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        let target_files: File[] = Array.from(event.target.files || [])

        const tmp_files: File[] = [...target_files, ...files.files].reduce((unique: File[], o: File) => {
            if (!unique.some(obj => obj.name === o.name && obj.size === o.size && obj.lastModified === o.lastModified)) {
                unique.push(o);
            }
            return unique;
        }, []);

        let file_preview: { url: string, name: string, size: number }[] = []
        for (const file of tmp_files) {
            const file_url = await getImgUrl(file)
            file_preview.push({
                url: file_url as string,
                name: file.name,
                size: file.size
            });
        }

        setFiles({ files: tmp_files, preview: file_preview });
    }

    const removeImage = (index: number) => {
        let tmp_files = files.files;
        let tmp_previews = files.preview;

        tmp_files = tmp_files.filter((_, indexf) => indexf !== index)
        tmp_previews = tmp_previews.filter(((_, indexf) => indexf !== index))

        setFiles({ files: tmp_files, preview: tmp_previews });
    }

    return (
        <div className="w-full p-10 rounded-xl" style={{ boxShadow: "0 20px 90px rgba(58,46,68,0.08)" }}>
            <form onSubmit={(e) => handleSubmit(e)} >
                {/* input area */}
                <div className="flex border-b">
                    <div className="w-10 h-10 relative rounded-full bg-gray-50/[0.5] overflow-hidden">
                        <Image src={userDetails.avatar || "/images/profile-img-placeholder.png"} layout="fill" objectFit="cover" alt={`${userDetails.username}-profile`} />
                    </div>
                    <div className="flex-1">
                        <textarea ref={textRef} name="text" rows={3} className="w-full text-sm focus:outline-none px-4 py-2" placeholder={`What's new, ${userDetails.first_name}?`}></textarea>
                    </div>
                </div>
                {/* media */}
                <div className="py-2 border-b text-sm text-primary-100 ">
                    <label htmlFor="files" className="rounded-full py-1 px-2 bg-gray-50 flex items-center w-fit cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                        </svg>
                        <div className="mx-2">Attach media</div>
                    </label>
                    <input onChange={handleFileUpload} type="file" id="files" name="files" className="hidden" accept="image/*" multiple />
                    {/* display files */}
                    <div className="mt-4">
                        {
                            files.preview.map((file, index) => {
                                return <div key={file.name + index} className="flex items-center my-2">
                                    <a href={file.url} className="flex items-center border-r flex-1 mr-2 pr-4" target='_blank' rel="noreferrer">
                                        <div className="h-6 w-6 relative">
                                            <Image src={file.url} layout="fill" alt={file.name} objectFit="cover" />
                                        </div>
                                        <div className="mx-4">
                                            {file.name}
                                        </div>
                                        <div className="ml-auto">
                                            {formatSizeUnits(file.size)}
                                        </div>
                                    </a>
                                    <div className="flex items-center" >
                                        <button className="ml-1" onClick={() => removeImage(index)}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                {/* buttons */}
                <div className="my-2 flex items-center justify-end">
                    <button type="button" className="mx-3 text-sm text-gray-700" onClick={clearForm}>
                        clear
                    </button>
                    <Button type="submit" className="text-xs block bg-primary-100 text-white hover:bg-opacity-95  ">
                        Post update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default NewPostForm