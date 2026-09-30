/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type RequestsStatusFilter =
  | "all"
  | "open"
  | "submitted"
  | "in_review"
  | "in_progress"
  | "resolved"
  | "closed"
  | "cancelled";

export type RequestsScope = "mine" | "house";

/** submitted: отправлена, in_review: на рассмотрении, in_progress: решается, resolved: ждёт подтверждения, closed: закрыта, cancelled: отменена */
export type RequestStatus =
  | "submitted"
  | "in_review"
  | "in_progress"
  | "resolved"
  | "closed"
  | "cancelled";

export type RequestVisibility = "private" | "house";

export type RequestLocationType = "apartment" | "entrance" | "yard";

export type RequestCategory = "management" | "electrician" | "plumber" | "duty";

export type MeetingsPeriod = "actual" | "past";

/** Свой голос по вопросу, null если ещё не голосовали */
export type MeetingVoteChoice = "yes" | "no" | "abstain";

/** scheduled: ещё не началось, active: идёт, closed: завершено, cancelled: отменено */
export type MeetingStatus = "scheduled" | "active" | "closed" | "cancelled";

/** all_residents: все жители, owners: только собственники */
export type VotingAudience = "all_residents" | "owners";

/** in_person: очная, absentee: заочная, mixed: очно-заочная */
export type MeetingFormat = "in_person" | "absentee" | "mixed";

export type HouseContactType =
  | "dispatcher"
  | "emergency"
  | "plumber"
  | "electrician"
  | "representative"
  | "passport_office"
  | "other";

export type HouseEventType =
  | "water_outage"
  | "power_outage"
  | "cleaning"
  | "maintenance"
  | "other";

export type HouseEventsPeriod = "all" | "upcoming" | "past";

/** chat: чат, channel: канал */
export type HouseChatType = "chat" | "channel";

export type HouseJoinRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

export type ApartmentVerificationStatus = "pending" | "verified" | "rejected";

export type ApartmentRelationship = "owner" | "tenant";

export type HouseRole =
  | "resident"
  | "organizer"
  | "house_council"
  | "house_admin";

export type HouseMembershipStatus = "approved" | "revoked" | "left";

export type ErrorCode =
  | "USER_NOT_INITIALIZED"
  | "USER_NOT_FOUND"
  | "INVITATION_NOT_FOUND"
  | "INVITATION_EXPIRED"
  | "INVITATION_REVOKED"
  | "JOIN_REQUEST_ALREADY_EXISTS"
  | "JOIN_REQUEST_NOT_FOUND"
  | "JOIN_REQUEST_NOT_PENDING"
  | "JOIN_REQUEST_OUTDATED"
  | "APARTMENT_ALREADY_LINKED"
  | "HOUSE_REJOIN_UNAVAILABLE"
  | "HOUSE_MEMBERSHIP_NOT_FOUND"
  | "HOUSE_NOT_AVAILABLE"
  | "HOUSE_ADMIN_REQUIRED"
  | "MEETING_NOT_AVAILABLE"
  | "MEETING_CREATE_FORBIDDEN"
  | "INVALID_MEETING_DATES"
  | "MEETING_LOCATION_REQUIRED"
  | "MEETING_APARTMENTS_COUNT_REQUIRED"
  | "MEETING_VOTE_FORBIDDEN"
  | "MEETING_VOTING_UNAVAILABLE"
  | "INVALID_MEETING_QUESTIONS"
  | "MEETING_PARTICIPATION_UNAVAILABLE"
  | "INVALID_POLL_DATE"
  | "INVALID_POLL_OPTIONS"
  | "POLL_NOT_AVAILABLE"
  | "POLL_VOTE_FORBIDDEN"
  | "POLL_VOTING_UNAVAILABLE"
  | "REQUEST_NOT_AVAILABLE"
  | "INVALID_REQUEST_LOCATION"
  | "REQUEST_APARTMENT_NOT_AVAILABLE"
  | "REQUEST_ATTACHMENTS_NOT_AVAILABLE"
  | "FILE_NOT_AVAILABLE"
  | "INVALID_FILE"
  | "BOT_WEBHOOK_UNAUTHORIZED"
  | "BOT_WEBHOOK_NOT_CONFIGURED"
  | "BOT_MESSAGE_FAILED";

export interface HealthResponseDto {
  /** @example "ok" */
  status: "ok";
  /** @example "max-hackathon-backend" */
  service: string;
  /** @example "up" */
  database: "up";
  /** @format date-time */
  timestamp: string;
}

export interface ErrorResponseDto {
  /** @example 400 */
  statusCode: number;
  /** @example ["message must be a string"] */
  message: string | string[];
  /** @example "Bad Request" */
  error: string;
  /** @example "USER_NOT_INITIALIZED" */
  code?: ErrorCode;
}

export interface EchoDto {
  /**
   * @minLength 1
   * @maxLength 500
   * @example "Hello, Max!"
   */
  message: string;
}

export interface MyApartmentDto {
  /** @example 105 */
  id: number;
  /** @example "112" */
  number: string;
  relationship: ApartmentRelationship;
  verificationStatus: ApartmentVerificationStatus;
}

export interface MyHouseMembershipDto {
  /** @example 1 */
  id: number;
  status: HouseMembershipStatus;
  /** Причина отзыва доступа к дому */
  revocationReason: string | null;
  /** @example "Александр Кузнецов" */
  displayName: string;
  roles: HouseRole[];
  apartments: MyApartmentDto[];
}

