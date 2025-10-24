import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import MenuIcon from './MenuIcon'; // Import the MenuIcon

// Icon for the toggle button
const CollapseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for the delete button
const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for the settings button
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84 c-0.24,0-0.44,0.17-0.48,0.41L9.2,5.29C8.61,5.53,8.08,5.85,7.58,6.23L5.2,5.27C4.98,5.19,4.73,5.26,4.61,5.48L2.69,8.8 c-0.11,0.2-0.06,0.47,0.12,0.61l2.03,1.58C4.78,11.36,4.76,11.68,4.76,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.48 c0.04,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.48-0.41l0.36-2.48c0.59-0.24,1.12-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0.01,0.59-0.22l1.92-3.32c0.11-0.2,0.06-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="currentColor"/>
  </svg>
);

// Icon for reporting an issue
const ReportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="4" y1="22" x2="4" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for clearing all chats
const ClearAllIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for the new chat "tab" button
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for the "New Chat" button, styled like a pencil/edit icon
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Sidebar = ({ isSidebarOpen, toggleSidebar, chatHistory, onNewChat, onSelectChat, onDeleteChat, isHistoryLoading, onThemeChange, onClearAllChats }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const settingsRef = useRef(null);

  // Effect to handle clicks outside of the settings menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
        setIsThemeMenuOpen(false);
      }
    }

    // Bind the event listener only when the menu is open
    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  return (
    <aside className={`sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-top-header">
        <button className="sidebar-menu-button" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <h2>Elena</h2>
      </div>
      <div className="sidebar-header">
        <button className="new-chat-button" onClick={onNewChat}>
          <EditIcon />
          New Chat
        </button>
        <button className="new-chat-tab-button" onClick={onNewChat}>
          <PlusIcon />
        </button>
        <button className="clear-all-button" onClick={onClearAllChats} title="Clear all chats">
          <ClearAllIcon />
        </button>
      </div>
      <div className="sidebar-content">
        {isSidebarOpen && (
          isHistoryLoading ? (
            <div className="loading-container">
              <div className="pulsing-dot"></div>
            </div>
          ) : (
            <ul className="chat-history-list">
              {chatHistory.map((chat) => (
                <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
                  <span className="chat-title">{chat.title}</span>
                  <button className="delete-chat-button" onClick={(e) => {
                    e.stopPropagation(); // Prevent li's onClick from firing
                    if (window.confirm('Are you sure you want to delete this chat?')) {
                      onDeleteChat(chat.id);
                    }
                  }}>
                    <DeleteIcon />
                  </button>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
      {isSidebarOpen && (
        <div className="sidebar-footer" ref={settingsRef}>
          <button className="settings-button" onClick={() => {
            setIsSettingsOpen(!isSettingsOpen);
            // Close submenus when settings is closed
            if (isSettingsOpen) {
              setIsThemeMenuOpen(false);
            }
          }}>
            <SettingsIcon />
            Settings
          </button>
          {isSettingsOpen && (
            <div className="settings-menu">
              <div className="settings-item theme-menu-container" onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}>
                <span>Theme</span>
                {isThemeMenuOpen && (
                  <div className="theme-submenu">
                    <button onClick={(e) => { e.stopPropagation(); onThemeChange('system'); }}>System</button>
                    <button onClick={(e) => { e.stopPropagation(); onThemeChange('dark'); }}>Dark</button>
                    <button onClick={(e) => { e.stopPropagation(); onThemeChange('light'); }}>Light</button>
                  </div>
                )}
              </div>
              <a
                href="mailto:sriramramesh8904@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="settings-item"
              >
                <ReportIcon />
                <span>Report an issue</span>
              </a>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;