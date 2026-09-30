import { useEffect, useRef } from 'react';
import { IconClose, IconDocument } from 'src/assets/icons';

export function RequestAttachment({
  file,
  disabled,
  onRemove,
}: {
  file: File;
  disabled: boolean;
  onRemove: () => void;
}) {
  const image = useRef<HTMLImageElement>(null);
  const isImage =
    file.type.startsWith('image/') || (!file.type && /\.(jpe?g|png|webp)$/i.test(file.name));

  useEffect(() => {
    if (!image.current) return;
    const url = URL.createObjectURL(file);
    image.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="request-attachment" title={file.name}>
      {isImage ? (
        <img ref={image} className="request-attachment-preview" alt={file.name} />
      ) : (
        <>
          <IconDocument />
          <span>{file.name}</span>
        </>
      )}
      <button
        type="button"
        className="request-attachment-remove"
        disabled={disabled}
        onClick={onRemove}
      >
        <IconClose />
      </button>
    </div>
  );
}
