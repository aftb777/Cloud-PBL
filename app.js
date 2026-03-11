var accountID  = ''

var accessToken=''

var subscriptionKey = ''

async function uploadVideo() {
    var files = document.getElementById("videoupload").files;
    if (!files.length) {
        return alert("Please choose a file to upload first.");
    }
    var file = files[0];
    var videoKey = file.name;

    await axios({
        method: 'get',
        url: 'https://api.videoindexer.ai/Auth/trial/Accounts/'+accountID+'/AccessToken?allowEdit=true',
        headers: {'Ocp-Apim-Subscription-Key': subscriptionKey},
      }).then(function (response) {
        accessToken = response.data
    });

    console.log( accessToken)

    let req = new XMLHttpRequest();
    let formData = new FormData();

    
    formData.append("file", file);                                
    req.open("POST", 'https://api.videoindexer.ai/trial/Accounts/'+accountID+'/Videos?name='+videoKey+'&privacy=Public&accessToken='+accessToken);
    req.send(formData);
    
    req.addEventListener("load", transferComplete);
    
}

function transferComplete(event) {
    var results = JSON.parse(event.currentTarget.responseText)
    console.log(results)
    alert("Successfully uploaded video.");
    viewVideo(results.id)
    var html = `<h3>Video ID:${results.id}</h3>
    <h3>Status: IN_PROGRESS</h3>
    <button id="checkresults" onclick="getVideoIndex('${results.id}')">Check Results</button><br><hr>`
    document.getElementById("jobid").insertAdjacentHTML('afterend', html);
}

function viewVideo(videoKey) {

axios({
  method:'get',
  url:'https://api.videoindexer.ai/trial/Accounts/'+accountID+'/Videos/'+videoKey+'/SourceFile/DownloadUrl?accessToken='+accessToken,
}).then(function(response){

document.getElementById("noVideoText").style.display="none";

var html = `
<video controls>
<source src="${response.data}" type="video/mp4">
</video>
`;

document.getElementById("videoPreview").innerHTML = html;

});

}

function previewVideo(){

let fileInput = document.getElementById("videoupload");
let file = fileInput.files[0];

if(file){

document.getElementById("noVideoText").style.display="none";

let videoURL = URL.createObjectURL(file);

let html = `
<video controls>
<source src="${videoURL}" type="video/mp4">
</video>
`;

document.getElementById("videoPreview").innerHTML = html;

}

}

async function getVideoIndex(videoId) {

  var html = '';
  await axios({
    method: 'get',
    url: 'https://api.videoindexer.ai/trial/Accounts/'+accountID+'/Videos/'+videoId+'/Index?language=en-US&accessToken='+accessToken,
  }).then(function (response) {
    console.log(response.data.state)
    if (response.data.state == 'Processing') {
      html = `<h3>Status: Processing </h3><hr>`
    } else {
      console.log(response.data.summarizedInsights)

      html = "Processed"
            
    }
    document.getElementById("status").insertAdjacentHTML('beforeend', html);
  });
}

function processResults(jsonObject){

  var html = ""

  /*
  // Format Labels
  if (jsonObject.labels.length > 0){
    html += "<table border=1>"
    html += "<tr><td> ** LABELS ** </td></tr>"
    jsonObject.labels.forEach(label => {
      label.appearances.forEach(item => {
         html += "<tr>><td><b> Name: "+label.name+"</b></td><td>-Confidence:"+Math.round(item.confidence*100)+"% startTime:"+item.startTime+" endTime:"+item.endTime+"</td></tr>"
      })
     });
    html += "</table>"
  }
  */

  /*
  //Format Faces
  if (jsonObject.faces.length > 0){
    html += "<table border=1>"
    html += "<tr><td> ** FACES ** </td></tr>"
    jsonObject.faces.forEach(face => {
      face.appearances.forEach(item => {
         html += "<tr>><td><b> Title: "+face.title+"</b></td><td><b> Description: "+face.description+"</b></td><td>-Confidence:"+Math.round(face.confidence*100)+"% startTime:"+item.startTime+" endTime:"+item.endTime+"</td></tr>"
      })
     });
    html += "</table>"
  }
  */

  return html
}