export interface MyHouseDto {
  /** @example 10 */
  id: number;
  /** @example "ул. Ленина, 24" */
  address: string;
  /** @example "Жилсервис" */
  managementCompanyName: string | null;
  /** @example 412 */
  apartmentsCount: number | null;
  /** @example 6 */
  entrancesCount: number | null;
  /**
   * Количество подтверждённых жителей дома
   * @min 0
   * @example 286
   */
  residentsCount: number;
  /** Ссылка для связи с администратором дома. Доступна при подтверждённом членстве. */
  adminContactUrl: string | null;
  membership: MyHouseMembershipDto;
}

export interface HousePreviewDto {
  /** @example 10 */
  id: number;
  /** @example "ул. Ленина, 24" */
  address: string;
  /** @example "Жилсервис" */
  managementCompanyName: string | null;
  /** @example 412 */
  apartmentsCount: number | null;
  /** @example 6 */
  entrancesCount: number | null;
  /**
   * Количество подтверждённых жителей дома
   * @min 0
   * @example 286
   */
  residentsCount: number;
}

export interface MyHouseJoinRequestDto {
  /** @example 25 */
  id: number;
  house: HousePreviewDto;
  /** @example "112" */
  apartmentNumber: string;
  /** @example "Александр Кузнецов" */
  displayName: string;
  relationship: ApartmentRelationship;
  status: HouseJoinRequestStatus;
  /** @example null */
  rejectionReason: string | null;
}

export interface UserProfileDto {
  /** @example 1 */
  id: number;
  /** @example "Иван" */
  firstName: string;
  /** @example "Иванов" */
  lastName: string | null;
  /** @example null */
  username: string | null;
  /** @example null */
  photoUrl: string | null;
  /** Уведомления о собраниях и заявках во всех домах */
  notificationsEnabled: boolean;
}

export interface InitResponseDto {
  /** Дома с подтверждённым или отозванным доступом. Покинутые дома не возвращаются. */
  houses: MyHouseDto[];
  /** Последние заявки по каждой квартире, ожидающие подтверждения или отклонённые. Заявки до последнего выхода из дома не возвращаются. */
  joinRequests: MyHouseJoinRequestDto[];
  user: UserProfileDto;
}

export interface UserNotificationsDto {
  /** Уведомления о собраниях и заявках во всех домах */
  notificationsEnabled: boolean;
}

export interface MyHousesResponseDto {
  /** Дома с подтверждённым или отозванным доступом. Покинутые дома не возвращаются. */
  houses: MyHouseDto[];
  /** Последние заявки по каждой квартире, ожидающие подтверждения или отклонённые. Заявки до последнего выхода из дома не возвращаются. */
  joinRequests: MyHouseJoinRequestDto[];
}

export interface FoundHouseDto {
  /** @example 10 */
  id: number;
  /** @example "ул. Ленина, 24" */
  address: string;
  /** @example "Жилсервис" */
  managementCompanyName: string | null;
  /** @example 412 */
  apartmentsCount: number | null;
  /** @example 6 */
  entrancesCount: number | null;
  /**
   * Количество подтверждённых жителей дома
   * @min 0
   * @example 286
   */
  residentsCount: number;
}

export interface SearchHouseResponseDto {
  house: FoundHouseDto;
  /** Связь текущего пользователя с домом. При отсутствии связи или после выхода возвращается null. */
  membership: MyHouseMembershipDto | null;
  /** Последняя актуальная заявка текущего пользователя в этот дом либо null. Полный список доступен в /houses/me. */
  joinRequest: MyHouseJoinRequestDto | null;
}

export interface JoinHouseDto {
  /**
   * Код приглашения
   * @maxLength 64
   * @example "LEN-24-7Q"
   */
  code: string;
  /**
   * @maxLength 32
   * @example "112"
   */
  apartmentNumber: string;
  /**
   * @maxLength 255
   * @example "Александр Кузнецов"
   */
  displayName: string;
  relationship: ApartmentRelationship;
  /** Если передано, обновляет уведомления во всех домах */
  notificationsEnabled?: boolean;
}

export interface LeaveHouseDto {
  /**
   * @min 1
   * @max 4294967295
   * @example 25
   */
  requestId: number;
}

export interface LeaveHouseMembershipDto {
  /**
   * @min 1
   * @max 4294967295
   * @example 1
   */
  houseId: number;
}

export interface HouseChatDto {
  /**
   * ID записи
   * @example 1
   */
  id: number;
  /** chat: чат, channel: канал */
  type: HouseChatType;
  /**
   * Название
   * @example "Общий чат дома"
   */
  name: string;
  /** Описание */
  description: string | null;
  /**
   * Ссылка для открытия в MAX
   * @format uri
   */
  url: string;
}

export interface HouseChatsResponseDto {
  /** Чаты и каналы дома */
  items: HouseChatDto[];
}

export interface HouseEventDto {
  /** @example 1 */
  id: number;
  type: HouseEventType;
  /** @example "Отключение горячей воды" */
  title: string;
  /** @example "Плановые работы" */
  description: string | null;
  /**
   * @format date-time
   * @example "2026-10-01T07:00:00.000Z"
   */
  startsAt: string;
  /**
   * @format date-time
   * @example "2026-10-01T13:00:00.000Z"
   */
  endsAt: string | null;
  /** @example "Подъезды 1–3" */
  location: string | null;
  /** @example false */
  isCancelled: boolean;
}

