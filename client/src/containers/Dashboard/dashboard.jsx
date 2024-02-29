import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { EditOutlined, CreditCardOutlined, SolutionOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ar-tn';
const Dashboard = () => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/user/allConsultation', {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((res) => setList(res.data));
  }, []);
  const showVido = () => {
    setShow(!show);
  };
  return (
    <div className="main-dashboard">
      <div className="demo-video">
        <p>شاهد فيديو التجريبي للدفع</p>
        <button className={show ? 'show-demo-active' : 'show-demo'} onClick={showVido}>
          {show ? 'أغلق' : 'شاهد '}
        </button>
        {show ? (
          <iframe
            width="80%"
            height="315"
            src="https://www.youtube.com/embed/bBeJejDAtNM?si=rhtxUYqum8HdAXi4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        ) : (
          ''
        )}
      </div>

      <div className="dashboard-user">
        <div className="action-btn">
          <div className="consulting">
            <div className="icon">
              <SolutionOutlined />
            </div>
            <div className="title">إستشارة قانونية</div>
            <Link to="/written-advice" className="btn">
              استشر الان
            </Link>
          </div>
          <div className="consulting">
            <div className="icon">
              <CreditCardOutlined />
            </div>
            <div className="title">باقة الاستشارات</div>
            <Link to="/checkout" className="btn">
              تحصل على رصيد
            </Link>
          </div>
        </div>
        <div className="display-list">
          <div className="title">قائمة الاستشارات</div>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <Link
                  to={item.type === 'video' ? `/vid-page/${item._id}` : `/text-chat/${item._id}`}
                  className={!item.isClosed ? 'list' : 'list end'}
                >
                  <div className="list-content">
                    <div className="list-content_type">{item.type === 'video' ? 'إستشارة بالفيديو' : 'إستشارة كتابيّة'}</div>
                    <div className="list-content_title">{item.title}</div>
                    <div className="list-content_desc">{item.description}</div>
                  </div>
                  <div className="list-content date">
                    <div className="list-content_title">التاريخ</div>
                    <div className="list-content_desc">{moment(item.date).format('LLLL')}</div>
                  </div>
                  <div className="list-content state">
                    <div className="list-content_title">الحالة</div>
                    <div className="list-content_desc state">{item.isClosed ? 'منتهية' : 'مفتوحة'}</div>
                    <Link
                      to={`/update-consultation/${item._id}`}
                      key="edit"
                      className={!item.isClosed ? 'edit' : 'edit end-icon'}
                      style={
                        moment(item.date).date() > moment().date() ? { opacity: 1 } : { opacity: 0, pointerEvents: 'none' }
                      }
                    >
                      تعديل
                      <EditOutlined />
                    </Link>
                  </div>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
