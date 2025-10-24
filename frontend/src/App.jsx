import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Re-enable backend integration
import Sidebar from './Sidebar'; // Import the new Sidebar component
import MenuIcon from './MenuIcon'; // Icon for mobile sidebar toggle
import './App.css';

// SVG icon for the send button
const SendIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
      fill="currentColor"
    />
  </svg>
);

// SVG icon for the copy button
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG icon for the checkmark (feedback on copy)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for the edit button
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for the settings button
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84 c-0.24,0-0.44,0.17-0.48,0.41L9.2,5.29C8.61,5.53,8.08,5.85,7.58,6.23L5.2,5.27C4.98,5.19,4.73,5.26,4.61,5.48L2.69,8.8 c-0.11,0.2-0.06,0.47,0.12,0.61l2.03,1.58C4.78,11.36,4.76,11.68,4.76,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.48 c0.04,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.48-0.41l0.36-2.48c0.59-0.24,1.12-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0.01,0.59-0.22l1.92-3.32c0.11-0.2,0.06-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="currentColor"/>
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

// Icon for the prompt cards
const PromptIcon = ({ iconPath }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={iconPath} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Animated icon for the edit loading state
const EditLoadingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="edit-loading-icon">
    <path d="M12 2L12 6" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18L12 22" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.93 4.93L7.76 7.76" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.24 16.24L19.07 19.07" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L6 12" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 12L22 12" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.93 19.07L7.76 16.24" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.24 7.76L19.07 4.93" stroke="#4E8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon for attachments
const PaperclipIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Bot avatar icon
const BotAvatarIcon = () => (
  <div className="bot-avatar">
    <span role="img" aria-label="magic-wand-avatar">🪄</span>
  </div>
);

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); // Messages for the active chat
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Will be loaded from localStorage
  const [activeChatId, setActiveChatId] = useState(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null); // To show copy feedback
  const [isHistoryLoading, setIsHistoryLoading] = useState(true); // State for loading history
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar
  const chatWindowRef = useRef(null);
  const textareaRef = useRef(null); // Ref for the textarea
  const fileInputRef = useRef(null); // Ref for the hidden file input

  const samplePrompts = [
    {
      text: "Suggest a recipe for a quick dinner.",
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      color: "#8E72FF" // Purple
    },
    {
      text: "Explain the theory of relativity simply.",
      icon: "M12 2a10 10 0 100 20 10 10 0 000-20z",
      color: "#4CAF50" // Green
    },
    {
      text: "Write a short poem about rain.",
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
      color: "#FF6F61" // Coral
    },
    {
      text: "What's a fun fact about the ocean?",
      icon: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
      color: "#42A5F5" // Blue
    }
  ];

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Set document title and favicon
  useEffect(() => {
    document.title = 'Elena';
    const favicon = document.querySelector("link[rel~='icon']");
    if (favicon) {
      favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪄</text></svg>`;
    }
  }, []);

  // Load chat history from local storage on initial render
  useEffect(() => {
    // Simulate a small delay to show the spinner
    setTimeout(() => {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
      setIsHistoryLoading(false);
    }, 500);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save chat history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Handle theme changes
  useEffect(() => {
    const applyTheme = () => {
      if (theme === 'light' || (theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    const textarea = e.target;
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    // Manually trigger resize after setting the input
    const textarea = textareaRef.current;
    if (textarea) {
      setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }, 0);
    }
  };

  const handleNewChat = () => {
    // Reset for a new chat
    setMessages([]);
    setActiveChatId(null);
    setSelectedFile(null);
  };

  const handleSelectChat = (chatId) => {
    // Save the current chat before switching, if it has messages
    if (messages.length > 0 && activeChatId) {
      const chatToSave = {
        id: activeChatId,
        title: messages[0].text.substring(0, 25) + '...',
        messages: messages,
      };
      setChatHistory(prevHistory => {
        const existingChatIndex = prevHistory.findIndex(chat => chat.id === chatToSave.id);
        if (existingChatIndex > -1) {
          const updatedHistory = [...prevHistory];
          updatedHistory[existingChatIndex] = chatToSave;
          return updatedHistory;
        }
        return [chatToSave, ...prevHistory];
      });
    }

    // Load the selected chat
    const chat = chatHistory.find(c => c.id === chatId);
    setMessages(chat.messages);
    setActiveChatId(chat.id);
    setSelectedFile(null);
  }

  const handleDeleteChat = (chatIdToDelete) => {
    setChatHistory(prevHistory => prevHistory.filter(chat => chat.id !== chatIdToDelete));
    // If the deleted chat was the active one, reset to a new chat state
    if (activeChatId === chatIdToDelete) {
      setMessages([]);
      setActiveChatId(null);
      setSelectedFile(null);
    }
  };

  const handleClearAllChats = () => {
    if (window.confirm('Are you sure you want to delete all chat history? This action cannot be undone.')) {
      setChatHistory([]);
      setMessages([]);
      setActiveChatId(null);
      setSelectedFile(null);
    }
  };

  const handleMagicWandClick = () => {
    const sampleTopics = [
      "hello !"
    ];
    const randomTopic = sampleTopics[Math.floor(Math.random() * sampleTopics.length)];
    setInput(randomTopic);

    // Manually trigger resize after setting the input
    const textarea = textareaRef.current;
    if (textarea) {
      setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }, 0);
    }
  };

  const handleAttachmentClick = () => {
    // Programmatically click the hidden file input
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // You can add logic here to handle the file,
      // like displaying its name or preparing it for upload.
    }
    // Reset the input value so the same file can be selected again
    e.target.value = null;
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleStartEdit = (message) => {
    setEditingMessageId(message.timestamp);
    setEditingText(message.text);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const handleSaveEdit = async () => {
    if (!editingText.trim()) return;

    setIsSavingEdit(true);

    const messageIndex = messages.findIndex(msg => msg.timestamp === editingMessageId);
    if (messageIndex === -1) return;

    // Remove the original message and the bot's response that followed it.
    const updatedMessages = messages.slice(0, messageIndex);

    // Create the new user message
    const editedUserMessage = {
      ...messages[messageIndex],
      text: editingText,
      timestamp: new Date(), // Give it a new timestamp to signify it's new
    };

    // Update the UI immediately with the edited message
    setMessages([...updatedMessages, editedUserMessage]);
    setIsTyping(true);

    // Reset editing state
    handleCancelEdit();

    // Resubmit to the bot to get a new response
    try {
      const response = await axios.post((import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000') + '/chat', {
        message: editedUserMessage.text,
      });
      const botMessage = { text: response.data.reply, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
      // Handle error if needed
    } finally {
      setIsTyping(false);
      setIsSavingEdit(false);
    }
  };

  const handleCopy = (text, messageId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(messageId);
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line
      handleSubmit(e);    // Submit the form
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    let currentChatId = activeChatId;
    const userMessage = { text: input, sender: 'user', timestamp: new Date() };

    // If this is the first message of a new chat, create a history item
    if (messages.length === 0) {
      currentChatId = Date.now();
      const newChatItem = {
        id: currentChatId,
        title: userMessage.text.substring(0, 25) + '...',
        messages: [userMessage], // Start with the first message
      };
      setChatHistory(prevHistory => [newChatItem, ...prevHistory]);
      setActiveChatId(currentChatId);
    }

    // Update the UI with the user's message immediately
    setMessages((prev) => [...prev, userMessage]);
    setSelectedFile(null); // Clear file after sending
    setInput('');
    // Reset textarea height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsTyping(true);

    // --- To re-enable backend connection, comment out the simulation block above ---
    // --- and uncomment the block below. ---
    try {
      const response = await axios.post((import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000') + '/chat', {
        message: userMessage.text,
      });

      const botMessage = { text: response.data.reply, sender: 'bot', timestamp: new Date() };
      // Add bot response to the current chat
      setMessages((prev) => [...prev, botMessage]);
      // Also update the history item with the bot's response
      setChatHistory(prevHistory => prevHistory.map(chat => {
        if (chat.id === currentChatId) {
          // Add both user and bot messages to the history
          return { ...chat, messages: [...chat.messages, userMessage, botMessage] };
        }
        // If it's an existing chat, just add the new messages
        if (chat.id === activeChatId) {
            return { ...chat, messages: [...chat.messages, botMessage] };
        }
        return chat;
      }));
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
      setMessages((prev) => [
         ...prev,
         { text: "Sorry, I'm having trouble connecting.", sender: 'bot', timestamp: new Date() },
       ]);
    } finally {
       setIsTyping(false);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`app-layout ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onThemeChange={handleThemeChange}
        onClearAllChats={handleClearAllChats}
        isHistoryLoading={isHistoryLoading}
      />
      {/* Backdrop for mobile to close sidebar */}
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}
      <div className="main-content">
        <div className="main-header">
          <button className="menu-toggle-open" onClick={toggleSidebar}><MenuIcon /></button>
          <h1 className="main-header-title">Elena</h1>
        </div>
        {/* This button appears only when the sidebar is collapsed to open settings */}
        <button className="settings-toggle-open" onClick={toggleSidebar} title="Settings">
          <SettingsIcon />
        </button>
        <button className="magic-wand-button" title="Elena" onClick={handleMagicWandClick} >
          <span className="magic-wand-emoji">🪄</span>
        </button>
        {/* This button appears only when the sidebar is collapsed to clear chats */}
        <button className="clear-all-toggle-open" onClick={handleClearAllChats} title="Clear all chats"><ClearAllIcon /></button>
        <div className={`chat-container ${messages.length === 0 ? 'initial-layout' : ''}`}>
          <div className="chat-window" ref={chatWindowRef}>
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <h1 className="welcome-title">Hello human, it’s Sri's 🤖</h1>
              <p className="welcome-subtitle">What’s up? <span className="animated-subtitle">— meet Elena 💫</span></p>
            </div>
          ) : (
            messages.map((msg, index) => {
              // Find the index of the last message sent by the user.
              const lastUserMessageIndex = messages.map(m => m.sender).lastIndexOf('user');
              const MAX_CHAR_LIMIT = 500;
              // The edit button should only appear on the last user message.
              const isLastUserMessage = msg.sender === 'user' && index === lastUserMessageIndex;

              if (editingMessageId === msg.timestamp) {
                if (isSavingEdit) {
                  return (
                    <div key="edit-loading" className="message-wrapper user editing-loading">
                      <EditLoadingIcon />
                      <span>Just a second...</span>
                    </div>
                  );
                }
                return (
                  <div key={msg.timestamp} className="message-wrapper user editing">
                    <div className="edit-container">
                      <textarea
                        className="edit-textarea"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        autoFocus
                      />
                      <div className="edit-footer">
                        <span className={`char-counter ${editingText.length > MAX_CHAR_LIMIT ? 'error' : ''}`}>
                          {editingText.length} / {MAX_CHAR_LIMIT}
                        </span>
                        <div className="edit-controls">
                          <button onClick={handleSaveEdit} disabled={isTyping || editingText.length > MAX_CHAR_LIMIT}>
                            {isTyping ? <div className="button-spinner"></div> : 'Save'}
                          </button>
                          <button onClick={handleCancelEdit} disabled={isTyping}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className={`message-wrapper ${msg.sender}`}>
                  {msg.sender === 'bot' && <BotAvatarIcon />}
                  {msg.sender === 'user' && (
                    <div className="message-actions">
                      {isLastUserMessage && <button className="action-button" onClick={() => handleStartEdit(msg)}><EditIcon /></button>}
                      <button className="action-button" onClick={() => handleCopy(msg.text, msg.timestamp)}>
                        {copiedMessageId === msg.timestamp ? <CheckIcon /> : <CopyIcon />}
                      </button>
                    </div>
                  )}
                  <div className={`message ${msg.sender}`}>
                    <span className="message-text">{msg.text}</span>
                    <span className="message-timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {msg.sender === 'bot' && (
                    <button className="action-button" onClick={() => handleCopy(msg.text, msg.timestamp)}>
                      {copiedMessageId === msg.timestamp ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  )}
                </div>
              );
            })
          )}
          {isTyping && messages.length > 0 && <div className="message bot typing-indicator"><span></span><span></span><span></span></div>}
        </div>
        <div className="chat-input-footer">
          {selectedFile && (
            <div className="file-preview">
              <span className="file-name">{selectedFile.name}</span>
              <button className="remove-file-button" onClick={handleRemoveFile}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
          <form className="chat-input" onSubmit={handleSubmit}>
            <button type="button" className="icon-button attachment-button" title="Attach file" onClick={handleAttachmentClick}>
              <PaperclipIcon />
            </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows="1"
          />
            <button type="submit" className="icon-button send-button" disabled={!input.trim()}><SendIcon /></button>
          </form>
        </div>
        {messages.length === 0 && (
          <div className="example-prompts">
            {samplePrompts.map((prompt, index) => (
              <button key={index} className="prompt-button" onClick={() => handlePromptClick(prompt.text)} >
                <span className="prompt-text">{prompt.text}</span>
                <span className="prompt-icon" style={{ color: prompt.color }}><PromptIcon iconPath={prompt.icon} /></span>
              </button>
            ))}
          </div>
        )}
        </div>
      </div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept="image/*,application/pdf"
      />
      <footer className="app-footer">
        © Created by Sriram
      </footer>
    </div>
  );
}

export default App;