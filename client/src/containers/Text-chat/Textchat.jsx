import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReportModal from '../../components/ReportModal';
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/ar-tn';
import displayNotification from '../../components/displayNotification';
import { Col, Row, Spin } from 'antd';
const Textchat = ({ socket }) => {
  const [reportVisible, setReportVisible] = useState(false);
  const { id } = useParams();
  const chatroomId = id;
  const [messages, setMessages] = useState([]);
  const [pics, setPics] = useState([]);
  const [theConsultation, setTheConsultation] = useState({});
  const messageRef = useRef();
  const [userId, setUserId] = useState('');
  const [userOwner, setUserOwner] = useState(null);
  const [statusOfPage, setStatusOfPage] = useState('Loading');
  const [lastNotifiedMessage, setLastNotifiedMessage] = useState(null);

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
        const owner = userResponse.data;
        setUserOwner(owner);
        if (owner) {
          try {
            const consultationResponse = await axios.get(
              process.env.REACT_APP_API_URL + `/api/user/consultation/${chatroomId}`,
              {
                headers: {
                  'x-auth-token': authToken,
                },
              }
            );

            if (consultationResponse.data[0]) {
              const consultationUserId = consultationResponse.data[0].userId;
              const userRoleId = userResponse.data.role;
              const userId = userResponse.data._id;

              if (userRoleId === 'ADMIN' || consultationUserId === userId) {
                setTheConsultation(consultationResponse.data[0]);
                setStatusOfPage('Allowed');
              } else {
                setStatusOfPage('Not Allowed');
                displayNotification('error', 'خطأ', 'لا يسمح لك برؤية هذه الصفحة');
              }
            } else {
              setStatusOfPage('Not Allowed');
            }
          } catch (error) {
            // Handle error from consultation response
            console.error('Error fetching consultation:', error);
            setStatusOfPage('Not Allowed');
          }
        } else {
          // Redirect to sign-in page if role is not present
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
  };
  const sendMessage = () => {
    if (socket) {
      socket.emit('chatroomMessage', {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = '';
    }
  };
  const handleKeyDown = (event) => {
    // Check if the pressed key is "Enter" (key code 13)
    if (event.keyCode === 13) {
      // Prevent the default action (form submission)
      event.preventDefault();
      // Call the sendMessage function
      sendMessage();
    }
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/api/message/${chatroomId}`, {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((res) => {
        messages.length !== res.data.length && setMessages(res.data);
      });
  }, [chatroomId, messages]);
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on('newMessage', (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
        showNotification(message);
      });

      // Cleanup function to remove event listener when component unmounts
      return () => {
        socket.off('newMessage');
      };
    }
  }, [messages, socket]);

  const showNotification = (message) => {
    if (userOwner && message && message !== lastNotifiedMessage) {
      if (message.name !== userOwner.name) {
        displayNotification('info', 'New message: ' + message.name, message.message);
        setLastNotifiedMessage(message);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit('leaveRoom', {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);
  const viewPic = async () => {
    const file = await axios.get(process.env.REACT_APP_API_URL + '/api/file/download/60da61e47585d73764d32133', {
      headers: { 'x-auth-token': localStorage.getItem('auth-token') },
    });
    try {
      setPics(pics.concat(file.data));
    } catch (err) {}
  };
  return (
    <>
      {statusOfPage === 'Loading' ? (
        <Spin tip="جاري..." />
      ) : statusOfPage === 'Allowed' ? (
        <div className="Text-chat">
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
                  <td>{theConsultation.isClosed || 'مفتوحة'}</td>
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
            <Link to="/dashboard">
              <button className="button-blue">أغلق الاستشارة</button>
            </Link>
            <Link to="/written-advice">
              <button className="button-blue">تعديل الاستشارة</button>
            </Link>
            <button className="Connexion" onClick={() => setReportVisible(true)}>
              مشكلة في الاستشارة ؟
            </button>
          </div>
          <div className="chat-box-section">
            <div className="chatroom-content">
              {messages
                .slice()
                .reverse()
                .map((message, i) => (
                  <div key={i} className="message">
                    <span className={userId === message.user ? 'ownMessage' : 'otherMessage'}>{message.name}:</span>{' '}
                    <p className="message-content">{message.message}</p>
                  </div>
                ))}
            </div>
            <div className="chatroom-actions">
              <div className="message-field">
                <input
                  type="text"
                  name="message"
                  placeholder="اكتب الرسالة هنا "
                  ref={messageRef}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="action-btn">
                <button className="join upload-hidden" onClick={sendMessage}>
                  <PaperClipOutlined />
                </button>
                <button className="join send" onClick={sendMessage}>
                  <SendOutlined />
                </button>
              </div>
            </div>
          </div>
          <ReportModal
            visible={reportVisible}
            handleCancel={() => {
              setReportVisible(false);
            }}
            handleOk={() => {
              setReportVisible(false);
            }}
          />
        </div>
      ) : (
        <Row justify="center" align="middle">
          <Col>
            <h1>غير مسموح</h1>
            <p>آسف، أنت لست صاحب هذه الاستشارة، شكرًا لك</p>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Textchat;