export interface HouseEventsResponseDto {
  /** События текущей страницы */
  items: HouseEventDto[];
  /**
   * Номер страницы
   * @example 1
   */
  page: number;
  /**
   * Размер страницы
   * @example 20
   */
  limit: number;
  /**
   * Общее количество событий дома с учётом выбранного периода
   * @example 42
   */
  total: number;
}

export interface HouseInfoDto {
  /** @example 10 */
  id: number;
  /** @example "ул. Ленина, 24" */
  address: string;
  /** @example "Жилсервис" */
  managementCompanyName: string | null;
  /** @example 412 */
  apartmentsCount: number | null;
  /** @example 6 */
  entrancesCount: number | null;
  /**
   * Количество подтверждённых жителей дома
   * @min 0
   * @example 286
   */
  residentsCount: number;
  /** Ссылка для связи с администратором дома. Доступна при подтверждённом членстве. */
  adminContactUrl: string | null;
  /** @example 1998 */
  yearBuilt: number | null;
}

export interface HouseContactDto {
  /** @example 1 */
  id: number;
  type: HouseContactType;
  /** @example "Диспетчерская УК" */
  name: string;
  /** @example "+78120000000" */
  phone: string | null;
  address: string | null;
  /** @example "Круглосуточно" */
  workingHours: string | null;
  /** @format uri */
  messengerUrl: string | null;
}

export interface HouseUtilitiesDto {
  /**
   * Общая ссылка на оплату или личный кабинет поставщика
   * @format uri
   */
  paymentUrl: string | null;
}

export interface HouseDetailsResponseDto {
  house: HouseInfoDto;
  contacts: HouseContactDto[];
  utilities: HouseUtilitiesDto;
  /**
   * До трёх текущих и ближайших событий по дате начала
   * @maxItems 3
   */
  upcomingEvents: HouseEventDto[];
}

export interface DeleteUserDto {
  /**
   * ID пользователя в нашей БД
   * @min 1
   * @max 4294967295
   * @example 1
   */
  userId: number;
}

export interface ReviewJoinRequestDto {
  /**
   * @min 1
   * @max 4294967295
   * @example 25
   */
  requestId: number;
}

export interface RejectJoinRequestDto {
  /**
   * @min 1
   * @max 4294967295
   * @example 25
   */
  requestId: number;
  /**
   * @maxLength 2000
   * @example "Неверно указан номер квартиры"
   */
  reason: string;
}

export interface CreateMeetingQuestionDto {
  /**
   * @maxLength 2000
   * @example "Установить шлагбаум во дворе?"
   */
  title: string;
}

export interface CreateMeetingDto {
  /**
   * Название собрания, если вопросов несколько
   * @maxLength 255
   * @example "Установка шлагбаума во дворе"
   */
  title?: string;
  /**
   * Один вопрос для простого собрания, вместо questions
   * @maxLength 2000
   * @example "Установить шлагбаум во дворе?"
   */
  question?: string;
  /**
   * @maxLength 10000
   * @example "Обсудим въезд во двор и стоимость установки"
   */
  description?: string | null;
  /**
   * in_person: очная, absentee: заочная, mixed: очно-заочная
   * @default "absentee"
   */
  format?: MeetingFormat;
  /**
   * all_residents: все жители, owners: только собственники
   * @default "owners"
   */
  audience?: VotingAudience;
  /**
   * Место обязательно для очного и очно-заочного собрания
   * @maxLength 500
   * @example "У второго подъезда"
   */
  location?: string | null;
  /**
   * Начало собрания, если нужно запланировать его на будущее
   * @format date-time
   * @example "2026-10-01T16:00:00.000Z"
   */
  startsAt?: string;
  /**
   * Окончание собрания с часовым поясом, позже начала
   * @format date-time
   * @example "2026-10-07T20:59:00.000Z"
   */
  endsAt: string;
  /**
   * Вопросы повестки, вместо одного question
   * @maxItems 100
   * @minItems 1
   */
  questions?: CreateMeetingQuestionDto[];
  /**
   * Порог участия от числа квартир, null если не нужен
   * @min 1
   * @max 100
   * @example 50
   */
  participationThresholdPercent?: number | null;
}

export interface MeetingParticipationResponseDto {
  /**
   * Свой ответ, null если ещё не отмечались
   * @example true
   */
  willAttend: boolean | null;
  /**
   * Сколько подтверждённых жителей планируют прийти
   * @example 12
   */
  goingCount: number;
}

export interface MeetingAuthorDto {
  /** @example 1 */
  id: number;
  /**
   * Имя автора
   * @example "Олег Чикелев"
   */
  name: string;
}

export interface MeetingVoteResultsDto {
  /**
   * Голоса за
   * @example 42
   */
  yes: number;
  /**
   * Голоса против
   * @example 8
   */
  no: number;
  /**
   * Воздержались
   * @example 3
   */
  abstain: number;
}

export interface MeetingQuestionDto {
  /** @example 1 */
  id: number;
  /** @example "Установить шлагбаум во дворе?" */
  title: string;
  /** Свой голос по вопросу, null если ещё не голосовали */
  myVote: MeetingVoteChoice | null;
  /** Текущие результаты */
  results: MeetingVoteResultsDto;
}

