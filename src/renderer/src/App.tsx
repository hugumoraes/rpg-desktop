import React from 'react';

export const App: React.FC = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={ipcHandle}>Ping</button>
    </div>
  );
};
