import * as React from 'react';
import AuthContext from 'context/AuthContext';

const useAuthContext = () => React.useContext(AuthContext);

export default useAuthContext;
