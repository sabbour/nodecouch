# Movie API with CouchDB backend

## Prerequisites 
You can run this application through Docker, but you need to have some prerequisites in place.

- Create an [Azure Application Insights](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-nodejs) resource and retrieve the instrumentation key.
- Have CouchDB accessible in your environment.

## Configuration
You need to pass the following environment variables:

- `COUCHDB_URL`. Example: `http://127.0.0.1:5984`
- `COUCHDB_NAME`. Example: `movies`
- `APPINSIGHTS_INSTRUMENTATIONKEY`
