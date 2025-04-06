import React, { useState } from 'react';
import {
  FiMenu,
  FiSearch,
  FiStar,
  FiTrash2,
  FiInbox,
  FiArchive,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { IconContext } from 'react-icons';
import Lottie from 'lottie-react';
import emptyStateAnimation from '/public/animations/empty-state.json';

const sampleMessages = [
  {
    id: 1,
    from: 'John Doe',
    subject: 'Availability Inquiry',
    content: 'Hello, I would like to rent this apartment next month. Is it available?',
    date: 'Mar 25',
    category: 'inbox'
  },
  {
    id: 2,
    from: 'Jane Smith',
    subject: 'Question About Amenities',
    content: 'Does the house come with a private pool and Wi-Fi?',
    date: 'Mar 24',
    category: 'starred'
  },
  {
    id: 3,
    from: 'Mark Johnson',
    subject: 'Long-Term Rental Inquiry',
    content: 'I’m interested in renting this cabin for the entire winter season. Please let me know the monthly rate.',
    date: 'Mar 23',
    category: 'archive'
  },
  {
    id: 4,
    from: 'Alice Cooper',
    subject: 'Inquiry about Maintenance',
    content: 'I need to know about maintenance policies for the rental.',
    date: 'Mar 22',
    category: 'trash'
  },
  {
    id: 5,
    from: 'Tom Hanks',
    subject: 'Looking for a Beach House',
    content: 'Hi, do you have any beach houses available in July?',
    date: 'Mar 26',
    category: 'inbox'
  },
  {
    id: 6,
    from: 'Chris Evans',
    subject: 'Weekend Getaway',
    content: 'Interested in a short stay for a weekend retreat. Please advise availability.',
    date: 'Mar 25',
    category: 'inbox'
  },
  {
    id: 7,
    from: 'Natalie Portman',
    subject: 'Pet Policy?',
    content: 'Are pets allowed in any of your rental apartments?',
    date: 'Mar 24',
    category: 'starred'
  }
];

const InboxPage = () => {
  const [messages] = useState(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Filter messages by active category and search term
  const filteredMessages = messages.filter(msg => {
    const term = searchTerm.toLowerCase();
    return (
      msg.category === activeCategory &&
      (
        msg.from.toLowerCase().includes(term) ||
        msg.subject.toLowerCase().includes(term) ||
        msg.content.toLowerCase().includes(term)
      )
    );
  });

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Theme-dependent styles
  const themeStyles = {
    background: darkMode ? '#181818' : '#fafafa',
    text: darkMode ? '#f1f1f1' : '#333',
    topBar: darkMode ? '#242424' : '#fff',
    sidebar: darkMode ? '#242424' : '#fff',
    content: darkMode ? '#181818' : '#fff',
    border: darkMode ? '#333' : '#ddd'
  };

  // Decide which logo to use based on darkMode
  const logoSrc = darkMode ? '/images/logo2.png' : '/images/logo.png';

  const MessageDetail = ({ message, onBack }) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}>
      <div
        style={{
          height: '80px',
          backgroundColor: themeStyles.topBar,
          borderBottom: `1px solid ${themeStyles.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          transition: 'all 0.3s'
        }}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '15px',
            color: themeStyles.text
          }}
          onClick={onBack}
        >
          ← Back
        </button>
        <h2 style={{ margin: 0, color: themeStyles.text }}>Message Details</h2>
      </div>

      <div style={{ padding: '20px', color: themeStyles.text }}>
        <p><strong>From:</strong> {message.from}</p>
        <p><strong>Subject:</strong> {message.subject}</p>
        <p><strong>Date:</strong> {message.date}</p>
        <hr style={{ margin: '20px 0', borderColor: themeStyles.border }} />
        <p style={{ lineHeight: '1.6' }}>{message.content}</p>
      </div>
    </div>
  );

  const MessagesList = () => {
    if (filteredMessages.length === 0) {
      return (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: themeStyles.background,
            color: themeStyles.text,
            transition: 'all 0.3s'
          }}
        >
          <Lottie
            animationData={emptyStateAnimation}
            loop={true}
            style={{ width: 300, height: 300 }}
          />
          <h2>No messages found in {activeCategory}</h2>
        </div>
      );
    }

    return (
      <>
        <div
          style={{
            backgroundColor: themeStyles.content,
            borderBottom: `1px solid ${themeStyles.border}`,
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            transition: 'background 0.3s'
          }}
        >
          <input type="checkbox" style={{ cursor: 'pointer' }} />
          <FiStar style={{ cursor: 'pointer', color: themeStyles.text }} />
          <FiTrash2 style={{ cursor: 'pointer', color: themeStyles.text }} />
        </div>

        <div style={{ overflowY: 'auto', transition: 'all 0.3s' }}>
          {filteredMessages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 20px',
                borderBottom: `1px solid ${themeStyles.border}`,
                backgroundColor: themeStyles.content,
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = darkMode ? '#333' : '#f6f6f6')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = themeStyles.content)}
              onClick={() => setSelectedMessage(msg)}
            >
              <input
                type="checkbox"
                style={{ marginRight: '15px', cursor: 'pointer' }}
                onClick={(e) => e.stopPropagation()}
              />
              <FiStar style={{ marginRight: '15px', color: themeStyles.text, cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span
                  style={{
                    width: '150px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: themeStyles.text
                  }}
                >
                  {msg.from}
                </span>

                <span
                  style={{
                    flex: 1,
                    marginLeft: '10px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: themeStyles.text
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
                    {msg.subject}
                  </span>
                  - {msg.content}
                </span>

                <span style={{ marginLeft: '10px', whiteSpace: 'nowrap', color: themeStyles.text }}>
                  {msg.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <IconContext.Provider value={{ size: '1.3em' }}>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: themeStyles.background,
          transition: 'background 0.3s'
        }}
      >
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div
            style={{
              width: '220px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: themeStyles.sidebar,
              transition: 'all 0.3s',
              borderRight: `1px solid ${themeStyles.border}`
            }}
          >
            {/* Logo */}
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-start' }}>
              <img
                src={logoSrc}
                alt="Logo"
                style={{
                  maxWidth: '50%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Sidebar Navigation Items */}
            <div style={{ flex: 1, padding: '16px' }}>
              {[
                { label: 'Inbox', icon: <FiInbox />, key: 'inbox' },
                { label: 'Starred', icon: <FiStar />, key: 'starred' },
                { label: 'Archive', icon: <FiArchive />, key: 'archive' },
                { label: 'Trash', icon: <FiTrash2 />, key: 'trash' }
              ].map(item => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 0',
                    cursor: 'pointer',
                    color: activeCategory === item.key ? '#1a73e8' : themeStyles.text,
                    fontWeight: activeCategory === item.key ? 'bold' : 'normal',
                    fontSize: '1.1rem',
                    transition: 'color 0.3s'
                  }}
                  onClick={() => {
                    setActiveCategory(item.key);
                    setSelectedMessage(null);
                  }}
                >
                  <span style={{ marginRight: '10px' }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}>
          {/* TOP BAR */}
          <div
            style={{
              height: '80px',
              backgroundColor: themeStyles.topBar,
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              borderBottom: `1px solid ${themeStyles.border}`,
              transition: 'all 0.3s'
            }}
          >
            {/* Burger Menu */}
            <button
              onClick={toggleSidebar}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginRight: '20px',
                color: themeStyles.text
              }}
            >
              <FiMenu />
            </button>

            {/* Search Bar */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: darkMode ? '#333' : '#f1f3f4',
                borderRadius: '8px',
                padding: '5px 10px',
                transition: 'background-color 0.3s'
              }}
            >
              <FiSearch color={themeStyles.text} />
              <input
                type="text"
                style={{
                  border: 'none',
                  background: 'none',
                  marginLeft: '10px',
                  flex: 1,
                  outline: 'none',
                  color: themeStyles.text
                }}
                placeholder="Search mail"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '20px',
                color: themeStyles.text,
                transition: 'color 0.3s'
              }}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          {/* CONTENT AREA: List or Detail */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}>
            {selectedMessage ? (
              <MessageDetail
                message={selectedMessage}
                onBack={() => setSelectedMessage(null)}
              />
            ) : (
              <MessagesList />
            )}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default InboxPage;
