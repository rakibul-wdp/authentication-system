import { useEffect, useState } from 'react';

const useToken = (user) => {
  const [token, setToken] = useState('');

  return [token];
};

export default useToken;
