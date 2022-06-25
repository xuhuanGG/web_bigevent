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
        e.preventDefault();
        var data = {
            uername: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            console.log(res);
        })
    })
})