/**
 * Created by lujing on 2017/6/9.
 */

const $userTable = $('#users-table');

$(() => {
    listUsers();
});

function listUsers() {
    $.ajax({
        url: '/user/list',
        type: 'GET',
        dataType: 'JSON',
        success: (data) => {
            if (data && data.users) {
                let trs = '',
                    users = eval(data.users);
                for (let user of users) {
                    trs += '<tr>';
                    trs += '<td>' + user.name + '</td>';
                    trs += '<td>' + user.meta.updateAt + '</td>';
                    trs += '<td>';
                    trs += '<a href="javascript:void(0);" onclick="modifyUser(\'' + user._id + '\')">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;';
                    trs += '<a href="javascript:void(0);" onclick="deleteUser(\'' + user._id + '\')">删除</a>';
                    trs += '</td>';
                    trs += '</tr>';
                }
                $userTable.find('tbody').html(trs);
            }
        }
    });
}

function deleteUser(_id) {
    $.ajax({
        url: '/user/delete',
        type: 'GET',
        data:{
            id:_id
        },
        dataType: 'JSON',
        success: (data) => {
            if(data && data.result === 'success'){
                alert('删除成功');
                location.reload();
            }else{
                alert('删除失败请稍后重试');
            }
        }
    })
}