export default state => {
  const { session: { user, token }, userProfile = {} } = state;
  const { loading } = userProfile;

  return {
    loading,
    user,
    token,
    userProfile,
    initialValues: {
      ...user,
    },
  };
};
