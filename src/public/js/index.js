const socket = io()
socket.emit('message', 'hola me estoy comunicamdo desde el websocket')