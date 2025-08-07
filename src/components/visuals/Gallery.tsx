import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
}

const Gallery = () => {
  const [items, setItems] = useState<MediaItem[]>([]);

  const onUpload = (files: FileList | null) => {
    if (!files) return;
    const next: MediaItem[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith("video") ? "video" : "image";
      next.push({ id: `${Date.now()}-${file.name}`, url, type });
    });
    setItems((prev) => [...next, ...prev]);
  };

  const gridCols = useMemo(() => {
    const count = items.length;
    if (count <= 2) return "grid-cols-1 sm:grid-cols-2";
    if (count <= 4) return "grid-cols-2 sm:grid-cols-3";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
  }, [items.length]);

  return (
    <section
      id="gallery"
      className="relative mx-auto max-w-6xl px-6 py-16"
      data-scroll-section
      aria-label="Gallery section"
    >
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display text-3xl">Party Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <input
              id="media"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) => onUpload(e.target.files)}
              className="hidden"
            />
            <label htmlFor="media">
              <Button asChild variant="hero">
                <span>Upload Images/Videos</span>
              </Button>
            </label>
            <Button variant="secondary" onClick={() => setItems([])}>
              Clear
            </Button>
          </div>

          <div className={`grid gap-4 ${gridCols}`}>
            {items.map((m) => (
              <figure
                key={m.id}
                className="group relative overflow-hidden rounded-lg border bg-card hover-scale"
              >
                {m.type === "image" ? (
                  <img
                    src={m.url}
                    alt="Uploaded party memory"
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={m.url}
                    className="h-56 w-full object-cover"
                    controls
                    preload="metadata"
                  />
                )}
              </figure>
            ))}
            {items.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                Drop your first memory! 🎉
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Gallery;
