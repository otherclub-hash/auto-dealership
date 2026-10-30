import { PHOTOS, REAR, type PhotoKey } from "@/data/catalog";

/** Front-view concept vehicle photo (cut-out). Decorative when the surrounding text already names it. */
export default function Photo({ k, className, alt = "", rear = false }: { k: PhotoKey; className?: string; alt?: string; rear?: boolean }) {
  const p = (rear ? REAR : PHOTOS)[k];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={p.src} width={p.w} height={p.h} alt={alt} aria-hidden={alt ? undefined : true} decoding="async" draggable={false} />
  );
}
