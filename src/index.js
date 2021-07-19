const express = require('express');
const app = express();
const morgan = require('morgan');

 
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());


app.use(require('./routes/index'));


app.listen(app.get('port'), () => {
  console.log('servidor en puerto', app.get('port'));
});

