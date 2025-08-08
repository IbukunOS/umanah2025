import { useState, useEffect } from 'react';
import { supabase, supabaseUrl } from '../../supabaseClient';

function Gallery({ onBack }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const { data, error } = await supabase.storage.from('wishes-files').list();
            if (error) console.error('Error fetching files: ', error);
            else setFiles(data);
        };
        fetchFiles();
    }, []);

    return (
        <div data-color="white" className='gallery-page section font-[SansitaReg] py-20'>
            <div className="head1">
                <h1 className="text-5xl sm:text-6xl text-center tracking-tight">
                    Gallery
                </h1>
                <div className="text-center mt-4">
                    <button onClick={onBack} className="bg-[#f5f19c] text-black p-2 rounded-md">Back to Home</button>
                </div>
            </div>
            <div className="list mt-10 w-full px-8">
                <div className="grid grid-cols-3 gap-4">
                    {files.map((file) => (
                        <div key={file.name} className="aspect-w-1 aspect-h-1">
                            <img src={`${supabaseUrl}/storage/v1/object/public/wishes-files/${file.name}`} alt={file.name} className="object-cover w-full h-full rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Gallery;