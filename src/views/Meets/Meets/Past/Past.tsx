import './Past.css';
import { Button } from 'src/components';
import { api } from 'src/api/client.ts';
import { useUserStore } from 'src/storage';

export function Past() {
  const { user } = useUserStore();

  return (
    <>
      <Button onClick={() => api.debugDeleteUser({ userId: user.user.id })}>logout</Button>
    </>
  );
}
