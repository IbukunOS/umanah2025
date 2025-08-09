import { useState, useEffect, useRef } from 'react';
import { supabase, supabaseUrl } from '../../supabaseClient';

function Gallery({ onBack }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const { data, error } = await supabase.storage.from('gallery').list();
        if (error) console.error('Error fetching files: ', error);
        else setFiles(data || []);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
            .from('gallery')
            .upload(fileName, file);

        if (error) {
            console.error('Error uploading file:', error);
        } else {
            fetchFiles(); // Refresh the gallery
        }
        setUploading(false);
    };

    return (
        <div data-color="white" className='gallery-page section font-[SansitaReg] py-20'>
            <div className="head1">
                <h1 className="text-5xl sm:text-6xl text-center tracking-tight">
                    🎉 Birthday Gallery 📸
                </h1>
                <p className="text-center mt-4 text-zinc-600 font-[Sansita]">Share your birthday memories with everyone!</p>
                <div className="text-center mt-6 flex gap-4 justify-center">
                    <button onClick={onBack} className="bg-[#f5f19c] text-black p-3 rounded-md font-semibold">🏠 Back to Home</button>
                    <button 
                        onClick={() => fileInputRef.current?.click()} 
                        disabled={uploading}
                        className="bg-[#e9bbff] text-black p-3 rounded-md font-semibold disabled:opacity-50"
                    >
                        {uploading ? '📤 Uploading...' : '📸 Upload Photo'}
                    </button>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>
            <div className="list mt-10 w-full px-8">
                {files.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-[Sansita] text-zinc-500 mb-4">🎈 No photos yet!</h3>
                        <p className="text-zinc-400">Be the first to share a birthday memory!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {files.map((file) => (
                            <div key={file.name} className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <img 
                                    src={`${supabaseUrl}/storage/v1/object/public/gallery/${file.name}`} 
                                    alt={file.name} 
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Gallery;