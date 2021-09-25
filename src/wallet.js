const sdk = require('api')('@wyre-hub/v3#6o13y011xktk7auip');
require('dotenv').config();


sdk.auth(process.env.SECRET_KEY);
sdk.CreateWallet({
  name: 'user:6d5dc801',
  // callbackUrl: 'https://callback.url',
  type: 'DEFAULT',
  notes: 'User Wallet'
})
  .then(res => console.log(res))
  .catch(err => console.error(err));