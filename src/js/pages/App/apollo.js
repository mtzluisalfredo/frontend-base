export const mapProps = props => {
  const { data } = props;

  return {
    data: {
      ...data,
    },
  };
};

export const queryOptions = () => {
  return {
    variables: {
      input: {},
    },
    fetchPolicy: 'cache-and-network',
  };
};
