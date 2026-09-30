import { Spinner } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import type { FileDto } from 'src/api/api';
import { api } from 'src/api/client';
import { IconDocument } from 'src/assets/icons';

export function RequestFile({
  file,
  onOpen,
}: {
  file: FileDto;
  onOpen: (preview: { file: FileDto; url: string }) => void;
}) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = '';
    async function loadFile() {
      try {
        const { data } = await api.getFile(file.id, { signal: controller.signal });
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(data);
        setUrl(objectUrl);
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }
    void loadFile();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file.id, attempt]);

  return (
    <button
      type="button"
      className="request-file"
      disabled={!url && !error}
      onClick={() => {
        if (error) {
          setError(false);
          setUrl('');
          setAttempt((value) => value + 1);
        } else if (url) onOpen({ file, url });
      }}
    >
      {error ? (
        <span>
          Не удалось загрузить
          <br />
          Повторить
        </span>
      ) : !url ? (
        <Spinner size="m" />
      ) : file.mimeType.startsWith('image/') ? (
        <img src={url} alt={file.name} onError={() => setError(true)} />
      ) : (
        <>
          <IconDocument />
          <span>{file.name}</span>
        </>
      )}
    </button>
  );
}
