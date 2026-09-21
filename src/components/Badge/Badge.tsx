import './Badge.css';

export function Badge({
  mode = 'primary',
  text,
}: {
  mode?: 'primary' | 'neutral' | 'positive' | 'yellow';
  text: string;
}) {
  return <div className={`badge ${mode}`}>{text}</div>;
}