export interface MeetingDetailsResponseDto {
  /** @example 1 */
  id: number;
  /**
   * ID дома
   * @example 1
   */
  houseId: number;
  /** @example "Установка шлагбаума во дворе" */
  title: string;
  /** in_person: очная, absentee: заочная, mixed: очно-заочная */
  format: MeetingFormat;
  audience: VotingAudience;
  /** scheduled: ещё не началось, active: идёт, closed: завершено, cancelled: отменено */
  status: MeetingStatus;
  /** Голосование закончено, результаты больше не меняются от новых голосов */
  resultsFinal: boolean;
  /** @example "У второго подъезда" */
  location: string | null;
  /**
   * @format date-time
   * @example "2026-10-01T16:00:00.000Z"
   */
  startsAt: string;
  /**
   * @format date-time
   * @example "2026-10-07T20:59:00.000Z"
   */
  endsAt: string;
  /**
   * Пользователи, ответившие хотя бы на один вопрос. Каждый считается один раз
   * @example 53
   */
  participantsCount: number;
  /**
   * Порог участия от числа квартир, null если не задан
   * @example 50
   */
  participationThresholdPercent: number | null;
  /**
   * Количество квартир дома, null если не указано
   * @example 412
   */
  apartmentsCount: number | null;
  /**
   * Квартиры, от которых голосовали или отметили «Приду»
   * @example 213
   */
  participatingApartmentsCount: number;
  /** null если порог участия не задан или число квартир неизвестно */
  participationThresholdReached: boolean | null;
  type: "meeting";
  /** Свой ответ и число планирующих прийти, null для заочного собрания */
  participation: MeetingParticipationResponseDto | null;
  /** @example "Обсудим въезд во двор и стоимость установки" */
  description: string | null;
  /** Автор собрания, null если аккаунт удалён */
  author: MeetingAuthorDto | null;
  /** Вопросы в порядке повестки */
  questions: MeetingQuestionDto[];
}

export interface MeetingListItemDto {
  /** @example 1 */
  id: number;
  /**
   * ID дома
   * @example 1
   */
  houseId: number;
  /** @example "Установка шлагбаума во дворе" */
  title: string;
  /** in_person: очная, absentee: заочная, mixed: очно-заочная */
  format: MeetingFormat;
  audience: VotingAudience;
  /** scheduled: ещё не началось, active: идёт, closed: завершено, cancelled: отменено */
  status: MeetingStatus;
  /** Голосование закончено, результаты больше не меняются от новых голосов */
  resultsFinal: boolean;
  /** @example "У второго подъезда" */
  location: string | null;
  /**
   * @format date-time
   * @example "2026-10-01T16:00:00.000Z"
   */
  startsAt: string;
  /**
   * @format date-time
   * @example "2026-10-07T20:59:00.000Z"
   */
  endsAt: string;
  /**
   * Пользователи, ответившие хотя бы на один вопрос. Каждый считается один раз
   * @example 53
   */
  participantsCount: number;
  /**
   * Порог участия от числа квартир, null если не задан
   * @example 50
   */
  participationThresholdPercent: number | null;
  /**
   * Количество квартир дома, null если не указано
   * @example 412
   */
  apartmentsCount: number | null;
  /**
   * Квартиры, от которых голосовали или отметили «Приду»
   * @example 213
   */
  participatingApartmentsCount: number;
  /** null если порог участия не задан или число квартир неизвестно */
  participationThresholdReached: boolean | null;
  type: "meeting";
  /**
   * Количество вопросов
   * @example 3
   */
  questionsCount: number;
  /** Первый вопрос для карточки в списке, null если вопросов нет */
  firstQuestion: MeetingQuestionDto | null;
}

export interface PollOptionDto {
  /** @example 1 */
  id: number;
  /** @example "Светло-серый" */
  title: string;
  /** Сколько жителей выбрали вариант */
  votesCount: number;
  /** Процент ответивших. При выборе нескольких вариантов сумма может быть больше 100 */
  percent: number;
}

export interface PollDto {
  type: "poll";
  /** @example 1 */
  id: number;
  /** @example 1 */
  houseId: number;
  /** @example "Какой цвет покрасить стены в подъездах?" */
  question: string;
  audience: VotingAudience;
  allowMultiple: boolean;
  /** @format date-time */
  endsAt: string;
  /** По сроку опроса */
  status: "active" | "closed";
  /** Результат окончательный после срока опроса */
  resultsFinal: boolean;
  /** Сколько жителей ответили на опрос */
  responsesCount: number;
  /** Выбранные мной варианты */
  myOptionIds: number[];
  options: PollOptionDto[];
}

export interface MeetingsResponseDto {
  /** Собрания и опросы текущей страницы */
  items: (
    | ({
        type: "meeting";
      } & MeetingListItemDto)
    | ({
        type: "poll";
      } & PollDto)
  )[];
  /**
   * Номер страницы
   * @example 1
   */
  page: number;
  /**
   * Размер страницы
   * @example 20
   */
  limit: number;
  /**
   * Количество собраний и опросов за выбранный период
   * @example 42
   */
  total: number;
}

export interface UpdateMeetingParticipationDto {
  /**
   * true: приду, false: не приду
   * @example true
   */
  willAttend: boolean;
}

export interface MeetingVoteDto {
  /**
   * ID вопроса
   * @min 1
   * @max 4294967295
   * @example 1
   */
  questionId: number;
  /**
   * yes: за, no: против, abstain: воздержался
   * @example "yes"
   */
  choice: MeetingVoteChoice;
}

