const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  user: String,
  repoId: {type: Number, unique: true}, 
  repoName: String,
  forks: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (results) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // check if the id (repoid) already exists. if it does, do not insert
  const reposArr = JSON.parse(results.body);
  const shapedArr = reposArr.map((repo) => {
    return {user: repo.owner.login, repoId: repo.id, repoName: repo.name, forks: repo.forks}
  });
  // Repo.find({user: repo.owner.login, repoId: repo.id, repoName: repo.name, forks: repo.forks}, function (err, result) {
  //   if (err) {
  //     result = new Repo();
  //   }
  // })
  Repo.insertMany(shapedArr, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('Saved doc');
    }
  });
  
};

let selectTop = (cb) => {
  Repo.find({})
  .sort({forks: 'desc'})
  .limit(25)
  .exec(cb);
};



module.exports.save = save;
module.exports.selectTop = selectTop;

