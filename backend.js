const express = require('express');
const apiApp = express();

apiApp.get('/api/priorities', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.json({
    priorities: [
      { value: 'Urgent', label: 'Urgent' },
      { value: 'Trivial', label: 'Trivial' },
      { value: 'Regular', label: 'Regular' },
    ],
  });
});
apiApp.listen(8080, () => {
  console.log('Express web server started: http://localhost:8080');
});
