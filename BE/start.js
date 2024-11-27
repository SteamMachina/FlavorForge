import { app } from './src/server.js';
import cors from 'cors';
const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})