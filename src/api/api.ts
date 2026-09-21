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

export type HouseJoinRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

/** Права просмотра. При отозванном доступе список пуст. */
export type HousePermission = "houses.read" | "meetings.read" | "requests.read";

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
  | "HOUSE_MEMBERSHIP_NOT_FOUND";

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

export interface HouseNotificationsDto {
  /** @example true */
  meetings: boolean;
  /** @example true */
  requests: boolean;
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
  notifications: HouseNotificationsDto;
}

export interface MyHouseDto {
  /** @example 10 */
  id: number;
  /** @example "ул. Ленина, 24" */
  address: string;
  /** @example "Жилсервис" */
  managementCompanyName: string | null;
  /** Ссылка для связи с администратором дома */
  adminContactUrl: string | null;
  /** @example 412 */
  apartmentsCount: number | null;
  /** @example 6 */
  entrancesCount: number | null;
  membership: MyHouseMembershipDto;
  /** Права просмотра. При отозванном доступе список пуст. */
  permissions: HousePermission[];
}

export interface HouseSummaryDto {
  /** @example 10 */
  id: number;
  /** @example "ул. Ленина, 24" */
  address: string;
  /** @example "Жилсервис" */
  managementCompanyName: string | null;
  /** Ссылка для связи с администратором дома */
  adminContactUrl: string | null;
  /** @example 412 */
  apartmentsCount: number | null;
  /** @example 6 */
  entrancesCount: number | null;
}

export interface MyHouseJoinRequestDto {
  /** @example 25 */
  id: number;
  house: HouseSummaryDto;
  /** @example "112" */
  apartmentNumber: string;
  /** @example "Александр Кузнецов" */
  displayName: string;
  relationship: ApartmentRelationship;
  status: HouseJoinRequestStatus;
  /** @example null */
  rejectionReason: string | null;
  notifications: HouseNotificationsDto;
  permissions: HousePermission[];
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
}

export interface InitResponseDto {
  /** Дома с подтверждённым или отозванным доступом. Покинутые дома не возвращаются. */
  houses: MyHouseDto[];
  /** Последние заявки по каждой квартире, ожидающие подтверждения или отклонённые. Заявки до последнего выхода из дома не возвращаются. */
  joinRequests: MyHouseJoinRequestDto[];
  user: UserProfileDto;
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
  /** Ссылка для связи с администратором дома */
  adminContactUrl: string | null;
  /** @example 412 */
  apartmentsCount: number | null;
  /** @example 6 */
  entrancesCount: number | null;
  /**
   * Количество пользователей с подтверждённым доступом к дому
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

export interface JoinHouseNotificationsDto {
  /** @example true */
  meetings: boolean;
  /** @example true */
  requests: boolean;
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
  notifications: JoinHouseNotificationsDto;
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

export interface UpdateHouseNotificationsDto {
  notifications: JoinHouseNotificationsDto;
  /**
   * @min 1
   * @max 4294967295
   * @example 1
   */
  houseId: number;
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
     * @description Настройки текущего пользователя в подтверждённом доме. Передайте оба переключателя.
     *
     * @tags Houses
     * @name UpdateHouseNotifications
     * @summary Изменение уведомлений дома
     * @request PUT:/api/houses/notifications
     * @secure
     */
    updateHouseNotifications: (
      data: UpdateHouseNotificationsDto,
      params: RequestParams = {},
    ) =>
      this.request<HouseNotificationsDto, ErrorResponseDto>({
        path: `/api/houses/notifications`,
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
  };
}
