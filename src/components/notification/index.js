import { notification } from 'antd';
import React, { memo } from 'react';

const Notification = ({type, message}) => {
    const noti = (type)=>{
         return  notification[type]({
            message: message,
            style: {
                width: 250,
                height: 60,
                marginTop: 50,
                color: "#FFFFFF",
                background: "#4BB543",
              },
              duration: 1.5,
          })
    }
    return (noti(type))
    
}
export default memo(Notification);
