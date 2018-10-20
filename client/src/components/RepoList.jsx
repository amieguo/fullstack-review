import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div className="repo-container">{props.repos.map(repo => <RepoItem repo={repo}/>)}
    </div>
  </div>
)


const RepoItem = (props) => (
  <ul>
    <li>Repo Name: {props.repo.repoName}</li> 
  </ul>
)







export default RepoList;