import * as React from 'react';
import { ThemeContext } from '@/providers/ThemeProvider';

const useThemeContext = () => React.useContext(ThemeContext);

export default useThemeContext;
