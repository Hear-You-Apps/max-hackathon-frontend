import './Actual.css';
import { Badge, Button, Card, Vote } from 'src/components';
import { IconAdd } from 'src/assets/icons';

export function Actual() {
  const voteData1 = {
    type: 'actual',
    choices: [
      { text: 'Явка 213 из 412 квартир', needed: 60, actual: 70 },
      { text: 'За по главному вопросу', needed: 50, actual: 82 },
    ],
  };

  const voteData2 = {
    type: 'actual',
    choices: [
      { text: 'Явка 140 из 412 квартир', needed: 60, actual: 34 },
      { text: 'За по главному вопросу', needed: 50, actual: 59 },
    ],
  };

  const voteData3 = {
    type: 'past',
    choices: [
      { text: 'Светло-серый', needed: 7, actual: 58 },
      { text: 'Бежевый', needed: 50, actual: 31 },
    ],
  };

  const meetsData = [
    {
      title: 'Установка шлагбаума во дворе',
      subtitle: 'Очно-заочная · 3 вопроса · открытое голосование',
      badge: <Badge text={'Голосование · до 30 сентября'} mode={'primary'} />,
      after: <div className={'user-vote'}>Вы: За изменить</div>,
      bottom: (
        <div className={'bottom-badges'}>
          <Badge text={'Порог пройден'} mode={'positive'} />
          <Badge text={'Передадим в УК 30 сентября'} mode={'neutral'} />
        </div>
      ),
      isVote: true,
      vote_data: voteData1,
    },
    {
      title: 'Смена тарифа на содержание: 28,4 → 31,1 ₽/м²',
      subtitle: 'Заочная · 1 вопрос · до 12 октября',
      badge: <Badge text={'Идет сбор голосов'} mode={'yellow'} />,
      bottom: <Button mode={'themed'}>Проголосовать</Button>,
      isVote: true,
      vote_data: voteData2,
    },
    {
      title: 'Какой цвет красить стены в подъездах?',
      subtitle: 'Без повестки и документов · 143 ответа',
      badge: <Badge text={'Опрос · до 25 сентября'} mode={'neutral'} />,
      isVote: true,
      vote_data: voteData3,
    },
  ];

  return (
    <>
      <Button>
        <IconAdd /> Создать собрание или опрос
      </Button>

      {meetsData.map((meet, index) => {
        return (
          <Card
            key={index}
            title={meet.title}
            subtitle={meet.subtitle}
            badge={meet.badge}
            after={meet.after}
            bottom={meet.bottom}
          >
            <Vote type={meet.vote_data.type} data={meet.vote_data.choices} />
          </Card>
        );
      })}
    </>
  );
}
