const WebSocket = require('ws');
const chokidar = require('chokidar');

const wss = new WebSocket.Server({
  port: 55555
});
const watcher = chokidar.watch(['./example'], {
  persistent: true
});

watcher.on('change', () => {
  clients.forEach(ws => ws.send('change'));
});

let clients = [];

wss.on('connection', ws => {
  clients = [...clients, ws];
  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});
