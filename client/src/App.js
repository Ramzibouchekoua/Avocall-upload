import React, { useState, useEffect } from 'react';
import UserContext from './context/userContext';
import { Switch, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import Layout from './Layout';
import axios from 'axios';
import io from 'socket.io-client';
//PAGES
import HomePage from './containers/HomePage';
import ContactUs from './containers/ContactUS/index';
import Signup from './containers/SignUp';
import SignupPro from './containers/SignUp/SignUpPro';
import Signin from './containers/SignIn';
import Videochat from './containers/Videochat';
import Videonotready from './containers/VideoNotReady';
import Phonenotready from './containers/PhoneCall';
import Textchat from './containers/Text-chat';
import Payement from './containers/Payement';
import Dashboard from './containers/Dashboard';
import DashboardPro from './containers/Dashboard/dashboardPro';
import WrittenAdvice from './containers/Written-advice';
import updateConsultation from './containers/UpdateConsultation';
import UpdateProfile from './containers/UpdateProfile';
import UpdateProfilePro from './containers/UpdateProfile/UpdateProfilePro';
import PhoneCall from './containers/PhoneCall';
import PhoneExpired from './containers/Phoneexpired';
import PayementFailed from './containers/PayementError';
import PayementSuccess from './containers/PayementSuccess';
import PayementPending from './containers/PayementPending';
import PayementGateway from './containers/PayementGateway';
import Verification from './containers/AccountVerification';
import Validaton from './containers/AccountVerification/AccountValidation';

import Confirmation from './containers/OrderConfirmation';
import Book from './containers/Book';
import Wallet from './containers/Wallet';
import Welcomemsg from './containers/Welcome';
import VidPage from './videoChat/components/App/App';
import DashboardAdmin from './containers/DashboardAdmin';
//ERROR PAGES
import UnAuthorized from './containers/ErrorResult/unAuthorized';
import ServerError from './containers/ErrorResult/serverError';
import NotFound from './containers/ErrorResult/notFound';
//PRIVATE ROUTE
import PrivateUser from './privateRoutes/PrivateUser';
import PrivateUserPro from './privateRoutes/PrivateUserPro';
import PrivateAuth from './privateRoutes/PrivateAuth';
import PrivateUserAdmin from './privateRoutes/PrivateUserAdmin';
import ScrollToTop from './ScrollToTop';

export default function App() {
  const [socket, setSocket] = useState(null);
  const [isPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // Socket cleanup function
  const cleanupSocket = (currentSocket) => {
    if (currentSocket) {
      currentSocket.removeAllListeners();
      currentSocket.disconnect();
    }
  };

  //SOCKET Begin - Optimized connection management
  const setupSocket = () => {
    const token = localStorage.getItem('auth-token');

    // Don't reconnect if no token or socket already exists
    if (!token || socket) return;

    const newSocket = io(process.env.REACT_APP_API_URL, {
      query: {
        token: token,
      },
      // Start with polling, then upgrade to websocket if available
      transports: ['polling', 'websocket'],
      upgrade: true,
      // Connection timeout and ping settings
      timeout: 15000,
      forceNew: false,
      // Additional reliability options
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 5,
      maxReconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected via:', newSocket.io.engine.transport.name);
      setSocketConnected(true);
      setReconnectAttempts(0); // Reset counter on successful connection
    });

    // Log transport upgrades
    newSocket.on('upgrade', () => {
      console.log('Socket upgraded to:', newSocket.io.engine.transport.name);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setSocketConnected(false);
      setSocket(null);

      // Only auto-reconnect for certain disconnect reasons and if user is still authenticated
      const shouldReconnect = ['io server disconnect', 'ping timeout', 'transport close', 'transport error'].includes(
        reason,
      );

      if (shouldReconnect && localStorage.getItem('auth-token') && reconnectAttempts < 5) {
        // Exponential backoff: 2s, 4s, 8s, 16s, 32s
        const delay = Math.min(2000 * Math.pow(2, reconnectAttempts), 32000);
        setReconnectAttempts((prev) => prev + 1);

        setTimeout(() => {
          setupSocket();
        }, delay);
      }
    });

    newSocket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
      setSocketConnected(false);
    });

    setSocket(newSocket);
  };
  // Initialize socket when component mounts
  useEffect(() => {
    setupSocket();

    // Cleanup socket on component unmount
    return () => {
      cleanupSocket(socket);
    };
    // eslint-disable-next-line
  }, []);

  // Reconnect socket when user data changes (login/logout)
  useEffect(() => {
    if (userData.token && !socket) {
      setupSocket();
    } else if (!userData.token && socket) {
      cleanupSocket(socket);
      setSocket(null);
      setSocketConnected(false);
      setReconnectAttempts(0);
    }
    // eslint-disable-next-line
  }, [userData.token]);
  //SOCKET End

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');
    if (!token) {
      localStorage.setItem('auth-token', '');
      token = '';
    } else {
      const tokenRes = await axios.get(process.env.REACT_APP_API_URL + '/api/user/tokenIsValid', {
        headers: { 'x-auth-token': token },
      });
      try {
        if (tokenRes.data) {
          const userRes = await axios.get(process.env.REACT_APP_API_URL + '/api/user/', {
            headers: { 'x-auth-token': token },
          });
          setUserData({
            token,
            user: userRes.data,
          });
        }
      } catch (err) {
        setUserData({
          token: undefined,
          user: undefined,
        });
      }
    }
  };
  useEffect(() => {
    checkLoggedIn();
    setIsLoading(false);

    // // eslint-disable-next-line
  }, []);
  return (
    <div dir="rtl">
      <BrowserRouter>
        <ScrollToTop />
        <UserContext.Provider value={{ userData, setUserData }}>
          {isLoading ? (
            <Spin tip="جاري..." spinning={isLoading} />
          ) : (
            <>
              <Layout>
                <Switch>
                  {/* COMMON PAGES */}
                  <Route exact path="/">
                    <HomePage isPro={isPro} />
                  </Route>
                  <PrivateAuth exact path="/sign-up" component={Signup} />
                  <PrivateAuth exact path="/sign-up-pro" component={SignupPro} />
                  <PrivateAuth exact path="/sign-in" component={Signin} />
                  <Route exact path="/AccountValidation" component={Validaton} />

                  <Route exact path="/contact" component={ContactUs} />
                  {/* <Route exact path="/Wallet" component={Wallet} /> */}
                  <Route exact path="/vid-page/:id" component={VidPage} />
                  <Route exact path="/text-chat/:id" render={() => <Textchat socket={socket} />} />

                  {/* ADMIN PAGES */}

                  <PrivateUserAdmin exact path="/DashboardAdmin" component={DashboardAdmin} />

                  {/* PRO PAGES */}
                  <PrivateUserPro exact path="/dashboardPro" component={DashboardPro} />
                  <Route exact path="/profilePro">
                    <UpdateProfilePro isPro={isPro} />
                  </Route>

                  {/* USER PAGES */}
                  <PrivateUser exact path="/dashboard" component={Dashboard} />
                  <PrivateUser exact path="/Welcomemsg" component={Welcomemsg} />
                  <PrivateUser exact path="/profile" component={UpdateProfile} />
                  <PrivateUser exact path="/written-advice" component={WrittenAdvice} />
                  <PrivateUser exact path="/update-consultation/:id" component={updateConsultation} />
                  {/*<PrivateUser exact path="/PayementError" component={PayementFailed} />
                <PrivateUser exact path="/PayementSuccess" component={PayementSuccess} />*/}
                  <Route exact path="/AccountVerification" component={Verification} />
                  <Route exact path="/OrderConfirmation">
                    <Confirmation />
                  </Route>
                  {/*<PrivateUser exact path="/OrderConfirmation" component={Confirmation} />*/}
                  <PrivateUser exact path="/book" component={Book} />
                  <PrivateUser exact path="/checkout" component={Payement} />
                  <PrivateUser exact path="/video-chat" component={Videochat} />
                  <PrivateUser exact path="/video-not-ready" component={Videonotready} />
                  <PrivateUser exact path="/phoneexpired" component={PhoneExpired} />
                  <PrivateUser exact path="/phone-not-ready" component={Phonenotready} />
                  <PrivateUser exact path="/phone-call" component={PhoneCall} />
                  {/* <Route exact path="/Welcomemsg">
                  <Welcomemsg isPro={isPro} />
                </Route> */}
                  {/* <Route exact path="/profile">
                  <UpdateProfile isPro={isPro} />
                </Route> */}
                  {/* <Route exact path="/written-advice" component={WrittenAdvice}/> */}
                  {/* <Route exact path="/update-consultation/:id" component={updateConsultation}/> */}
                  {/* <Route exact path="/PayementError" component={PayementFailed} /> */}
                  {/* <Route exact path="/AccountVerification" component={Verification} /> */}
                  {/* <Route exact path="/OrderConfirmation" component={Confirmation} /> */}
                  {/* <Route exact path="/book" component={Book} /> */}
                  {/* <Route exact path="/checkout" component={Payement} /> */}
                  {/* <Route exact path="/video-chat" component={Videochat} /> */}
                  {/* <Route exact path="/video-not-ready" component={Videonotready} /> */}
                  {/* <Route exact path="/phoneexpired" component={PhoneExpired} /> */}
                  {/* <Route exact path="/phone-not-ready" component={Phonenotready} /> */}
                  {/* <Route exact path="/phone-call" component={PhoneCall} /> */}

                  {/* REDIRECTION PAGES */}
                  <Route exact path="/unauthorized" component={UnAuthorized} />
                  <Route exact path="/server-error" component={ServerError} />
                  <Route exact path="/payment-gateway" component={PayementGateway} />
                  <Route exact path="/payment-error" component={PayementFailed} />
                  <PrivateUser exact path="/payment-pending" component={PayementPending} />
                  <Route exact path="/payment-success" component={PayementSuccess} />
                  <Route exact strict component={NotFound} />
                </Switch>
              </Layout>
            </>
          )}
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
