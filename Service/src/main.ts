import dbConfig, { CONNECTION_STRING, MONGO_CONFIG } from 'configuration/dbConfig';
import expressConfig, { PORT } from 'configuration/expressConfig';
import onAppInit from 'configuration/onAppInit';

// ! App init
dbConfig
  .connect(CONNECTION_STRING, MONGO_CONFIG)
  .then(() => expressConfig.listen(PORT, '0.0.0.0', onAppInit))
  .catch(console.error);
