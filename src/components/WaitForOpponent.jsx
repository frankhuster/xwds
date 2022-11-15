import { useState } from 'react';
import opponentChecker from '../game/opponentChecker';
import './WaitForOpponent.css';

export default function WaitForOpponent({ player, setOpponent }) {
  const [status, setStatus] = useState('waiting');

  const interval = setInterval(() => {
    console.log('interval...');
    if (status === 'success') clearInterval(interval);
    opponentChecker(player, setStatus, setOpponent);
  }, 1000);

  var subStatus = null;
  if (status === 'checking')
    subStatus = <span className="checking">checking...</span>;
  if (status === 'none') subStatus = <span className="none">none yet</span>;
  if (status === 'success') subStatus = <span className="success">ok</span>;
  if (status === 'error') subStatus = <span className="error">error</span>;

  return (
    <div className="wait-for-opponent">
      <span className="waiting">Waiting for an opponent</span>
      <span> </span>
      {subStatus}
    </div>
  );
}
