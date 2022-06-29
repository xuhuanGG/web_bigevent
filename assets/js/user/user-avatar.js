$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    var layer = layui.layer
        // 为上传绑定点击时间

    $('#btnChooseImg').on('click', function() {
            $('#files').click();
        })
        // 更换照片
    $('#files').on('change', function(e) {
        console.log(e)
        var filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请上传照片');
        }
        // 拿到文件
        var file = filelist[0];
        // 将文件转换为路径
        var imgUrl = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    $('#btnUpload').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // console.log(dataURL)
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg(res.message);

                window.parent.getUserInfo()
            }
        })
    })
})