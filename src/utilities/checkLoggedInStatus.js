export     const checkLoggedInStatus = (setLoggedIn, setAccessToken) => {
    const token = localStorage.getItem('access_token');
    setAccessToken(token);

    if (token) {
      setLoggedIn(true);
    }
  };