import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import "@fontsource/poppins/index.css"; 

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  colors: {
    'primary-color': ['#3B3B3B', '#3B3B3B', '#3B3B3B', '#3B3B3B', '#3B3B3B', '#3B3B3B', '#3B3B3B', '#3B3B3B', '#3B3B3B', '#3B3B3B'],
  },
  primaryColor: 'primary-color',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <MantineProvider theme={theme}>
      <ModalsProvider>
          <App />
          <Notifications position="top-right" zIndex={2077} />
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
