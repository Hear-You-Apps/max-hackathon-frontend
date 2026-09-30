import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { FileDto } from 'src/api/api';
import { IconClose, IconDocument } from 'src/assets/icons';

export function RequestFilePreview({
  file,
  url,
  onClose,
}: {
  file: FileDto;
  url: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="request-file-preview">
      <div className="request-file-preview-header">
        <span>{file.name}</span>
        <button type="button" onClick={onClose}>
          <IconClose />
        </button>
      </div>
      <div className="request-file-preview-content">
        {file.mimeType.startsWith('image/') ? (
          <img src={url} alt={file.name} />
        ) : (
          <div className="request-file-document">
            <IconDocument width={48} height={48} />
            <div>{file.name}</div>
            <span>
              PDF · {Math.max(1, Math.round(file.size / 1024)).toLocaleString('ru-RU')} КБ
            </span>
          </div>
        )}
      </div>
      <a className="request-file-download" href={url} download={file.name}>
        Скачать файл
      </a>
    </div>,
    document.body,
  );
}