export interface UpdateMeetingVotesDto {
  /**
   * Ответы без повторяющихся questionId. Меняются только переданные ответы, пустой массив сбрасывает все свои ответы
   * @maxItems 100
   * @minItems 0
   */
  votes: MeetingVoteDto[];
}

export interface MeetingVotesResponseDto {
  /** Все свои ответы по собранию в порядке повестки */
  votes: MeetingVoteDto[];
}

export interface CreatePollOptionDto {
  /**
   * @maxLength 255
   * @example "Светло-серый"
   */
  title: string;
}

export interface CreatePollDto {
  /** @example "Какой цвет покрасить стены в подъездах?" */
  question: string;
  /**
   * @maxItems 20
   * @minItems 2
   */
  options: CreatePollOptionDto[];
  /** @example false */
  allowMultiple: boolean;
  /** all_residents: все жители, owners: только собственники */
  audience: VotingAudience;
  /**
   * Срок окончания с часовым поясом
   * @format date-time
   * @example "2026-10-07T20:59:00.000Z"
   */
  endsAt: string;
}

export interface UpdatePollVotesDto {
  /**
   * ID выбранных вариантов. Повторная отправка меняет ответ, пустой массив сбрасывает выбор
   * @maxItems 20
   * @minItems 0
   * @example [1,3]
   */
  optionIds: number[];
}

export interface RequestAuthorDto {
  /** @example 1 */
  id: number;
  /** @example "Олег Чикелев" */
  name: string;
}

export interface RequestApartmentDto {
  /** @example 1 */
  id: number;
  /** @example "112" */
  number: string;
}

export interface FileDto {
  /** @example 1 */
  id: number;
  /**
   * Исходное имя файла
   * @example "photo.jpg"
   */
  name: string;
  /** @example "image/jpeg" */
  mimeType: string;
  /**
   * Размер в байтах
   * @example 245760
   */
  size: number;
  /**
   * Скачать по урл
   * @example "/api/files/1"
   */
  url: string;
}

export interface RequestEventDto {
  /** @example 1 */
  id: number;
  status: RequestStatus;
  /** @example "Мастер приедет завтра утром" */
  comment: string | null;
  /**
   * @format date-time
   * @example "2026-09-27T09:12:00.000Z"
   */
  createdAt: string;
}

export interface RequestDetailsResponseDto {
  /** @example 148 */
  id: number;
  /** @example 1 */
  houseId: number;
  /** @example "Течёт кровля над пятым подъездом" */
  title: string;
  category: RequestCategory;
  locationType: RequestLocationType;
  visibility: RequestVisibility;
  /** submitted: отправлена, in_review: на рассмотрении, in_progress: решается, resolved: ждёт подтверждения, closed: закрыта, cancelled: отменена */
  status: RequestStatus;
  /**
   * @format date-time
   * @example "2026-09-27T09:12:00.000Z"
   */
  createdAt: string;
  /** Автор, null если аккаунт удалён */
  author: RequestAuthorDto | null;
  /**
   * Заявка текущего пользователя
   * @example true
   */
  isMine: boolean;
  /** @example "После дождя вода течёт по стене у лифта" */
  description: string;
  /** @example "Пятый подъезд, девятый этаж" */
  locationText: string | null;
  /** Квартира видна автору и админам, для остальных null */
  apartment: RequestApartmentDto | null;
  /** Фото и документы заявки */
  attachments: FileDto[];
  /** История обработки от старых событий к новым */
  events: RequestEventDto[];
}

export interface RequestDto {
  /** @example 148 */
  id: number;
  /** @example 1 */
  houseId: number;
  /** @example "Течёт кровля над пятым подъездом" */
  title: string;
  category: RequestCategory;
  locationType: RequestLocationType;
  visibility: RequestVisibility;
  /** submitted: отправлена, in_review: на рассмотрении, in_progress: решается, resolved: ждёт подтверждения, closed: закрыта, cancelled: отменена */
  status: RequestStatus;
  /**
   * @format date-time
   * @example "2026-09-27T09:12:00.000Z"
   */
  createdAt: string;
  /** Автор, null если аккаунт удалён */
  author: RequestAuthorDto | null;
  /**
   * Заявка текущего пользователя
   * @example true
   */
  isMine: boolean;
}

export interface RequestsResponseDto {
  items: RequestDto[];
  /** @example 1 */
  page: number;
  /** @example 20 */
  limit: number;
  /**
   * Всего заявок с учётом фильтров и доступа
   * @example 42
   */
  total: number;
}

export interface CreateRequestDto {
  /**
   * @maxLength 255
   * @example "Течёт кровля над пятым подъездом"
   */
  title: string;
  /**
   * @maxLength 10000
   * @example "После дождя вода течёт по стене у лифта"
   */
  description: string;
  /** management: УК, electrician: электрик, plumber: сантехник, duty: дежурная служба */
  category: RequestCategory;
  /** apartment: квартира, entrance: подъезд, yard: двор */
  locationType: RequestLocationType;
  /**
   * Своя подтверждённая квартира, обязательно для apartment
   * @min 1
   * @max 4294967295
   */
  apartmentId?: number | null;
  /**
   * Уточнение места, обязательно для подъезда и двора
   * @maxLength 500
   * @example "Подъезд 5, девятый этаж, у лифта"
   */
  locationText?: string | null;
  /**
   * private: только автор и админы, house: видно соседям
   * @default "private"
   */
  visibility?: RequestVisibility;
  /**
   * ID своих файлов, загруженных в этом доме
   * @maxItems 5
   * @uniqueItems true
   * @default []
   */
  attachmentIds?: number[];
}

