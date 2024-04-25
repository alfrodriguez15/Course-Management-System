import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/student',
    icon: <AiIcons.AiFillHome />,
    cName: 'side-text'
  },

  {
    title: 'Schedules',
    path: '/schedule',
    icon: <IoIcons.IoIosCalendar />,
    cName: 'side-text'
  },
  {
    title: 'Search Courses',
    path: '/courses',
    icon: <IoIcons.IoIosApps />,
    cName: 'side-text'
  },

  {
    title: 'Chatbot',
    path: '/',
    icon: <IoIcons.IoIosChatboxes />,
    cName: 'side-text'
  },

  {
    title: 'Feedback',
    path: '/feedback',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'side-text'
  }
];