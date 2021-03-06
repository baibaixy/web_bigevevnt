$(function () {
  const form = layui.form;
  form.verify({
    nickname: (value) => {
      if (value.length > 6) return '昵称长度不能超过6个字符';
    },
  });

  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取用户信息失败！');
        layer.msg('获取成功 ');
        form.val('formUserInfo', res.data);
      },
    });
  };

  $('#btnReset').click((e) => {
    e.preventDefault();
    initUserInfo();
  });

  // 更新用户数据
  $('.layui-form').on('submit', (e) => {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $('.layui-form').serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新用户信息失败！');
        layer.msg('更新用户信息成功！');
        // 调用父页面渲染函数
        window.parent.getUSerInfo();
      },
    });
  });
  initUserInfo();
});