export interface AdminHouseStatsDto {
  /**
   * Новые заявки в УК со статусом submitted, включая приватные
   * @min 0
   * @example 12
   */
  newRequestsCount: number;
  /**
   * Все заявки в УК кроме closed и cancelled, включая новые и приватные
   * @min 0
   * @example 22
   */
  openRequestsCount: number;
  /**
   * Актуальные заявки на вступление со статусом pending, по каждой квартире отдельно
   * @min 0
   * @example 12
   */
  pendingJoinRequestsCount: number;
  /**
   * Пользователи с approved в этом доме, каждый считается один раз
   * @min 0
   * @example 286
   */
  residentsCount: number;
  /**
   * Уже начавшиеся и ещё не завершённые собрания, без отменённых
   * @min 0
   * @example 2
   */
  activeMeetingsCount: number;
}

export interface AdminRequestPreviewDto {
  /** @example 148 */
  id: number;
  /** @example "Течёт кровля над пятым подъездом" */
  title: string;
  category: RequestCategory;
  /** submitted: отправлена, in_review: на рассмотрении, in_progress: решается, resolved: ждёт подтверждения, closed: закрыта, cancelled: отменена */
  status: RequestStatus;
  /**
   * @format date-time
   * @example "2026-09-27T09:12:00.000Z"
   */
  createdAt: string;
}

export interface AdminJoinRequestPreviewDto {
  /**
   * ID заявки на вступление
   * @example 25
   */
  id: number;
  /** @example "112" */
  apartmentNumber: string;
  /** @example "Мане Айрапетян" */
  displayName: string;
  relationship: ApartmentRelationship;
  /**
   * @format date-time
   * @example "2026-09-27T09:12:00.000Z"
   */
  createdAt: string;
}

export interface AdminHouseAttentionDto {
  /**
   * До 5 заявок в УК со статусом submitted, сначала самые старые
   * @maxItems 5
   */
  requests: AdminRequestPreviewDto[];
  /**
   * До 5 актуальных заявок на вступление со статусом pending, сначала самые старые
   * @maxItems 5
   */
  joinRequests: AdminJoinRequestPreviewDto[];
}

