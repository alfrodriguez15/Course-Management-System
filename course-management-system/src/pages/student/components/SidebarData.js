import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'side-text'
  },
  {
    title: 'About Us',
    path: '/aboutus',
    icon: <IoIcons.IoIosPaper />,
    cName: 'side-text'
  },
  {
    title: 'Schedule',
    path: '/schedule',
    icon: <IoIcons.IoIosCalendar />,
    cName: 'side-text'
  },
  {
    title: 'Courses',
    path: '/',
    icon: <IoIcons.IoIosApps />,
    cName: 'side-text'
  },
  {
    title: 'Professors',
    path: '/',
    icon: <IoIcons.IoMdPeople />,
    cName: 'side-text'
  },
  {
    title: 'Chatbot',
    path: '/',
    icon: <IoIcons.IoIosChatboxes />,
    cName: 'side-text'
  },
  {
    title: 'Services',
    path: '/services',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'side-text'
  },
  {
    title: 'Support',
    path: '/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'side-text'
  }
];