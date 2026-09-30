import './Vote.css';

export function Vote({
  type,
  data,
}: {
  type: string;
  data: { text: string; needed?: number; actual: number }[];
}) {
  const getMaxVotes = () => {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].actual > max) max = data[i].actual;
    }
    return max;
  };

  return (
    <div className={'vote-container'}>
      {data.map((el, index) => {
        return (
          <div className={'vote-choice'} key={index}>
            <div className={'choice-progress'}>
              <div
                className={`progress-bar ${el.actual < el.needed! || type === 'poll' ? 'neutral' : ''} ${type === 'poll' && getMaxVotes() !== el.actual ? 'gray' : ''}`}
                style={{ width: `calc(100% * ${el.actual} / 100)` }}
              />
              {type === 'meeting' && el.needed ? (
                <div
                  className={'choice-marker'}
                  style={{ left: `calc(100% * ${el.needed} / 100)` }}
                />
              ) : null}
            </div>
            <div className={'choice-text'}>
              <div>{el.text}</div>
              <div
                style={{
                  color:
                    el.actual >= el.needed! && type === 'meeting'
                      ? 'rgba(26, 190, 67, 1)'
                      : 'rgba(6, 7, 8, 1)',
                }}
              >
                {type === 'meeting' && el.needed
                  ? `${el.actual}% · нужно ${el.needed}%`
                  : `${el.actual}%`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
