$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
        //请求文章列表数据的参数
    var q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 2, //一行中有几个数据
        cate_id: '',
        state: ''
    }
    initArticleList();
    initCate();
    // 初始化文章列表数据
    function initArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)

                }
                console.log(res)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    // 定义美化时间过滤器
    template.defaults.imports.dateFormat = function(date) {
            const dt = new Date(date)
            var y = padZero(dt.getFullYear())
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getMinutes())

            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
                // 定义补零函数
            function padZero(n) {
                return n > 9 ? n : '0' + n

            }

        }
        // 初始化新闻内别


    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('cate-id', res)
                $('[name=cate_id]').html(htmlStr);
                form.render()

            }
        })
    }
    // 筛选功能
    $('#form-search').on('submit', function(e) {
            e.preventDefault();
            var state = $('[name=state]').val()
            var cate_id = $('[name=cate_id]').val()
            console.log(state)
            console.log(cate_id)
            q.state = state
            q.cate_id = cate_id
            initArticleList();
        })
        // 分页功能

    // 渲染分页

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total, //总共页数
            limit: q.pagesize, //
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 7, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initArticleList();
                }
            }
        })
    }
    // 删除功能
    $('tbody').on('click', '#btnDelete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initArticleList();
                }
            })

            layer.close(index);
        });

    })
})