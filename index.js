const searchUrl = 'https://api.github.com/users/'

function watchForm() {
    $("form").submit(function(event){
        event.preventDefault();
        $('#results-list').empty();
        $("#js-error-message").empty();
        let searchTerm = $("#js-user-input").val();
        getRepos(searchTerm);
    });
}

function getRepos(user) {
    let url = searchUrl + user + "/repos"
    
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error();
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Something went wrong, try another username`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);

    for (let i = 0; i < responseJson.length; i++) {
        
        $("#results-list").append(
            `<li>
                <h2>${responseJson[i].name}</h2>
                <p> Link: <a href='${responseJson[i].html_url}' target=_blank>Click Here</a></p>
            </li>`
        )
    }

    $("#js-results").removeClass('hidden');
}

$(watchForm);
