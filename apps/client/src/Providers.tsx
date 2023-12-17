import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from 'context/AuthContext';
import { ThemeProvider } from 'context/ThemeContext';

type Props = React.PropsWithChildren<{ withReactQueryDevTools?: boolean }>;

const Providers = ({ children, withReactQueryDevTools = false }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <ThemeProvider defaultTheme='dark' storageKey='task-manager-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          {withReactQueryDevTools && (
            <ReactQueryDevtools initialIsOpen={false} position='bottom' />
          )}
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
