$(function () {
    load();
});

function load() {
    $('#exampleTable')
        .bootstrapTable(
            {
                method: 'get',
                url: "/user/searchUser/list",
                showColumns: false,
                iconSize: 'outline',
                toolbar: '#exampleToolbar',
                striped: true,
                undefinedText: "-",
                dataType: "json",
                pagination: true,
                singleSelect: false,
                pageSize: 10,
                pageList: [25, 50, 100],
                pageNumber: 1,
                sidePagination: "server",
                queryParams: function (params) {
                    return {
                        limit: params.limit,//页面大小
                        offset: params.offset //页码
                    };
                },
                columns: [
                    {
                        field: 'productId',
                        title: '商品ID'
                    },
                    {
                        field: 'productName',
                        title: '商品名称'
                    },
                    {
                        field: 'marketPrice',
                        title: '市场价格'
                    },
                    {
                        field: 'productPrice',
                        title: '商品价格'
                    },
                    {
                        field: 'productImg',
                        title: '商品图片'
                    },
                    {
                        field: 'productDesc',
                        title: '商品信息'
                    },
                    {
                        field: 'isSeckill',
                        title: '是否参加秒杀'
                    },
                    {
                        field: 'isGroup',
                        title: '是否参加团购'
                    },
                    {
                        field: 'productDate',
                        title: '上架日期'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var d = '<a title="删除" onclick="remove(\''
                                + row.postsId
                                + '\')"><i class="fa fa-remove" style="margin: 0"></i></a>';
                            return d;
                        }
                    }]
            });
}

/*刷新表*/
function reLoad() {
    $('#exampleTable').bootstrapTable('refresh');
}

/*删除*/
function remove(id) {
    layer.confirm('确定要删除选中的记录？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: "/posts/deletePosts",
            type: "post",
            data: {
                'postsId': id
            },
            success: function (r) {
                if (r.code === 0) {
                    layer.msg(r.msg);
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    })
}