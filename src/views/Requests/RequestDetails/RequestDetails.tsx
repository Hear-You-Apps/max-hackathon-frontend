import { Panel } from '@vkontakte/vkui';
import { matchPath, useLocation } from 'react-router-dom';
import { paths } from 'src/navigation/routes';
import { RequestContent } from './components/RequestContent';
import './RequestDetails.css';

export function RequestDetails({ id }: { id: string }) {
  const location = useLocation();
  const requestId = matchPath(paths.request, location.pathname)?.params.requestId;

  return (
    <Panel id={id} className="requests-panel request-details-panel">
      {requestId && <RequestContent key={requestId} requestId={requestId} />}
    </Panel>
  );
}
