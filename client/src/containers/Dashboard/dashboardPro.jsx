import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [list] = useState([
    {
      title: 'إستشارة مباشرة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
      type: 'video',
    },
    {
      title: 'إستشارة هاتفيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: false,
      type: 'phone',
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
      type: 'text',
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: false,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: false,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: false,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
    {
      title: 'إستشارة كتابيّة',
      desc: 'استشارة بخصوص حقوق ملكية فكرية',
      date: '20.10.2020',
      time: '13h:00',
      state: true,
    },
  ]);

  return (
    <div className="dashboard">
      {/* <div className="display-list">
        <div className="title">مواعيد الاستشارات الكتابية</div>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <Link
                to={
                  item.type === "video"
                    ? "/video-not-ready"
                    : item.type === "phone"
                    ? "/phone-not-ready"
                    : "text-chat"
                } className="list">
                  <div className="list-content">
                    <div className="list-content_title">{item.title}</div>
                    <div className="list-content_desc">{item.desc}</div>
                    <div className="list-content_date">{item.date} - {item.time}</div>
                  </div>
                </Link>
              </List.Item>
            )}
          />
      </div>
      <div className="display-list">
        <div className="title">مواعيد الاستشارات الصوتية</div>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <Link
                to={
                  item.type === "video"
                    ? "/video-not-ready"
                    : item.type === "phone"
                    ? "/phone-not-ready"
                    : "text-chat"
                } className="list">
                  <div className="list-content">
                    <div className="list-content_title">{item.title}</div>
                    <div className="list-content_desc">{item.desc}</div>
                  </div>
                  <div className="list-content date">
                    <div className="list-content_title">التاريخ</div>
                    <div className="list-content_desc">{item.date}</div>
                  </div>
                </Link>
              </List.Item>
            )}
          />
      </div>
    */}
    </div>
  );
};

export default Dashboard;
