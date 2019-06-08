(function () {

    const url = "https://api.github.com/users";
    
    /** Client ID Github */
    const idGitHub = "71e2f0fec9287dc50e88";
    /** Client Secret Github */
    const tokenGitHub = "3961b2da408d8bce877fe330efe83c81d0188604";

    const count = 5;
    const sort = "stargazers_count: desc";

    const userSearch = document.getElementById("user-search");
    const userInfo = document.getElementById("user-info");
    
    const containerUserInfo = document.getElementById("user-info-preview");
    
    async function getUser(user) {
        
        var urlteste = `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${idGitHub}&client_secret=${tokenGitHub}`;
        
        console.log(urlteste);

        const profileResponse = await fetch(`${url}/${user}?client_id=${idGitHub}&client_secret=${tokenGitHub}`);
        
        const reposResponse = await fetch(`${url}/${user}/repos?&sort=${sort}&client_id=${idGitHub}&client_secret=${tokenGitHub}`);
        
        const userInfo = await profileResponse.json();
        const repos = await reposResponse.json();

        return {userInfo, repos};

    }

    function showProfile(user){
        
        var urlProfileUser = user.html_url;

        if((urlProfileUser == "") || (urlProfileUser == null)){
            urlProfileUser = "";
        }

        var userLogin = user.login;
        if(userLogin == null || userLogin == undefined){
            userLogin = "Usuário inexistente";
        }

        /** https://image.flaticon.com/icons/png/512/149/149071.png */ 
        /** https://image.flaticon.com/icons/png/512/149/149071.png */

        var urlAvatarUser = user.avatar_url; 
        if((urlAvatarUser == "") || (urlAvatarUser == null)){
            urlAvatarUser = "https://image.flaticon.com/icons/png/512/149/149071.png";
        }
        
        var bioUser = user.bio; 
        if((bioUser == "") || (bioUser == null)){
            bioUser = "Biografia não informada";
        }

        var emailUser = user.email; 
        if((emailUser == "") || (emailUser == null)){
            emailUser = "E-mail não informado";
        }

        var followers = user.followers;
        if(followers == null || followers == undefined){
            followers = 0;
        }

        var following = user.following;
        if(following == null || following == undefined){
            following = 0;
        }

        containerUserInfo.innerHTML = `
            <div class="englobatudo">
                <a href="${urlProfileUser}" target="_blank" class="btn-show-profile">        
                    <img class="user-info-img" src="${urlAvatarUser}" alt="Avatar do Usuário" title="Avatar do Usuário">  
                    <br>
                    <span class="span-login-user"> <i class="fa fa-user"></i> ${userLogin} </span> &bull; <span class="span-i span-bio-user"> <i class="fa fa-pencil"></i> ${bioUser}</span>
                    <br>
                    <span class="span-email-user"> <i class="fa fa-envelope"></i> ${emailUser}</span>    
                </a>

                <div class="div-follow-info-user">

                    <span class="span-interarions span-followers"> 
                        <span class="num-followers"> 
                            <p class="followei"> ${followers} </p>  
                            <p class="sub-followei"> Seguidores </p>
                        </span> 
                    </span>

                    <span class="span-interarions span-following"> 
                        <span class="num-following"> 
                            <p class="followei"> ${following} </p>                              
                            <p class="sub-followei"> Seguindo </p>
                        </span>                         
                    </span>                    

                </div>                    
            </div>
            
        `;

    }

    function SortByStars(x,y) {    
        return x.stargazers_count - y.stargazers_count; 
    }

    function showRepositorys(repos) {

        if(!repos.message) {

            repos.sort(SortByStars);
            repos.reverse();
            
            let output = '';
            
            

            repos.forEach(repo => {
                output += `<div class="user-info-full-repos">
                
                    <div>
                        <p class="repo-user-name"> <i class="fa fa-folder"></i> ${repo.name} &bull; <span class="span-i span-language"> ${repo.language} </span> </p>
                        <p class="repo-user-description">${repo.description}</p>
                        <p class="repo-user-stargazerscount"> <i class="fa fa-star"></i> ${repo.stargazers_count}</p>
                        <br>
                        <p> <a href="${repo.html_url}" class="a-url-repo-user" target="_blank"> Visitar Repositório </a> </p>
                    </div>
                    
            </div>`;
            });
            
            document.getElementById("container-user-info-full-repos").innerHTML = output;

        } else{
            document.getElementById("container-user-info-full-repos").innerHTML = "";
        }
        
        

    }

    userSearch.addEventListener("keyup", (e) => {
        
        const user = e.target.value;

        if(user.length > 0){
            
            getUser(user).then(res =>{
                showProfile(res.userInfo);
                showRepositorys(res.repos);
            });
            
        }

    })
    
})();