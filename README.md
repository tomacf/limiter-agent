# Usage

Basic implementation of authentification and limitation middlewares in nodejs using redis and docker

## Docker && Docker-Compose

`docker-compose up --build`

The .env file shouldnt be commit but is proposed to make the testing simple.
The middlewares behavior has been tested using the tool "siege" designed for stress test.


#### Available endpoints :


*/public/light*

*/public/heavy*


##### Endpoints added to provide token for testing usage.

*/public/tokenprovider*


##### Bearer Token expected for the folling endpoints:

*/private/birds*

*/private/dogs*

*/private/cows*

*/private/bigmouses*

*/private/elephants*
