import { useRef, useState } from 'react';
import { IconAddOutline, IconCamera } from 'src/assets/icons';
import { RequestAttachment } from './RequestAttachment';

export function RequestAttachments({
  files,
  onChange,
  disabled,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  disabled: boolean;
}) {
  const cameraInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  function addFiles(selected: FileList | null) {
    if (!selected?.length) return;
    const additions = Array.from(selected).filter(
      (file) =>
        !files.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified,
        ),
    );
    if (files.length + additions.length > 5) {
      setError('Можно прикрепить не больше 5 файлов');
      return;
    }
    for (const file of additions) {
      if (!file.size || file.size > 10 * 1024 * 1024) {
        setError(`Файл «${file.name}» должен быть непустым и не больше 10 МБ`);
        return;
      }
      const supported =
        /^(image\/(jpeg|png|webp)|application\/pdf)$/.test(file.type) ||
        (!file.type && /\.(jpe?g|png|webp|pdf)$/i.test(file.name));
      if (!supported) {
        setError('Прикрепите JPEG, PNG, WebP или PDF');
        return;
      }
    }
    setError('');
    onChange([...files, ...additions]);
  }

  return (
    <div className="new-request-field">
      <span>Фото и документы</span>
      <input
        ref={cameraInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        hidden
        disabled={disabled}
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = '';
        }}
      />
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
        multiple
        hidden
        disabled={disabled}
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = '';
        }}
      />
      <div className="request-attachments">
        <button
          type="button"
          className="request-attachment request-camera"
          disabled={disabled || files.length >= 5}
          onClick={() => cameraInput.current?.click()}
        >
          <IconCamera />
          <span>Снять</span>
        </button>
        {files.map((file) => (
          <RequestAttachment
            key={`${file.name}-${file.size}-${file.lastModified}`}
            file={file}
            disabled={disabled}
            onRemove={() => {
              onChange(files.filter((item) => item !== file));
              setError('');
            }}
          />
        ))}
        <button
          type="button"
          className="request-attachment"
          disabled={disabled || files.length >= 5}
          onClick={() => fileInput.current?.click()}
        >
          <IconAddOutline />
          <span>Файл</span>
        </button>
      </div>
      {error && <div className="new-request-error">{error}</div>}
    </div>
  );
}
