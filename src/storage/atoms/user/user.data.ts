import type { InitResponseDto } from 'src/api/api.ts';

export const ATOM_USER_DEFAULT_DATA: InitResponseDto = {
  houses: [],
  joinRequests: [],
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    photoUrl: '',
    notificationsEnabled: false,
  },
  /*houses: [
    {
      id: 10,
      address: 'ул. Ленина, 24',
      managementCompanyName: 'Жилсервис',
      apartmentsCount: 412,
      entrancesCount: 6,
      adminContactUrl: 'string',
      membership: {
        id: 1,
        status: 'approved',
        revocationReason: 'string',
        displayName: 'Александр Кузнецов',
        roles: ['resident'],
        apartments: [
          {
            id: 105,
            number: '112',
            relationship: 'owner',
            verificationStatus: 'pending',
          },
        ],
        notifications: {
          meetings: true,
          requests: true,
        },
      },
      code: '',
      residentsCount: 0,
      permissions: [],
    },
  ],
  joinRequests: [
    {
      id: 25,
      house: {
        id: 10,
        address: 'ул. Ленина, 24',
        managementCompanyName: 'Жилсервис',
        apartmentsCount: 412,
        entrancesCount: 6,
      },
      apartmentNumber: '112',
      displayName: 'Александр Кузнецов',
      relationship: 'owner',
      status: 'pending',
      rejectionReason: null,
      notifications: {
        meetings: true,
        requests: true,
      },
    },
  ],
  user: {
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    username: null,
    photoUrl: null,
  },*/
};
