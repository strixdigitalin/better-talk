import {useEffect, useRef, useState} from 'react';
import socketIOClient from 'socket.io-client';
import {useSelector} from 'react-redux';
import {socketbase} from '../screens/booksession/AppointmentWaitingScreen';
const NEW_MESSAGE_EVENT = 'private message';

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [Link, setLink] = useState('');
  const [whoTyping, setWhoTyping] = useState('');
  const appointmentId = useSelector(state => state.chat.appointmentId);
  const docSelected = useSelector(state => state.chat.docSelected);
  const userId = useSelector(state => state.user.userId);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(socketbase, {
      query: {userId: userId, appointmentId: appointmentId},
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    socketRef.current.on(NEW_MESSAGE_EVENT, ({message, from, to, fromDoc}) => {
      const incomingMessage = {
        message: message,
        from: from,
        to: to,
        fromDoc: fromDoc,
      };
      setMessages(messages => [...messages, incomingMessage]);
    });
    socketRef.current.on('join', ({message, from, to, fromDoc}) => {
      const incomingMessage = {
        message: message,
        from: from,
        to: to,
        fromDoc: fromDoc,
      };
      console.log('join', incomingMessage, '<<<this i sjoin');
      setLink(message);
      // setMessages(messages => [...messages, incomingMessage]);
    });

    socketRef.current.on('typing', ({isTyping, whoIsTyping}) => {
      setTyping(isTyping);
      setWhoTyping(whoIsTyping);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = messageBody => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      message: messageBody,
      from: userId,
      to: docSelected,
      fromDoc: false,
    });
  };

  const sendTyping = temp => {
    socketRef.current.emit('typing', {
      isTyping: temp,
      whoIsTyping: userId,
    });
  };
  return {messages, typing, whoTyping, Link, sendMessage, sendTyping};
};

export default useChatRoom;
