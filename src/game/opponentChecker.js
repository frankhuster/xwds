export default function opponentChecker(
  player,
  setOpponentCheckStatus,
  setOpponent
) {
  console.log('fetching...');
  setOpponentCheckStatus('checking');
  fetch('http://localhost:8080/opponent', {
    method: 'GET',
    body: JSON.stringify({ id: player.id }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(async (response) => {
      console.log(`response.status: ${response.status}`);
      if (response.ok) {
        console.log('ok');
        return response.json();
      } else if (response.status === 404) {
        console.log('404');
        setOpponentCheckStatus('none');
      } else {
        console.log('error');
        const text = await response.text();
        throw new Error(text);
      }
    })
    .then((data) => {
      console.log('success');
      console.log(data);
      setOpponent(data.name, data.id);
      setOpponentCheckStatus('success');
    })
    .catch((err) => {
      console.log(err);
      setOpponentCheckStatus('error');
    });
}
