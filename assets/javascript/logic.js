
    var apiKey="dc6zaTOxFJmzC";
    var animalsArray=['dogs','cats','fish','birds','cow','goats','eagles','lions','tigers','zebras','buffalos','elephants','squirrels','Pandas'];
    var userInputName="";
    var limit="10";
    var queryURL;
    var imageURL;
    var imageURLanimate;// for animate
    var imageRating;// for still
    var btnTag;



// function to create buttons for existing animals inside animalArray
    function animalsButtonFn(){  
        $('#btnDiv').empty();
        for(i=0;i<animalsArray.length;i++){ 
        $('#btnDiv').append('<button class="animalbtn btn btn-success">' + animalsArray[i] +'</button>');
            }
        }

// onclick event to create buttons for user requested animal in the search box
    $(document).on('click','#searchBtn',function(){
      event.preventDefault();
      userInputName=$('#searchInputVal').val().trim();

// conditional statement to check whether button already exists on the page, to avoid redundant.   
  var flag=false;
  for(j=0;j<animalsArray.length;j++){ 
  if(userInputName===animalsArray[j]){
    alert('button already exists; use existing button');// if button exist alert this message
    flag=true;
    }
  }
  if(flag===false && userInputName !=""){
  $('#btnDiv').append('<button class="animalbtn btn btn-success">' + userInputName +'</button>');
  animalsArray.push(userInputName);// if button does not exist add to animal buttons
  }
});

// onclick event to each animal button
$(document).on('click','.animalbtn',function(event){
  event.preventDefault();
    btnTag = this.innerText;
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + window.encodeURI(btnTag) + "&limit=" + limit + "&api_key="+ apiKey;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
 for (var i = 0; i < response.data.length; i++) {

    imageURL = response.data[i].images.fixed_height_still.url;
    imageURLanimate=response.data[i].images.fixed_height.url;
    imageRating = response.data[i].rating;

// bootstrap image caption used to include image & rating.
var img = '<figure class="figure">' + 
'<img class="gif" data-state="still" data-animate="'+imageURLanimate+'" data-still="'+imageURL+'" src="'+imageURL+'"'+ 'class="figure-img img-fluid rounded" alt="animal">' + 
'<figcaption class="figure-caption text-center">Rating: '+ imageRating +'</figcaption>'+
'</figure>';


$('#imageDiv').append(img); // append all images to the imageDiv.



}

});

//empty the div for next button click use.
$("#imageDiv").empty();
$('#imageRating').empty();

});

var dataState="";

animalsButtonFn();// function call to create the buttons for animals in the array

$(document).on("click",".gif",function() {
   dataState = $(this).attr("data-state") ;
	if (dataState === "still") { 
    $(this).attr('src',$(this).attr('data-animate'));
		$(this).attr("data-state", "animate") ;
	}

  if (dataState === "animate") {
    $(this).attr('src',$(this).attr('data-still'));
		$(this).attr("data-state", "still") ;
	 }

});



