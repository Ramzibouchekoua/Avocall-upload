import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { EditOutlined, CreditCardOutlined, SolutionOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ar-tn';
const Dashboard = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/user/allConsultation', {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((res) => setList(res.data));
  }, []);

  return (
    <div className="dashboard">
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
            <List.Item
              actions={[
                <Link
                  to={`/update-consultation/${item._id}`}
                  key="edit"
                  className={!item.isClosed ? 'edit' : 'edit end-icon'}
                  style={moment(item.date).date() > moment().date() ? { opacity: 1 } : { opacity: 0, pointerEvents: 'none' }}
                >
                  <EditOutlined />
                </Link>,
              ]}
            >
              <Link
                to={
                  item.type === 'video'
                    ? `/vid-page/${item._id}`
                    : item.type === 'phone'
                    ? '/phone-not-ready'
                    : `/text-chat/${item._id}`
                }
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
                </div>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard;
