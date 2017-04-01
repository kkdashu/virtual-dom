const ws = new WebSocket('ws://localhost:55555');

ws.addEventListener('open', event => {
  console.log('connectioned');
});

ws.addEventListener('message', event => {
  window.location.reload();
});