export interface AdminHouseOverviewResponseDto {
  house: HousePreviewDto;
  stats: AdminHouseStatsDto;
  attention: AdminHouseAttentionDto;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export type ContentType =
  | "application/json"
  | "application/vnd.api+json"
  | "multipart/form-data"
  | "application/x-www-form-urlencoded"
  | "text/plain";

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    ["application/json"]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    ["application/vnd.api+json"]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    ["text/plain"]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    ["multipart/form-data"]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    ["application/x-www-form-urlencoded"]: (input: any) =>
      this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || "application/json"];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== "multipart/form-data"
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Max Hackathon API
 * @version 1.0.0
 * @contact
 *
 * HTTP API for Max Hackathon
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Health
     * @name GetHealth
     * @summary Проверка доступности API и MySQL
     * @request GET:/api/health
     */
    getHealth: (params: RequestParams = {}) =>
      this.request<HealthResponseDto, ErrorResponseDto>({
        path: `/api/health`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Echo
     * @name Echo
     * @summary Проверка и возврат сообщения
     * @request POST:/api/echo
     * @secure
     */
    echo: (data: EchoDto, params: RequestParams = {}) =>
      this.request<EchoDto, ErrorResponseDto>({
        path: `/api/echo`,
        method: "POST",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Init
     * @name Init
     * @summary Инициализация текущего пользователя
     * @request POST:/api/init
     * @secure
     */
    init: (params: RequestParams = {}) =>
      this.request<InitResponseDto, ErrorResponseDto>({
        path: `/api/init`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name GetMyNotifications
     * @summary Получить настройки уведомлений
     * @request GET:/api/users/me/notifications
     * @secure
     */
    getMyNotifications: (params: RequestParams = {}) =>
      this.request<UserNotificationsDto, ErrorResponseDto>({
        path: `/api/users/me/notifications`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Одна настройка для всех домов
     *
     * @tags Users
     * @name UpdateMyNotifications
     * @summary Изменить уведомления
     * @request PUT:/api/users/me/notifications
     * @secure
     */
    updateMyNotifications: (
      data: UserNotificationsDto,
      params: RequestParams = {},
    ) =>
      this.request<UserNotificationsDto, ErrorResponseDto>({
        path: `/api/users/me/notifications`,
        method: "PUT",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Houses
     * @name GetMyHouses
     * @summary Получение своих домов и заявок на присоединение
     * @request GET:/api/houses/me
     * @secure
     */
    getMyHouses: (params: RequestParams = {}) =>
      this.request<MyHousesResponseDto, ErrorResponseDto>({
        path: `/api/houses/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Houses
     * @name SearchHouse
     * @summary Поиск дома по коду приглашения
     * @request GET:/api/houses/search
     * @secure
     */
    searchHouse: (
      query: {
        /**
         * Код приглашения
         * @maxLength 64
         * @example "LEN-24-7Q"
         */
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchHouseResponseDto, ErrorResponseDto>({
        path: `/api/houses/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Houses
     * @name JoinHouse
     * @summary Подача заявки на присоединение к дому
     * @request POST:/api/houses/join
     * @secure
     */
    joinHouse: (data: JoinHouseDto, params: RequestParams = {}) =>
      this.request<MyHouseJoinRequestDto, ErrorResponseDto>({
        path: `/api/houses/join`,
        method: "POST",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Houses
     * @name LeaveHouse
     * @summary Отмена своей заявки на присоединение к дому
     * @request DELETE:/api/houses/leave
     * @secure
     */
    leaveHouse: (data: LeaveHouseDto, params: RequestParams = {}) =>
      this.request<void, ErrorResponseDto>({
        path: `/api/houses/leave`,
        method: "DELETE",
        body: data,
        secure: true,
        type: "application/json",
        ...params,
      }),

    /**
     * @description Выход из подтверждённого дома или удаление дома после исключения. Отменяет ожидающие заявки в этот дом.
     *
     * @tags Houses
     * @name LeaveHouseMembership
     * @summary Выход из дома
     * @request DELETE:/api/houses/membership
     * @secure
     */
    leaveHouseMembership: (
      data: LeaveHouseMembershipDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponseDto>({
        path: `/api/houses/membership`,
        method: "DELETE",
        body: data,
        secure: true,
        type: "application/json",
        ...params,
      }),

    /**
     * @description Доступны только при подтверждённом членстве в доме
     *
     * @tags Houses
     * @name GetHouseChats
     * @summary Получение чатов и каналов дома
     * @request GET:/api/houses/{houseId}/chats
     * @secure
     */
    getHouseChats: (houseId: number, params: RequestParams = {}) =>
      this.request<HouseChatsResponseDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/chats`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Список событий с пагинацией, включая отменённые. Для upcoming события идут по возрастанию даты начала, для all и past по убыванию. Требуется подтверждённое членство в доме.
     *
     * @tags Houses
     * @name GetHouseEvents
     * @summary Получение событий дома
     * @request GET:/api/houses/{houseId}/events
     * @secure
     */
    getHouseEvents: (
      houseId: number,
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @max 1000000
         * @default 1
         */
        page?: number;
        /**
         * Количество событий на странице
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
        /** all: все события; upcoming: текущие и будущие; past: завершённые */
        period?: HouseEventsPeriod;
      },
      params: RequestParams = {},
    ) =>
      this.request<HouseEventsResponseDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Информация о доме, контакты, ссылка на оплату и ближайшие события. Требуется подтверждённое членство в доме
     *
     * @tags Houses
     * @name GetHouse
     * @summary Получение информации о доме
     * @request GET:/api/houses/{houseId}
     * @secure
     */
    getHouse: (houseId: number, params: RequestParams = {}) =>
      this.request<HouseDetailsResponseDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Debug
     * @name DebugDeleteUser
     * @summary Удаление пользователя и его связей с домами
     * @request DELETE:/api/debug/users
     */
    debugDeleteUser: (data: DeleteUserDto, params: RequestParams = {}) =>
      this.request<void, ErrorResponseDto>({
        path: `/api/debug/users`,
        method: "DELETE",
        body: data,
        type: "application/json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Debug
     * @name DebugApproveJoinRequest
     * @summary Одобрение заявки на присоединение к дому
     * @request POST:/api/debug/houses/approve
     */
    debugApproveJoinRequest: (
      data: ReviewJoinRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponseDto>({
        path: `/api/debug/houses/approve`,
        method: "POST",
        body: data,
        type: "application/json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Debug
     * @name DebugRejectJoinRequest
     * @summary Отклонение заявки на присоединение к дому
     * @request POST:/api/debug/houses/reject
     */
    debugRejectJoinRequest: (
      data: RejectJoinRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponseDto>({
        path: `/api/debug/houses/reject`,
        method: "POST",
        body: data,
        type: "application/json",
        ...params,
      }),

    /**
     * @description Можно передать один question со сроком или полную повестку. Доступно собственникам, организаторам, совету дома и админам
     *
     * @tags Meetings
     * @name CreateMeeting
     * @summary Создание собрания
     * @request POST:/api/houses/{houseId}/meetings
     * @secure
     */
    createMeeting: (
      houseId: number,
      data: CreateMeetingDto,
      params: RequestParams = {},
    ) =>
      this.request<MeetingDetailsResponseDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/meetings`,
        method: "POST",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * @description Общий список для главной. Актуальные идут по дате начала, прошедшие по дате окончания. Доступно подтверждённым жителям дома
     *
     * @tags Meetings
     * @name GetHouseMeetings
     * @summary Собрания и опросы дома
     * @request GET:/api/houses/{houseId}/meetings
     * @secure
     */
    getHouseMeetings: (
      houseId: number,
      query?: {
        /** actual: текущие и будущие, past: завершённые и отменённые */
        period?: MeetingsPeriod;
        /**
         * Номер страницы
         * @min 1
         * @max 1000000
         * @default 1
         */
        page?: number;
        /**
         * Количество собраний и опросов на странице
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MeetingsResponseDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/meetings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Для подтверждённых жителей дома, включая нанимателей. Ответ можно менять до начала очного или очно-заочного собрания
     *
     * @tags Meetings
     * @name UpdateMeetingParticipation
     * @summary Приду или не приду на собрание
     * @request PUT:/api/meetings/{meetingId}/participation
     * @secure
     */
    updateMeetingParticipation: (
      meetingId: number,
      data: UpdateMeetingParticipationDto,
      params: RequestParams = {},
    ) =>
      this.request<MeetingParticipationResponseDto, ErrorResponseDto>({
        path: `/api/meetings/${meetingId}/participation`,
        method: "PUT",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * @description Кто может голосовать зависит от аудитории собрания. Пока голосование открыто, можно менять ответы или сбросить все свои ответы, передав пустой votes
     *
     * @tags Meetings
     * @name UpdateMeetingVotes
     * @summary Голосование по вопросам собрания
     * @request PUT:/api/meetings/{meetingId}/votes
     * @secure
     */
    updateMeetingVotes: (
      meetingId: number,
      data: UpdateMeetingVotesDto,
      params: RequestParams = {},
    ) =>
      this.request<MeetingVotesResponseDto, ErrorResponseDto>({
        path: `/api/meetings/${meetingId}/votes`,
        method: "PUT",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * @description Передайте ID из списка вместе с типом: meeting_154 или poll_154
     *
     * @tags Meetings
     * @name GetMeetingItem
     * @summary Получение собрания или опроса
     * @request GET:/api/meetings/{itemId}
     * @secure
     */
    getMeetingItem: (itemId: string, params: RequestParams = {}) =>
      this.request<
        | ({
            type: "meeting";
          } & MeetingDetailsResponseDto)
        | ({
            type: "poll";
          } & PollDto),
        ErrorResponseDto
      >({
        path: `/api/meetings/${itemId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Создать опрос для жителей этого дома
     *
     * @tags Polls
     * @name CreatePoll
     * @summary Создать опрос
     * @request POST:/api/houses/{houseId}/polls
     * @secure
     */
    createPoll: (
      houseId: number,
      data: CreatePollDto,
      params: RequestParams = {},
    ) =>
      this.request<PollDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/polls`,
        method: "POST",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * @description До конца опроса можно поменять ответ или сбросить выбор, передав пустой optionIds
     *
     * @tags Polls
     * @name UpdatePollVotes
     * @summary Ответить на опрос
     * @request PUT:/api/polls/{pollId}/votes
     * @secure
     */
    updatePollVotes: (
      pollId: number,
      data: UpdatePollVotesDto,
      params: RequestParams = {},
    ) =>
      this.request<PollDto, ErrorResponseDto>({
        path: `/api/polls/${pollId}/votes`,
        method: "PUT",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * @description Описание, вложения и история обработки. Личную заявку видят автор и админы дома
     *
     * @tags Requests
     * @name GetRequest
     * @summary Получение заявки
     * @request GET:/api/requests/{requestId}
     * @secure
     */
    getRequest: (requestId: number, params: RequestParams = {}) =>
      this.request<RequestDetailsResponseDto, ErrorResponseDto>({
        path: `/api/requests/${requestId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Свои или открытые соседям заявки, новые сверху. Доступно подтверждённым жителям
     *
     * @tags Requests
     * @name GetHouseRequests
     * @summary Получение заявок дома
     * @request GET:/api/houses/{houseId}/requests
     * @secure
     */
    getHouseRequests: (
      houseId: number,
      query?: {
        /** mine: свои заявки, house: открытые соседям */
        scope?: RequestsScope;
        /** all: все статусы, open: кроме закрытых и отменённых, либо конкретный статус */
        status?: RequestsStatusFilter;
        category?: RequestCategory;
        /**
         * @min 1
         * @max 1000000
         * @default 1
         */
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RequestsResponseDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/requests`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Для подтверждённых жителей дома. Файлы сначала загрузите через POST /houses/:houseId/files
     *
     * @tags Requests
     * @name CreateRequest
     * @summary Создание заявки
     * @request POST:/api/houses/{houseId}/requests
     * @secure
     */
    createRequest: (
      houseId: number,
      data: CreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<RequestDetailsResponseDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/requests`,
        method: "POST",
        body: data,
        secure: true,
        type: "application/json",
        format: "json",
        ...params,
      }),

    /**
     * @description Проверяется доступ к дому и заявке. Для просмотра изображения загрузите его с Authorization и создайте blob URL
     *
     * @tags Files
     * @name GetFile
     * @summary Получение файла
     * @request GET:/api/files/{fileId}
     * @secure
     */
    getFile: (fileId: number, params: RequestParams = {}) =>
      this.request<Blob, ErrorResponseDto>({
        path: `/api/files/${fileId}`,
        method: "GET",
        secure: true,
        format: "blob",
        ...params,
      }),

    /**
     * @description JPEG, PNG, WebP или PDF до 10 МБ. До привязки к заявке файл доступен только загрузившему его жителю
     *
     * @tags Files
     * @name UploadHouseFile
     * @summary Загрузка файла для заявки
     * @request POST:/api/houses/{houseId}/files
     * @secure
     */
    uploadHouseFile: (
      houseId: number,
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<FileDto, ErrorResponseDto>({
        path: `/api/houses/${houseId}/files`,
        method: "POST",
        body: data,
        secure: true,
        type: "multipart/form-data",
        format: "json",
        ...params,
      }),

    /**
     * @description Счётчики и заявки требующие внимания. Доступно только подтверждённому администратору этого дома
     *
     * @tags Admin houses
     * @name GetAdminHouseOverview
     * @summary Обзор дома для администратора
     * @request GET:/api/admin/houses/{houseId}/overview
     * @secure
     */
    getAdminHouseOverview: (houseId: number, params: RequestParams = {}) =>
      this.request<AdminHouseOverviewResponseDto, ErrorResponseDto>({
        path: `/api/admin/houses/${houseId}/overview`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
