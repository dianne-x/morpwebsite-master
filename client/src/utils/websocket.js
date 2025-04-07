let ws = null;

export const connectWebSocket = (userId) => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/?userId=${userId}`);
    console.log('WebSocket state after creation:', ws.readyState); // Should log 0 (CONNECTING)

    ws.onopen = () => {
      console.log('WebSocket connection established');
      console.log('WebSocket state after connection:', ws.readyState); // Should log 1 (OPEN)
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Check if message.content exists before processing
      if (message.content) {
        console.log('Message content:', message.content);
      }

      console.log('Message received from server:', message);

      // Handle "kicked" action
      if (message.action === 'kicked') {
        alert(message.message);
        localStorage.removeItem('morp-login-user'); // Clear user data
        window.location.reload(true); // Force a cache-clearing refresh
      }
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed', {
        wasClean: event.wasClean,
        code: event.code,
        reason: event.reason || 'No reason provided',
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
};

export const getWebSocket = () => ws;