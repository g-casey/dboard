function makePinRequest(url, image, auth) {
  if(image == null){
    return; 
  }
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: auth
    },
    body: image
  }).then((response) => response)
  .then((response) => response.json())
}

function convertToForm(image){
  let fdata = new FormData(); 
  fdata.append("file", image);
  return fdata;
}


export async function pinImage(image) {
  const auth = "Basic " + btoa(projectId + ":" + projectSecret);
  const formImage = convertToForm(image);

  const data = await makePinRequest("https://ipfs.infura.io:5001/api/v0/add",formImage, auth);
  const hash = data["Hash"];

  return `https://ipfs.infura.io/ipfs/${hash}`;
}
