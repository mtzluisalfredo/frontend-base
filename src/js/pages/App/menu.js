const clientMenu = ({ id }) => [
  {
    label: 'Actividad',
    to: `/buildings/${id}`,
    icon: 'general',
  },
  {
    label: 'Colaboradores',
    to: `/buildings/${id}/staff`,
    icon: 'staff',
  },
  {
    label: 'Inquilinos',
    to: `/buildings/${id}/tenants`,
    icon: 'tenants',
  },
  {
    label: 'Dispositivos',
    to: `/buildings/${id}/devices`,
    icon: 'devices',
  },
  {
    label: 'Reportes',
    to: `/buildings/${id}/reports`,
    icon: 'visitors',
  },
  {
    label: 'Facturación',
    to: `/buildings/${id}/billing`,
    icon: 'payments',
  },
  {
    label: 'Configuración',
    to: `/buildings/${id}/config`,
    icon: 'configuration',
  },
];

const managerMenu = ({ id }) => [
  {
    label: 'General',
    to: `/buildings/${id}`,
    icon: 'general',
  },
  {
    label: 'Colaboradores',
    to: `/buildings/${id}/staff`,
    icon: 'staff',
  },
  {
    label: 'Inquilinos',
    to: `/buildings/${id}/tenants`,
    icon: 'tenants',
  },
  {
    label: 'Dispositivos',
    to: `/buildings/${id}/devices`,
    icon: 'devices',
  },
  {
    label: 'Reportes',
    to: `/buildings/${id}/reports`,
    icon: 'visitors',
  },
];

const adminMenu = ({ id }) => [
  {
    label: 'Planes',
    to: '/plans',
    icon: 'devices',
  },
  {
    label: 'Clientes',
    to: '/clients',
    icon: 'tenants',
  },
];

export default {
  ADMIN: adminMenu,
  CLIENT: clientMenu,
  MANAGER: managerMenu,
};
