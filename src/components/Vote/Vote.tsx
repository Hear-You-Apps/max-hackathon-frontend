import './Vote.css';

export function Vote({ data }: { data: { text: string; needed: number; actual: number }[] }) {
  return (
    <div className={'vote-container'}>
      {data.map((el, index) => {
        return (
          <div className={'vote-choice'} key={index}>
            <div className={'choice-progress'}>
              <div
                className={`progress-bar ${el.actual < el.needed ? 'neutral' : ''}`}
                style={{ width: `calc(100% * ${el.actual} / 100)` }}
              />
              <div
                className={'choice-marker'}
                style={{ left: `calc(100% * ${el.needed} / 100)` }}
              />
            </div>
            <div className={'choice-text'}>
              <div>{el.text}</div>
              <div
                style={{
                  color: el.actual >= el.needed ? 'rgba(26, 190, 67, 1)' : 'rgba(6, 7, 8, 1)',
                }}
              >
                {el.actual}% · нужно {el.needed}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
