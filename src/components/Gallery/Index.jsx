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
    // handle file download
    const handleFileDownload = async (fileName) => {
        try {
            const { data, error } = await supabase.storage.from('gallery').download(fileName);
            if (error) throw error;

            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName.split('-').slice(1).join('-'); // Use original filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // Clean up
        } catch (error) {
            console.error('Error downloading file: ', error);
            alert('Failed to download file. Please try again.');
        }
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload an image (JPEG, PNG, GIF, WebP) or video (MP4, WebM) file.');
            return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size must be less than 10MB.');
            return;
        }

        setUploading(true);
        const fileName = `${Date.now()}-${file.name}`;

        try {
            const { error } = await supabase.storage
                .from('gallery')
                .upload(fileName, file);

            if (error) {
                console.error('Error uploading file:', error);
                alert('Failed to upload file. Please try again.');
            } else {
                fetchFiles(); // Refresh the gallery
                // Clear the file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('An error occurred while uploading. Please try again.');
        }
        
        setUploading(false);
    };

    const handleFileDelete = async (fileName) => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        try {
            const { error } = await supabase.storage
                .from('gallery')
                .remove([fileName]);

            if (error) {
                console.error('Error deleting file:', error);
                alert('Failed to delete file. Please try again.');
            } else {
                fetchFiles(); // Refresh the gallery
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('An error occurred while deleting. Please try again.');
        }
    };

    return (
        <div data-color="white" className='gallery-page section font-[SansitaReg] py-20'>
            <div className="head1">
                <h1 className="text-5xl sm:text-6xl text-center tracking-tight">
                    Birthday Gallery 🎉
                </h1>
                <p className="text-center mt-4 text-zinc-600 font-[Sansita]">Share your birthday memories with everyone!</p>
                <div className="text-center mt-6 flex gap-4 justify-center">
                    <button onClick={onBack} className="bg-[#f5f19c] text-black p-3 rounded-md font-semibold">🏠 Back to Home</button>
                    <button 
                        onClick={() => fileInputRef.current?.click()} 
                        disabled={uploading}
                        className="bg-[#e9bbff] text-black p-3 rounded-md font-semibold disabled:opacity-50"
                    >
                        {uploading ? '📤 Uploading...' : 'Upload Media'}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {files.map((file) => (
                            <div key={file.name} className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                {file.name.includes('.mp4') || file.name.includes('.webm') ? (
                                    <video 
                                        src={`${supabaseUrl}/storage/v1/object/public/gallery/${file.name}`}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                                        muted
                                        playsInline
                                        autoPlay
                                        loop
                                        preload="metadata"
                                        controls={false}
                                        tabIndex={-1}
                                        style={{ outline: 'none' }}
                                    />
                                ) : (
                                    <img 
                                        src={`${supabaseUrl}/storage/v1/object/public/gallery/${file.name}`} 
                                        alt={`Birthday memory: ${file.name}`}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
                                        loading="lazy"
                                    />
                                )}
                                <button 
                                    onClick={() => handleFileDownload(file.name)}
                                    className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-600"
                                    title="Download this file"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button>

                                {/* File info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <p className="text-white text-sm truncate">{file.name.split('-').slice(1).join('-')}</p>
                                    <p className="text-white/70 text-xs">
                                        {new Date(parseInt(file.name.split('-')[0])).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Gallery;