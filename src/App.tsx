import React from 'react';
import { Modal, ModalTarget } from './components/modal/Modal';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeProvider, useMode } from './theme';
import AppRoutes from './routes/Routes';
import SideBar from './components/global/Sidebar';
import Topbar from './components/global/Topbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [theme, toggleColorMode] = useMode();

  const notify = () => {
    toast.success('msg', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    toast.error('msg', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  return (
    <Modal target={ModalTarget.ROOT}>
      <ColorModeProvider value={{ toggleColorMode }}>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SideBar />
            <main className="content">
              <Topbar />
              <AppRoutes />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeProvider>
    </Modal>
  );
}

export default App;
