import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function Gallery() {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await supabase.storage.from('gallery').list();
            if (error) {
                console.error('Error fetching images: ', error);
            } else {
                setImages(data);
            }
        };
        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const { data, error } = await supabase.storage
            .from('gallery')
            .upload(`${file.name}`.replace(/ /g, '_'), file);

        if (error) {
            console.error('Error uploading image: ', error);
        } else {
            console.log('Image uploaded: ', data);
            setImages([...images, { name: file.name }]);
        }
    };

    return (
        <div data-color="salmon" className='gallery section font-[SansitaReg] py-20'>
            <div className="head1">
                <h1 className="text-5xl sm:text-6xl text-center tracking-tight">
                    Birthday Gallery
                </h1>
            </div>
            <div className="list mt-10 w-full px-8">
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image) => {
                        const { data: publicData } = supabase.storage
                          .from('gallery')
                          .getPublicUrl(image.name);
                        const url = publicData?.publicUrl;
                        return (
                          <div key={image.name} className="aspect-square overflow-hidden rounded-lg">
                            <img
                              src={url}
                              alt={`Birthday photo ${image.name}`}
                              className="object-cover w-full h-full hover-scale"
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                </div>
                <div className="flex flex-col items-center justify-center py-20">
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload} className="btn px-4 py-2 rounded-md mt-4 hover-scale">Upload Image</button>
                </div>
            </div>
        </div>
    )
}

export default Gallery;