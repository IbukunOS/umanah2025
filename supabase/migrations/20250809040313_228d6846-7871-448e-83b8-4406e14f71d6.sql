-- Create storage policies for the gallery bucket

-- Allow public access to view gallery files
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

-- Allow anyone to upload files to gallery bucket
CREATE POLICY "Anyone can upload gallery files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery');

-- Allow anyone to delete their uploaded files (optional but useful)
CREATE POLICY "Anyone can delete gallery files" ON storage.objects FOR DELETE USING (bucket_id = 'gallery');