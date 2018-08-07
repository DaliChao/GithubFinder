$(document).ready(function(){
  $('#searchUser').on('keyup',function(e){
    let username=e.target.value;
    $.ajax({
      url:"https://api.github.com/users/"+username,
      data:{
        client_id:'b5dd42f7d87c60683633',
        client_secret:'0144789be842ea549cf77e8c764718dd82939393'
      }
    }).done(function(user){

      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'b5dd42f7d87c60683633',
          client_secret:'0144789be842ea549cf77e8c764718dd82939393',
          sort:'created: asc',
          per_page:5
        }
      }).done(function(repos){
        $.each(repos,function(index,repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                 <div class="col-md-7">
                    <h5>Name: ${repo.name}</h5>
                    <p>Description: ${repo.description}</p>
                 </div>
                 <div class="col-md-3">
                   <span class="label label-primary">Forks: ${repo.forks}</span>
                   <span class="label label-success">Watchers: ${repo.watchers_count}</span>
                   <span class="label label-info">Stars: ${repo.stargazers_count}</span>
                 </div>
                 <div class="col-md-2">
                   <a class="btn btn-primary" target="_blank" href=${repo.html_url}>View Detail</a>
                 </div>
              </div>
            </div>
          `)
        })
      })


      $('#profile').html(
      `<div class="panel panel-default">
         <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
         </div>
         <div class="row">
            <div class="col-md-3">
              <img src=${user.avatar_url} class="thumbnail avatar"/>
              <a target="_blank" class="btn btn-primary btn-block" href=${user.html_url}>View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="label label-primary">public repos: ${user.public_repos}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="label label-info">followers: ${user.followers}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="label label-warning">following: ${user.following}</span>
              <br><br>

              <ul class="list-group">
                 <li class="list-group-item">Company: ${user.company}</li>
                 <li class="list-group-item">blog: ${user.blog}</li>
                 <li class="list-group-item">location: ${user.location}</li>
                 <li class="list-group-item">Member since: ${user.created_at}</li>
              </ul>
            </div>
        </div>
      </div>
      <h3 class="page-header">Latest Repos</h3>
      <div id="repos"></div>
      `
      )
    })



  })
})
