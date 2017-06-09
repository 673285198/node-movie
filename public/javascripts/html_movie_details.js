const $flash = $('#flash');
const $movieDetails = $('#movie-details');

$(function(){
	getMovie();
})

function getMovie(){
	$.ajax({
             type: "GET",
             url: "/movie/details",
             data: {id:movieId},
             dataType: "json",
             success: function(data){
        		let movie = data.movie;
           		if(movie !== null && movie !== undefined){
           			$flash.attr('src',movie.flash);
           			$movieDetails.find('dd[name="title"]').text(movie.title);
           			$movieDetails.find('dd[name="director"]').text(movie.director);
           			$movieDetails.find('dd[name="country"]').text(movie.country);
           			$movieDetails.find('dd[name="language"]').text(movie.language);
           			$movieDetails.find('dd[name="year"]').text(movie.year);
           			$movieDetails.find('dd[name="summary"]').text(movie.summary);
           		}            
         }
     });
}