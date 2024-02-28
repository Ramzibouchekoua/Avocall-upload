import React, { useEffect, useState, useCallback } from 'react';
import Call from '../Call/Call';
import StartButton from '../StartButton/StartButton';
import api from '../../api';
import './App.css';
import Tray from '../Tray/Tray';
import CallObjectContext from '../../CallObjectContext';
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from '../../urlUtils';
import DailyIframe from '@daily-co/daily-js';
import { logDailyEvent } from '../../logUtils';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ar-tn';
import { Alert, Spin, Typography } from 'antd';

const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

export default function App() {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);

  const [theConsultation, setTheConsultation] = useState(false);
  const [consultationStatus, setConsultationStatus] = useState(false);
  const [roleUser, setRoleUser] = useState(null);
  const { id } = useParams();
  const chatroomId = id;
  useEffect(() => {
    fetchData();
  }, []);
  const authToken = localStorage.getItem('auth-token');

  const fetchData = async () => {
    try {
      if (!authToken) {
        // Redirect to sign-in page if auth token is not present
        window.location.href = '/sign-in';
      } else {
        const userResponse = await axios.get(process.env.REACT_APP_API_URL + `/api/user/`, {
          headers: {
            'x-auth-token': authToken,
          },
        });
        const role = userResponse.data.role;
        setRoleUser(role);

        if (role) {
          const consultationResponse = await axios.get(
            process.env.REACT_APP_API_URL + `/api/user/consultation/${chatroomId}`,
            {
              headers: {
                'x-auth-token': authToken,
              },
            }
          );
          setTheConsultation(consultationResponse.data[0]);
        } else {
          // Redirect to sign-in page if role is not present
          window.location.href = '/sign-in';
        }
      }
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (roleUser === 'ADMIN') {
      setTheConsultation(true);
    } else checkDate();
  }, [theConsultation]);

  /**
   * Creates a new call room.
   */
  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return api
      .createRoom()
      .then((room) => room.url)
      .catch((error) => {
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
  }, []);

  /**
   * Starts joining an existing call.
   *
   * NOTE: In this demo we show how to completely clean up a call with destroy(),
   * which requires creating a new call object before you can join() again.
   * This isn't strictly necessary, but is good practice when you know you'll
   * be done with the call object for a while and you're no longer listening to its
   * events.
   */
  const startJoiningCall = useCallback((url) => {
    const newCallObject = DailyIframe.createCallObject();
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url: 'https://avocall.daily.co/prod' });
  }, []);

  /**
   * Starts leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // If we're in the error state, we've already "left", so just clean up
    if (appState === STATE_ERROR) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE_IDLE);
      });
    } else {
      setAppState(STATE_LEAVING);
      callObject.leave();
    }
  }, [callObject, appState]);

  /**
   * If a room's already specified in the page's URL when the component mounts,
   * join the room.
   */
  useEffect(() => {
    const url = roomUrlFromPageUrl();
    url && startJoiningCall(url);
  }, [startJoiningCall]);

  /**
   * Update the page's URL to reflect the active call when roomUrl changes.
   *
   * This demo uses replaceState rather than pushState in order to avoid a bit
   * of state-management complexity. See the comments around enableCallButtons
   * and enableStartButton for more information.
   */
  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  /**
   * Uncomment to attach call object to window for debugging purposes.
   */
  // useEffect(() => {
  //   window.callObject = callObject;
  // }, [callObject]);

  /**
   * Update app state based on reported meeting state changes.
   *
   * NOTE: Here we're showing how to completely clean up a call with destroy().
   * This isn't strictly necessary between join()s, but is good practice when
   * you know you'll be done with the call object for a while and you're no
   * longer listening to its events.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = ['joined-meeting', 'left-meeting', 'error'];

    function handleNewMeetingState(event) {
      event && logDailyEvent(event);
      switch (callObject.meetingState()) {
        case 'joined-meeting':
          setAppState(STATE_JOINED);
          break;
        case 'left-meeting':
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case 'error':
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  /**
   * Listen for app messages from other call participants.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      if (event) {
        logDailyEvent(event);
      }
    }

    callObject.on('app-message', handleAppMessage);

    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
    };
  }, [callObject]);

  const checkDate = () => {
    const parsedDate = moment(theConsultation.date);
    const fiveMinutesBefore = parsedDate.clone().subtract(5, 'minutes');
    const thirtyMinutesAfter = parsedDate.clone().add(30, 'minutes');
    const currentDate = moment();
    if (currentDate.isBetween(fiveMinutesBefore, thirtyMinutesAfter)) {
      setConsultationStatus(true);
    } else {
      setConsultationStatus(false);
    }
  };
  /**
   * Show the call UI if we're either joining, already joined, or are showing
   * an error.
   */
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(appState);

  /**
   * Only enable the call buttons (camera toggle, leave call, etc.) if we're joined
   * or if we've errored out.
   *
   * !!!
   * IMPORTANT: calling callObject.destroy() *before* we get the "joined-meeting"
   * can result in unexpected behavior. Disabling the leave call button
   * until then avoids this scenario.
   * !!!
   */
  const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(appState);

  /**
   * Only enable the start button if we're in an idle state (i.e. not creating,
   * joining, etc.).
   *
   * !!!
   * IMPORTANT: only one call object is meant to be used at a time. Creating a
   * new call object with DailyIframe.createCallObject() *before* your previous
   * callObject.destroy() completely finishes can result in unexpected behavior.
   * Disabling the start button until then avoids that scenario.
   * !!!
   */
  const enableStartButton = appState === STATE_IDLE;
  const callVideo = () =>
    showCall ? (
      // NOTE: for an app this size, it's not obvious that using a Context
      // is the best choice. But for larger apps with deeply-nested components
      // that want to access call object state and bind event listeners to the
      // call object, this can be a helpful pattern.
      <div className="call-box">
        <CallObjectContext.Provider value={callObject}>
          <Call roomUrl={roomUrl} />
          <Tray disabled={!enableCallButtons} onClickLeaveCall={startLeavingCall} />
        </CallObjectContext.Provider>
      </div>
    ) : (
      <StartButton
        // disabled={!enableStartButton}
        // disabled={!moment(theConsultation.date).isSame(moment().today)}
        onClick={() => {
          createCall().then((url) => startJoiningCall(url));
        }}
      />
    );
  return (
    <div className="video-chat">
      {theConsultation ? (
        <>
          <div className="Table">
            <table className="az">
              <tbody>
                <tr>
                  <th>إستشارة كتابيّة</th>
                </tr>
                <tr>
                  <td>{theConsultation.field}</td>
                </tr>
                <tr>
                  <td>{theConsultation.title}</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th> التاريخ</th>
                </tr>
                <tr>
                  <td>{moment(theConsultation.date).format('LLLL')}</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th> الحالة</th>
                </tr>
                <tr>
                  <td> {theConsultation.isClosed || 'مفتوحة'}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>تفاصيل الاستشارة</th>
                </tr>
                <tr>
                  <td>{theConsultation.description}</td>
                </tr>
              </tbody>
            </table>
            <button className="button-blue">أغلق الاستشارة</button>
            <button className="button-blue">تعديل الاستشارة</button>
            <button className="Connexion ">مشكلة في الاستشارة ؟</button>
          </div>
          <div className="redirection">
            <Alert
              message={
                <span className="title">
                  لقد تم حجز المكالمة الالكترونية بنجاح بتاريخ {moment(theConsultation.date).format('LLLL')}
                </span>
              }
              description={
                <span className="text">
                  سيتصل بك مستشارنا القانوني الكترونيا للاجابة على استفساراتك القانونية. لذا نلتمس منكم مراعات الموعد
                  الالكتروني و الحرص على تواجدكم بالموقع بالوقت المحدد
                </span>
              }
              type={consultationStatus ? 'success' : 'error'}
              // showIcon
              className="alert"
            />
            {consultationStatus ? (
              callVideo()
            ) : (
              <Typography level={4} style={{ textAlign: 'center' }}>
                سيظهر زر الاتصال قبل خمس دقائق فقط من وقت المكالمة.
              </Typography>
            )}
          </div>
        </>
      ) : (
        <Spin tip="جاري..." />
      )}
    </div>
  );
}
