import React from 'react';

const StartButton = (props) => {

  return (
    <div className="video-chat">
      <div className="redirection">
        <div className="Link">
          <span>لكي تتحول الى منصة الفيديو الخاصة بنا انقر على الرابط التالي من فضلك</span>
          <button disabled={props.disabled} onClick={props.onClick}>
            استشارة عبر الفيديو
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartButton;
