const commonOptions = [
  {
    value: 'profile',
    label: 'Ver Perfil',
  },
  {
    value: 'logout',
    label: 'Cerrar Sesión',
  },
];

export default {
  DEFAULT: () => [
    {
      value: 'profile',
      label: 'Ver Perfil',
    },
    {
      value: 'logout',
      label: 'Cerrar Sesión',
    },
  ],
  ADMIN: () => commonOptions,
  CLIENT: () => commonOptions,
  MANAGER: () => commonOptions,
  LOBBY: () => commonOptions,
  TENANT_DESK: () => commonOptions,
};
