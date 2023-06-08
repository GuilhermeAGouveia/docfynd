if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi



# Create the index with the mapping
echo "Creating the index with the mapping"
curl -H "Content-Type: application/x-ndjson" -XPUT $ELASTIC_HOST$ELASTIC_INDEX/ --data-binary "@wikipedia.mapping" --user "$ELASTIC_USER:$ELASTIC_PASSWORD" --insecure > ./log/index.log | tail -n 1 
if [ $? -ne 0 ]; then
  echo "Index already exists"
else 
  echo "Index created"
fi

# Datastore to Elastic
echo "Datastore to Elastic"
curl -H "Content-Type: application/x-ndjson" -XPOST $ELASTIC_HOST$ELASTIC_INDEX/_bulk --data-binary "@wiki.json" --user "$ELASTIC_USER:$ELASTIC_PASSWORD" --insecure > ./log/datastore_to_elastic.log
if [ $? -ne 0 ]; then
  echo "Error in Datastore to Elastic"
else 
  echo "Datastore to Elastic done"
fi