$(function() {
    var layer = layui.layer
    var form = layui.form
        // 获取文章类别数据
    initcate();
    initEditor()

    function initcate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)

                $('[name=cate_id]').html(htmlStr)
                    // 调用form.render
                form.render()

            }
        })
    }
    // 1. 初始化图片裁剪器 
    var $image = $('#image')
        // 2. 裁剪选项 
    var options = { aspectRatio: 400 / 280, preview: '.img-preview' }
        // 3. 初始化裁剪区域 
    $image.cropper(options)
    $('#chooseImg').on('click', function(e) {
        $('#coverImg').click()

    })
    $('#coverImg').on('change', function(e) {

        var files = e.target.files //获取文件
        if (files.length === 0) {
            return layer.msg('请选择图片')
        }
        var newImgUrl = URL.createObjectURL(files[0]) //将文件转换为url
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    var art_state = '已发布'
    $('#btnSave2').on('click', function() {
            art_state = '草稿'

        })
        //为表单绑定提交事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image.cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布 
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象 
                // 得到文件对象后，进行后续的操作 
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求 
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POSt',
            url: '/my/article/add',
            contentType: false,
            processData: false,
            data: fd,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg('发布文章成功！')
                location.href = "/article/article-list.html"


            }
        })
    }
})