import './MeetView.css';
import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Badge, Button, Card, Header, Vote } from 'src/components';
import { Panel, Spinner } from '@vkontakte/vkui';
import { useCallback, useEffect, useState } from 'react';
import { api } from 'src/api/client.ts';
import type { MeetingDetailsResponseDto, MeetingFormat, PollDto } from 'src/api/api.ts';
import { useMeetingsStore } from 'src/storage';
import declOfNum from 'src/functions/declOfNum.ts';
import { IconDone, IconShare } from 'src/assets/icons';

export function MeetView({ id }: { id: string }) {
  const [meetingInfo, setMeetingInfo] = useState<
    | ({
        type: 'meeting';
      } & MeetingDetailsResponseDto)
    | ({
        type: 'poll';
      } & PollDto)
    | undefined
  >(undefined);

  const { meetings, setMeetings } = useMeetingsStore();

  const getMeetingInfo = useCallback(() => {
    if (meetingInfo) return;

    const meetingId = window.location.href.split('/')[5];

    try {
      api.getMeetingItem(meetingId).then((response) => {
        setMeetingInfo(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [meetingInfo]);

  useEffect(() => {
    getMeetingInfo();
  }, [getMeetingInfo]);

  const loading = !meetingInfo;

  const formatDate = (date: string) => {
    return `${new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`;
  };

  const formatMeetingFormat = (format: MeetingFormat) => {
    const formats: Record<MeetingFormat, string> = {
      in_person: 'Очное',
      absentee: 'Заочное',
      mixed: 'Очно-заочное',
    };

    return formats[format];
  };

  const setParticipation = () => {
    if (!meetingInfo || meetingInfo.type !== 'meeting') return;

    api
      .updateMeetingParticipation(meetingInfo.id, {
        willAttend: !meetingInfo.participation?.willAttend,
      })
      .then(() => {
        setMeetingInfo((prev) => {
          if (prev?.type !== 'meeting') return;
          if (!prev || !prev.participation) return prev;

          return {
            ...prev,
            participation: {
              ...prev.participation,
              willAttend: !prev.participation.willAttend,
              goingCount: prev.participation?.willAttend
                ? prev.participation.goingCount - 1
                : prev.participation.goingCount + 1,
            },
          };
        });
      });
  };

  const setPollVote = (optionId: number) => {
    if (!meetingInfo || meetingInfo.type !== 'poll') return;

    const alreadyVoted = meetingInfo.myOptionIds.includes(optionId);

    const nextOptionIds = meetingInfo.allowMultiple
      ? alreadyVoted
        ? meetingInfo.myOptionIds.filter((id) => id !== optionId)
        : [...meetingInfo.myOptionIds, optionId]
      : alreadyVoted
        ? []
        : [optionId];

    setMeetingInfo((prev) => {
      if (!prev || prev.type !== 'poll') return prev;

      return {
        ...prev,
        myOptionIds: nextOptionIds,
        options: prev.options.map((option) => {
          const wasVoted = prev.myOptionIds.includes(option.id);
          const isVoted = nextOptionIds.includes(option.id);

          if (wasVoted === isVoted) return option;

          return {
            ...option,
            votesCount: isVoted ? option.votesCount + 1 : option.votesCount - 1,
          };
        }),
      };
    });

    api
      .updatePollVotes(meetingInfo.id, {
        optionIds: nextOptionIds,
      })
      .then((response) => {
        setMeetingInfo(response.data);

        if (!meetings) return;

        setMeetings({
          ...meetings,
          actual: meetings.actual.map((meet) =>
            meet.type === 'poll' && meet.id === meetingInfo.id ? response.data : meet,
          ),
        });
      })
      .catch((error) => {
        console.log(error);

        setMeetingInfo((prev) => {
          if (!prev || prev.type !== 'poll') return prev;
          return meetingInfo;
        });
      });
  };

  const setMyVote = (questionId: number, vote: 'yes' | 'no' | 'abstain') => {
    if (!meetingInfo || meetingInfo.type !== 'meeting') return;

    const previousQuestion = meetingInfo.questions.find((question) => question.id === questionId);

    if (!previousQuestion) return;

    const nextVote = previousQuestion.myVote === vote ? null : vote;

    setMeetingInfo((prev) => {
      if (prev?.type !== 'meeting') return;
      if (!prev) return prev;

      return {
        ...prev,
        questions: prev.questions.map((question) => {
          if (question.id !== questionId) return question;

          const results = { ...question.results };

          if (question.myVote) {
            results[question.myVote] -= 1;
          }

          if (nextVote) {
            results[nextVote] += 1;
          }

          return {
            ...question,
            myVote: nextVote,
            results,
          };
        }),
      };
    });

    api
      .updateMeetingVotes(meetingInfo.id, {
        votes: nextVote ? [{ questionId, choice: nextVote }] : [],
      })
      .then(
        () => {
          if (!meetings) return;

          setMeetings({
            ...meetings,
            actual: meetings.actual.map((meet) => {
              if (meet.type !== 'meeting' || meet.id !== meetingInfo.id) {
                return meet;
              }

              if (!meet.firstQuestion || meet.firstQuestion.id !== questionId) {
                return meet;
              }

              const results = { ...meet.firstQuestion.results };

              if (meet.firstQuestion.myVote) {
                results[meet.firstQuestion.myVote] -= 1;
              }

              if (nextVote) {
                results[nextVote] += 1;
              }

              return {
                ...meet,
                firstQuestion: {
                  ...meet.firstQuestion,
                  myVote: nextVote,
                  results,
                },
              };
            }),
            past: meetings.past.map((meet) => {
              if (meet.type !== 'meeting' || meet.id !== meetingInfo.id) {
                return meet;
              }

              if (!meet.firstQuestion || meet.firstQuestion.id !== questionId) {
                return meet;
              }

              const results = { ...meet.firstQuestion.results };

              if (meet.firstQuestion.myVote) {
                results[meet.firstQuestion.myVote] -= 1;
              }

              if (nextVote) {
                results[nextVote] += 1;
              }

              return {
                ...meet,
                firstQuestion: {
                  ...meet.firstQuestion,
                  myVote: nextVote,
                  results,
                },
              };
            }),
          });
        },
        (error) => {
          console.log(error);

          setMeetingInfo((prev) => {
            if (prev?.type !== 'meeting') return;
            if (!prev) return prev;

            return {
              ...prev,
              questions: prev.questions.map((question) =>
                question.id === questionId ? previousQuestion : question,
              ),
            };
          });
        },
      );
  };

  return (
    <Panel id={id}>
      <Header
        isBack
        after={<IconShare /*onClick={() => window.WebApp?.shareContent({ link: '' })}*/ />}
      >
        Собрание
      </Header>
      <MaxPanel className="page-content meeting-view">
        {loading ? (
          <Spinner />
        ) : meetingInfo.type === 'poll' ? (
          <Card
            title={meetingInfo?.question}
            badge={
              <Badge
                mode={'neutral'}
                text={`Опрос · до ${formatDate(meetingInfo?.endsAt ?? '')}`}
              />
            }
            subtitle={['Открытое голосование'].filter(Boolean).join(' · ')}
          >
            <div className={'meeting-poll'}>
              {meetingInfo.options.map((option) => {
                const totalVotes = meetingInfo.options.reduce(
                  (sum, item) => sum + item.votesCount,
                  0,
                );
                const percent =
                  totalVotes > 0 ? Math.round((option.votesCount / totalVotes) * 100) : 0;

                return (
                  <div className={'poll-question'} key={option.id}>
                    <Button
                      mode={meetingInfo.myOptionIds.includes(option.id) ? 'primary' : 'themed'}
                      onClick={() => setPollVote(option.id)}
                    >
                      {option.title}
                    </Button>
                    <div
                      className={'vote-desc'}
                      style={{ marginTop: 5, width: '100%', textAlign: 'right' }}
                    >
                      {percent}%
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <>
            <Card
              title={meetingInfo?.title}
              badge={<Badge text={`Голосование · до ${formatDate(meetingInfo?.endsAt ?? '')}`} />}
              after={
                <Badge mode="neutral" text={formatMeetingFormat(meetingInfo?.format ?? 'mixed')} />
              }
              subtitle={[
                'Открытое голосование',
                meetingInfo?.author && 'инициатор ' + meetingInfo.author.name,
                meetingInfo?.startsAt && 'создано ' + formatDate(meetingInfo.startsAt),
              ]
                .filter(Boolean)
                .join(' · ')}
            >
              <div className={'meeting-description'}>{meetingInfo?.description}</div>
            </Card>

            {meetingInfo?.format !== 'in_person' ? (
              <>
                <div className={'meeting-vote'}>
                  <div className={'vote-header'}>Повестка и ваш голос</div>
                  {meetingInfo?.questions.map((question, index) => (
                    <div className={'meeting-question'} key={question.id}>
                      <div className={'question-title'}>
                        {index + 1}. {question.title}
                      </div>
                      <div className={'question-buttons'}>
                        <button
                          onClick={() => setMyVote(question.id, 'yes')}
                          className={`question-button ${question.myVote === 'yes' ? 'yes' : ''}`}
                          disabled={new Date() < new Date(meetingInfo.startsAt)}
                        >
                          За {question.myVote ? question.results.yes : null}
                        </button>
                        <button
                          onClick={() => setMyVote(question.id, 'no')}
                          className={`question-button ${question.myVote === 'no' ? 'no' : ''}`}
                          disabled={new Date() < new Date(meetingInfo.startsAt)}
                        >
                          Против {question.myVote ? question.results.no : null}
                        </button>
                        <button
                          onClick={() => setMyVote(question.id, 'abstain')}
                          className={`question-button ${question.myVote === 'abstain' ? 'abstain' : ''}`}
                          disabled={new Date() < new Date(meetingInfo.startsAt)}
                        >
                          Возд. {question.myVote ? question.results.abstain : null}
                        </button>
                      </div>
                    </div>
                  ))}
                  {new Date() < new Date(meetingInfo.startsAt) ? (
                    <div className={'vote-desc'}>Голосование еще не началось</div>
                  ) : (
                    <div className={'vote-desc'}>
                      Менять голос можно до {formatDate(meetingInfo.endsAt)}
                    </div>
                  )}
                </div>

                <div className={'meeting-participation'}>
                  <div className="vote-header">Порог</div>
                  <Vote
                    type={'meeting'}
                    data={[
                      {
                        actual: Math.round(
                          (meetingInfo.participantsCount / meetingInfo.apartmentsCount!) * 100,
                        ),
                        text: `Явка ${meetingInfo.participantsCount} из ${declOfNum(meetingInfo.apartmentsCount!, ['квартиры', 'квартир', 'квартир'])}`,
                        ...(meetingInfo.participationThresholdPercent != null && {
                          needed: meetingInfo.participationThresholdPercent,
                        }),
                      },
                      {
                        actual: meetingInfo.questions[0].results.yes,
                        text: 'За',
                        ...(meetingInfo.participationThresholdPercent != null && {
                          needed: meetingInfo.participationThresholdPercent,
                        }),
                      },
                    ]}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(meetingInfo.participantsCount / meetingInfo.apartmentsCount!) * 100 >=
                    (meetingInfo.participationThresholdPercent ?? 0) ? (
                      <>
                        {meetingInfo.participationThresholdPercent ? (
                          <Badge mode={'positive'} text={'Порог пройден'} />
                        ) : null}
                        <Badge
                          mode={'neutral'}
                          text={`Передадим в УК ${formatDate(meetingInfo.endsAt)}`}
                        />
                      </>
                    ) : (
                      <>
                        <Badge mode={'negative'} text={'Порог не пройден'} />
                      </>
                    )}
                  </div>
                </div>

                {meetingInfo.format !== 'absentee' ? (
                  <div className={'meeting-info'}>
                    <div className={'info__item'}>
                      <span>Очная часть</span>
                      <span>{formatDate(meetingInfo.startsAt)}</span>
                    </div>
                    <div className={'info__item'}>
                      <span>Место</span>
                      <span>{meetingInfo.location}</span>
                    </div>
                    <div className={'info__item'}>
                      <span>Придут</span>
                      <span>{meetingInfo.participation?.goingCount}</span>
                    </div>
                    {new Date() < new Date(meetingInfo.startsAt) ? (
                      <div>
                        <Button
                          onClick={setParticipation}
                          mode={meetingInfo.participation?.willAttend ? 'themed' : 'primary'}
                          className="participant-button"
                        >
                          {meetingInfo.participation?.willAttend ? <IconDone /> : null} Приду
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : null}
          </>
        )}
      </MaxPanel>
    </Panel>
  );
}
