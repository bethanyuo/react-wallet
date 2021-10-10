//const sdk = require( 'api' )( '@wyre-hub/v3#6o13y011xktk7auip' );
const axios = require('axios');
require( 'dotenv' ).config();
const testUrl = "https://api.testwyre.com"

// export const createWallet = (...values) => {
//     const sdk = require( 'api' )( '@wyre-hub/v3#6o13y011xktk7auip' );

//     sdk.auth( process.env.SECRET_KEY );
//     sdk.CreateWallet( {
//         name: `user:${values[0]}`,
//         // callbackUrl: 'https://callback.url',
//         type: 'DEFAULT',
//         notes: 'User Wallet'
//     } )
//         .then( res => {
//             console.log('DONE')
//         } )
//         .catch( err => console.error( err ) );
// }

const instance = axios.create({
    baseURL:testUrl,
    headers: {
      "Content-Type": "application/json"
    }
  });

  async function submitWyreAuthToken(secretKey) {
    const { data } = await axios.post(
      testUrl + "/v2/sessions/auth/key",
      { secretKey: secretKey },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  }

  function setAxiosHeaders() {
    instance.defaults.headers.common.Authorization =
      "Bearer " + process.env.SECRET_KEY;
  }
  
  export async function createWyreWallet(...values) {
    console.log("Creating an empty Wyre Wallet");
    // let secretKey = await generateWyreSecretKey();
  
    await submitWyreAuthToken(process.env.SECRET_KEY);
    let config = {
      name: `user:${values[0]}`,
     // callbackUrl: 'https://callback.url',
      type: 'DEFAULT',
      notes: 'User Wallet'
    };
    setAxiosHeaders();
    const { data } = await instance.post("/v2/wallets", config);
    return data;
  }