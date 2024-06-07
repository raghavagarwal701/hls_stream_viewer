import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const StreamKeyInput = () => {
  const [streamKey, setStreamKey] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (streamKey.trim()) {
      history.push(`/stream/${streamKey}`);
    }
  };

  return (
    <div>
      <h1>Enter Stream Key</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={streamKey}
          onChange={(e) => setStreamKey(e.target.value)}
          placeholder="Enter your stream key"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StreamKeyInput;
