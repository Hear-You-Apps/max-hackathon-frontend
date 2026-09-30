import './Actual.css';
import { Badge, Button, Card, Vote } from 'src/components';
import { IconAdd } from 'src/assets/icons';
import { useMeetingsStore } from 'src/storage';
import type { MeetingFormat, MeetingVoteResultsDto } from 'src/api/api.ts';
import { useNavigate } from 'react-router-dom';

export function Actual() {
  const { meetings } = useMeetingsStore();
  const actualMeetings = meetings?.actual ?? [];

  const navigate = useNavigate();

  const formatMeetingFormat = (format: MeetingFormat) => {
    const formats: Record<MeetingFormat, string> = {
      in_person: 'Очное',
      absentee: 'Заочное',
      mixed: 'Очно-заочное',
    };

    return formats[format];
  };

  const formatVoteVariant = (variant: keyof MeetingVoteResultsDto) => {
    const variants: Record<keyof MeetingVoteResultsDto, string> = {
      yes: 'За',
      no: 'Против',
      abstain: 'Возд.',
    };

    return variants[variant];
  };

  const formatDate = (date: string) => {
    return `${new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`;
  };

  return (
    <>
      <Button>
        <IconAdd /> Создать собрание или опрос
      </Button>

      {actualMeetings.map((meet, index) => {
        if (meet.type === 'poll') {
          const questions = meet.options;

          return (
            <Card
              onClick={() => navigate(`/meet/${meet.type}_${meet.id}`)}
              key={index}
              title={meet.question}
              badge={<Badge mode={'neutral'} text={`Опрос · до ${formatDate(meet.endsAt)}`} />}
            >
              <Vote
                type={meet.type}
                data={(questions ?? []).map((option) => ({
                  text: option.title,
                  actual: option.votesCount,
                }))}
              />
            </Card>
          );
        }

        const question = meet.firstQuestion;

        return (
          <Card
            onClick={() => navigate(`/meet/${meet.type}_${meet.id}`)}
            key={meet.id}
            title={meet.title}
            subtitle={[
              meet.format && formatMeetingFormat(meet.format),
              meet.questionsCount && `${meet.questionsCount} вопроса`,
              meet.location,
            ]
              .filter(Boolean)
              .join(' · ')}
            badge={
              !question?.myVote ? (
                <Badge text={'Идет сбор голосов'} mode={'yellow'} />
              ) : (
                <Badge text={`Голосование · до ${formatDate(meet.endsAt)}`} mode={'primary'} />
              )
            }
            after={
              question?.myVote ? (
                <div className={'user-vote'}>Вы: {formatVoteVariant(question.myVote)}</div>
              ) : undefined
            }
            bottom={
              !question?.myVote ? (
                meet.format !== 'in_person' ? (
                  <Button onClick={() => navigate(`/meet/${meet.id}`)} mode={'themed'}>
                    Проголосовать
                  </Button>
                ) : null
              ) : (
                <Badge mode={'neutral'} text={`Передадим в УК ${formatDate(meet.endsAt)}`} />
              )
            }
          >
            <Vote
              type={meet.type}
              data={Object.entries(question?.results ?? {}).map(([key, actual]) => ({
                text: formatVoteVariant(key as keyof MeetingVoteResultsDto),
                actual,
                ...(meet.participationThresholdPercent != null && {
                  needed: meet.participationThresholdPercent,
                }),
              }))}
            />
          </Card>
        );
      })}
    </>
  );
}
