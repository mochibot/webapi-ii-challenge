const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/postRoute');
const server = express();
server.use(express.json());
server.use(cors())
server.use('/api/posts', postRouter);

const port = 8000;
server.listen(port, () => console.log(`listening on port ${port}`));