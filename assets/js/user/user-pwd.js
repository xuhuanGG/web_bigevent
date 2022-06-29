$(function() {
    // 验证规则
    var form = layui.form;
    var layer = layui.layer
    form.verify({

            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
            ],
            samePwd: function(value) {
                if (value === $('[name=oldPwd]').val()) {
                    return '新旧密码不能一致'
                }
            },
            rePwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码输入不一致'
                }
            }


        })
        // 更新密码
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // 要加return直接跳出去，要不然会执行后面代码
                    return layer.msg(res.message)
                } else {
                    layer.msg(res.message);
                    $('.layui-form')[0].reset();
                }


            }
        })
    })
})