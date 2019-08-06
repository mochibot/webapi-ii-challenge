const express = require('express');
const postRouter = require('./routes/postRoute');
const server = express();
server.use(express.json());
server.use('/api/posts', postRouter);

const port = 8000;
server.listen(port, () => console.log(`listening on port ${port}`));