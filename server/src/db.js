import mongodb from 'mongodb';

export default callback => {
  mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // connect to a database if needed, then pass it to `callback`:
    callback(database);
  });
}
