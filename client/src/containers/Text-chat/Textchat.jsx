import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReportModal from '../../components/ReportModal';
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import moment from 'moment';
import 'moment/locale/ar-tn';
const Textchat = ({ socket }) => {
  const [reportVisible, setReportVisible] = useState(false);
  const { id } = useParams();
  const chatroomId = id;
  const [messages, setMessages] = useState([]);
  const [pics, setPics] = useState([]);
  const [theConsultation, setTheConsultation] = useState({});
  const messageRef = useRef();
  const [userId, setUserId] = useState('');
  useEffect(() => {
    axios
      .get(`/api/user/consultation/${chatroomId}`, {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((res) => setTheConsultation(res.data[0]));
  }, []);
  const sendMessage = () => {
    if (socket) {
      socket.emit('chatroomMessage', {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = '';
    }
  };
  useEffect(() => {
    axios
      .get(`/api/message/${chatroomId}`, {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((res) => {
        // console.log('object', messages.length===res.data.length);
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
      });
    }
  }, [messages]);

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
    } catch (err) {
      console.log('error');
    }
   
  };
  return (
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
          {/* <tbody>
            <tr>
              <div className="consultant">
                <img src={User} alt="Consultant" />
                <div>
                  <th> المستشار القانوني</th>
                  <tr> ابراهيم رمضان</tr>
                </div>
              </div>
            </tr>
          </tbody> */}
        </table>
        <Link to="/dashboard">
          <button className="button-blue">أغلق الاستشارة</button>
        </Link>
        <Link to="/written-advice">
          <button className="button-blue">تعديل الاستشارة</button>
        </Link>
        <button className="Connexion " onClick={() => setReportVisible(true)}>
          مشكلة في الاستشارة ؟
        </button>
      </div>
      <div className="chat-box-section">
        <div className="chatroom-content">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span className={userId === message.user ? 'ownMessage' : 'otherMessage'}>{message.name}:</span>{' '}
              <p className="message-content"> {message.message}</p>
            </div>
          ))}
        </div>
        <div className="chatroom-actions">
          <div className="message-field">
            <input type="text" name="message" placeholder="Say something" ref={messageRef} />
          </div>
          <div className="action-btn">
            <button className="join upload" onClick={sendMessage}>
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
  );
};

export default Textchat;
