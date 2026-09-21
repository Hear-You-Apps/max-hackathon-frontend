import './Past.css';
import { Button } from 'src/components';
import { useUserStore } from 'src/storage';

export function Past() {
  const { user, setUser } = useUserStore();

  return (
    <>
      <Button onClick={() => setUser({ ...user, status: 'unlogged' })}>logout</Button>
    </>
  );
}
