export const tenantDetailOptions = () => {
  return {
    variables: {
      input: {},
    },
    fetchPolicy: 'cache-and-network',
  };
};

export const mapDetailTenantProps = props => {
  const { tenantData, ownProps } = props;
  const { initialValues } = ownProps;
  const { tenant = {} } = tenantData || {};

  return {
    tenantData: {
      ...tenantData,
      tenant: {
        ...tenant,
      },
    },
    initialValues: {
      ...initialValues,
      company_name: tenant.company_name,
      company_phone: tenant.company_phone,
      location: tenant.location,
    },
  };
};
