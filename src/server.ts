import 'dotenv/config';
import App from './app'

const API_PORT = process.env.PORT || 8080;

App.http.listen(API_PORT, () => { 
  console.log(`App is running on port: ${API_PORT}!`) 
});