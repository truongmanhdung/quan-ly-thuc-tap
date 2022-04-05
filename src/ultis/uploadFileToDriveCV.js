function guardarArchivo(files, fileConvert, data) {
  var file = files; //the file
  console.log("file: ", files);
  var reader = new FileReader(); //this for convert to Base64
  reader.readAsDataURL(fileConvert); //start conversion...
  reader.onload = function (e) {
    //.. once finished..
    var rawLog = reader.result.split(",")[1]; //extract only thee file data part
    var dataSend = {
      dataReq: { data: rawLog, name: file.name, type: file.type },
      fname: "uploadFilesToGoogleDrive",
    }; //preapre info to send to API
    fetch(
      "https://script.google.com/macros/s/AKfycbzu7yBh9NkX-lnct-mKixNyqtC1c8Las9tGixv42i9o_sMYfCvbTqGhC5Ps8NowC12N/exec", //your AppsScript URL
      { method: "POST", body: JSON.stringify(dataSend) }
    ) //send to Api
      .then((res) => res.json())
      .then((a) => {
        console.log(a.id);
        //See response
        const newData = { ...data, CV: a.id };
        console.log("newData: ", newData);
      })
      .catch((e) => console.log(e)); // Or Error in console
  };
}

export { guardarArchivo };
