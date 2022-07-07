$(function() {
    // 调用函数获取用户信息
    getUserInfo();
    // 
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',

            success: function(res) {

                if (res.status !== 0) {
                    layui.layer.msg(res.message)
                } else {
                    renderAvatar(res.data);
                }

            }
        })
    }

    function renderAvatar(user) {
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp&nbsp' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic)
            $('.text-avatar').hide();
            $('.layui-nav-img').show();
        } else {
            $('.text-avatar').show();
            $('.layui-nav-img').hide();
            $('.text-avatar').html(name[0].toUpperCase())

        }
    }
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清除token
            localStorage.removeItem('token');
            // 2.跳转到登录页
            location.href = '/login.html'

            layer.close(index);
        });
    })

})