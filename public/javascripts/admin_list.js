/**
 * Created by lujing on 2017/6/7.
 */
const $moviesTable = $('#movies-table');
const $modifyModal = $('#modify-modal');
const $movieForm = $('#movie-form');
const $addBtn = $('#add-btn');


$(function () {
    listMovies();

    $addBtn.click(() => {
        addModifyMovie();
    })
});

function listMovies() {
    $.ajax({
        url: "/movie/all",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                let trs = '',
                    movies = eval(data).movies;
                for (let item of movies) {
                    trs += '<tr>';
                    trs += '<td>' + item.title + '</td>';
                    trs += '<td>' + item.director + '</td>';
                    trs += '<td>' + item.language + '</td>';
                    trs += '<td>' + item.year + '</td>';
                    trs += '<td>' + item.country + '</td>';
                    trs += '<td>';
                    trs += '<a href="/movie/details-page?id=' + item._id + '" target="_blank">查看</a>&nbsp;&nbsp;&nbsp;&nbsp;';
                    trs += '<a href="javascript:void(0);" onclick="modifyMovie(\'' + item._id + '\')">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;';
                    trs += '<a href="javascript:void(0);" onclick="deleteMovie(\'' + item._id + '\')">删除</a>';
                    trs += '</td>';
                    trs += '</tr>';
                }
                $moviesTable.find('tbody').html(trs);
            }
        }
    })
}

function deleteMovie(id) {
    console.log(id);
    $.ajax({
        url: '/movie/delete',
        type: 'get',
        data: {
            id: id
        },
        success: function (data) {
            if (data && data.result === 'success') {
                alert('删除成功');
                listMovies();
            }
        }
    })
}

function modifyMovie(id) {
    $.ajax({
        url: "/movie/details",
        type: 'GET',
        data: {id: id},
        dataType: "json",
        success: function (data) {
            if (data) {
                let movie = data.movie;
                $modifyModal.modal('show');
                $movieForm.find('input[name="_id"]').val(movie._id);
                $movieForm.find('input[name="title"]').val(movie.title);
                $movieForm.find('input[name="director"]').val(movie.director);
                $movieForm.find('input[name="language"]').val(movie.language);
                $movieForm.find('input[name="country"]').val(movie.country);
                $movieForm.find('input[name="year"]').val(movie.year);
                $movieForm.find('input[name="picture"]').val(movie.picture);
                $movieForm.find('input[name="flash"]').val(movie.flash);
                $movieForm.find('input[name="summary"]').val(movie.summary);
            }
        }
    })
}

function addModifyMovie() {
    let movie = {

        title: $movieForm.find('input[name="title"]').val(),
        director: $movieForm.find('input[name="director"]').val(),
        language: $movieForm.find('input[name="language"]').val(),
        country: $movieForm.find('input[name="country"]').val(),
        year: $movieForm.find('input[name="year"]').val(),
        picture: $movieForm.find('input[name="picture"]').val(),
        flash: $movieForm.find('input[name="flash"]').val(),
        summary: $movieForm.find('input[name="summary"]').val()
    };

    $.ajax({
        url: '/movie/add',
        type: 'POST',
        data: {movie: JSON.stringify(movie), _id: $movieForm.find('input[name="_id"]').val(),},
        dataType: 'JSON',
        success: function (data) {
            if (data && data.result === 'success') {
                alert('修改成功');
                $modifyModal.modal('hide');
                listMovies();
            }
        }
    })
}

