$(function() {
    initArticleCate();
    var layer = layui.layer
    var form = layui.form
        // 获取文章列表
    function initArticleCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }

        })
    }
    var indexAdd = null
    $('#btnAddCate').on('click', function() {

        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '300px'],
            content: $('#dialog-add').html() //渲染添加功能中的html结构
        });
    })

    // 更新用户提交的新增文章类别
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();

            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArticleCate();
                    layer.msg(res.message)
                    $('#form-add')[0].reset();
                    layer.close(indexAdd);
                }

            })

        })
        // 给编辑按钮绑定点击事件(需要代理)
    var indexEdit = null
    $('tbody').on('click', '#btnEdit', function() {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章类别',
            area: ['500px', '300px'],
            content: $('#dialog-edit').html() //渲染编辑功能中的html结构
        });
        // 获取当前id
        var id = $(this).attr('data-id')
        $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    // 给编辑表单赋值
                    // 不需要加#
                    form.val('form-edit', res.data)

                }
            })
            // 给编辑表单绑定提交时间
        $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }

                    layer.msg(res.message)
                    initArticleCate();
                    layer.close(indexEdit)
                }
            })
        })


    })

    // 添加删除功能
    $('tbody').on('click', '#btnDelete', function() {
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArticleCate();
                layer.msg(res.message)
            }
        })
    })
})