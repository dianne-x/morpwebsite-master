import React, { useState, useEffect } from 'react';
import '../../style/App/HomePage.scss';
import logo from '../../img/morp_light.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [name, setName] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const [showBugReport, setShowBugReport] = useState(false); // State to manage bug report visibility

    const friends = [
      { id: 1, name: 'Alice', online: true },
      { id: 2, name: 'Bob', online: false },
      { id: 3, name: 'Charlie', online: true },
      // Add more friends as needed
    ];
  
    const handleFriendClick = (friend) => {
      setSelectedFriend(friend);
    };
  
    const handleCloseChat = () => {
      setSelectedFriend(null);
    };

    useEffect(() => {
        const cooldownTimestamp = localStorage.getItem('cooldownTimestamp');
        if (cooldownTimestamp) {
            const remainingTime = Math.max(0, 600 - Math.floor((Date.now() - cooldownTimestamp) / 1000));
            if (remainingTime > 0) {
                setIsCooldown(true);
                setCooldownTime(remainingTime);
                setFeedbackMessage(`Please wait ${remainingTime} seconds before sending another report.`);
            }
        }
    }, []);

    useEffect(() => {
        let timer;
        if (isCooldown) {
            timer = setInterval(() => {
                setCooldownTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsCooldown(false);
                        localStorage.removeItem('cooldownTimestamp');
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCooldown]);

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setFeedbackMessage('Sending report...');

        const uid = localStorage.getItem('morp-login-user');
        const body = `
            <p>UID: ${uid}</p>
            <p>Name: ${name}</p>
            <p>Problem: ${problemDescription}</p>`;

        try {
            const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/mailReceive.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    subject: 'MORP App Report',
                    body: body,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setFeedbackMessage('Report sent successfully!');
                setName('');
                setProblemDescription('');
            } else {
                setFeedbackMessage('Failed to send report. Please try again.');
            }
        } catch (error) {
            setFeedbackMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="homepage">
            {/* Centered content */}
            <div className="centered-content">
                <div className="logo">
                    <img src={logo} alt="MORP Logo" />
                </div>
                <p className="welcome-text">Welcome back, adventurer!</p>
                <p className='welcome-desc'>Start roleplaying in a connected server, or start chatting with your friends. Forge epic tales, explore fantastical worlds, and connect with fellow adventurers. <br/><br/>Your story begins now.</p>
            </div>

            {/* Chat window for selected friend */}
            {selectedFriend && (
                <div className="text-window">
                    <div className="text-window-header">
                        <span>{selectedFriend.name}</span>
                        <button onClick={handleCloseChat}>Close</button>
                    </div>
                    <div className="text-window-content">
                        <p>Chat with {selectedFriend.name}</p>
                    </div>
                </div>
            )}

            {/* Button to show bug report section */}
            <button className='bug-report-btn' onClick={() => setShowBugReport(!showBugReport)}>
                <FontAwesomeIcon icon={faBug} />
            </button>

            {/* Bug Report Section */}
            {showBugReport && (
                <div className="bug-report">
                    <h2>Report a Bug</h2>
                    <p>If you encounter any issues, please let us know!</p>
                    {/*<p>Contact us at: <a href="mailto:kornel@bobak.ws">kornel@bobak.ws</a></p>*/}
                    
                    <form onSubmit={handleReportSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Describe the problem..."
                            value={problemDescription}
                            onChange={(e) => setProblemDescription(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={isCooldown}>Send Report</button>
                    </form>

                    {feedbackMessage && (
                        <p className={`feedback-message ${isCooldown ? 'cooldown-message' : ''}`}>
                            {feedbackMessage}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;