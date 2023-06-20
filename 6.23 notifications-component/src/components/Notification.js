import { useEffect } from 'react';
import { useContext } from 'react';
import AnecdoteContext from '../AnecdoteContext';

const Notification = () => {
  //

  const [notification, dispatch] = useContext(AnecdoteContext);

  const alert = notification.message;

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'HIDENOTIFICATION',
        });
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, alert]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: 'green',
  };

  const noDisplay = {
    display: 'none',
  };

  return <div style={alert ? style : noDisplay}>{alert}</div>;
};

export default Notification;
