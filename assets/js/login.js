$(function() {
    // 切换注册页面
    $('#to-reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();

        })
        // 切换登录页面
    $('#to-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();


    })
    var form = layui.form;
    var layer = layui.layer
    form.verify({
            // 密码的校验规则
            pass: [/^[\S]{6,12}$/, '密码必须6到12位,不能出现空格'],
            // 再次确认密码的校验规则
            repass: function(value) {
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次输入不一致';
                }

            }


        })
        // 提交注册信息
    $('#form-reg').on('submit', function(e) {
            // 阻止默认提交行为
            e.preventDefault();
            // 不用serialize函数因为这里有三个表单值
            var data = {
                username: $('#form-reg  [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            }
            $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
                console.log(res)
                if (res.status !== 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg('注册成功，请登录')
                        // 模拟点击行为
                    $('#to-login').click();
                    $('#form-login [name=username]').val(data.username)
                    $('#form-login [name=password]').val(data.password)
                }
            })
        })
        // 提交登录信息
    $('#form-login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('登录失败')
                } else {
                    layer.msg('登陆成功');
                    // 保存权限身份认证
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
            }

        })
    })
})