const $movieList = $('#movie-list')

$(function(){
	listAllMovie();
})

function listAllMovie(){
	$.get("/movie/all",
        {},
        function (data) {
        	let trs = '',
        		movies = eval(data).movies;

        	for(let i = 0; i < movies.length; i ++){
        		let item = movies[i];
        		trs += '<div class="col-sm-2">';
        		trs += '<div class="thumbnail"><img src="'+item.picture+'" style="height:300px"><div class="caption">';
      			trs += '<h3>'+item.title+'</h3>';
        		trs += '<p><a href="/movie/details-page?id='+item._id+'" class="btn btn-primary" role="button">观看预告片</a>'
    			trs += '</div>';
    			trs += '</div>';
    			trs += '</div>';
        	}
            $movieList.html(trs);
        });
}