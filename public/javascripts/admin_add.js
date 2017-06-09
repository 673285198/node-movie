const $addBtn = $('#add-btn'),
	  $form = $('#movie-form');

$(function(){
	$addBtn.click(() => {
		addMovie();
	})
});

function addMovie(){
	let movie = {
		title : $form.find('input[name="title"]').val(),
		director:$form.find('input[name="director"]').val(),
		language:$form.find('input[name="language"]').val(),
		country:$form.find('input[name="country"]').val(),
		year:$form.find('input[name="year"]').val(),
		picture:$form.find('input[name="picture"]').val(),
		flash:$form.find('input[name="flash"]').val(),
		summary:$form.find('input[name="summary"]').val()
	};

	$.ajax({
		url:'/movie/add',
		type:'POST',
		data:{movie:JSON.stringify(movie)},
		dataType:'JSON',
		success:function(data){
			if(data && data.result === 'success'){
				alert('添加成功');
				window.href='/views/admin_add.html';
			}
		}
	})
}
	