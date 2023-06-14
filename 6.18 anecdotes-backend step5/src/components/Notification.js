import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../reducers/notificationReducer';
import { useEffect } from 'react';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const alert = useSelector((state) => state.notification.showAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert, dispatch]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green',
    marginBottom: '10px',
  };

  const noDisplay = {
    display: 'none',
  };

  return <div style={alert ? style : noDisplay}>{message}</div>;
};

export default Notification;
