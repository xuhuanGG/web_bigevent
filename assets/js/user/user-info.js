$(function() {
    // 验证昵称
    var form = layui.form;
    var layer = layui.layer
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在1~6个字符之间'
                }
            }

        })
        // 初始化用户资料
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    layer.message('获取用户信息失败')
                }
                form.val("userInfoForm", res.data)
            }

        })
    }
    // 重置用户资料
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo();
        })
        // 更新用户资料
    $('.layui-form').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return '用户更新失败'
                }
                layer.msg('信息修改成功');
                // 重新渲染首页
                window.parent.getUserInfo();

            }

        })
    })
})