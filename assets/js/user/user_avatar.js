$(function () {
  var $image = $('#image');
  const options = {
    aspectRatio: 1,
    preview: '.img-preview',
  };
  $image.cropper(options);

  $('#btnChooseImage').click(() => {
    $('#file').click();
  });
  $('#file').change((e) => {
    console.log(e);
    const fileLen = e.target.files.length;
    if (fileLen === 0) return;
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgUrl) // 重新设置图片路径
      .cropper(options);
  });
  //  为确定按钮绑定点击事件
$("#btnUpload").click(() => {
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png");
    // 2、发送 ajax 请求，发送到服务器
    $.ajax({
        method: "POST",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL,
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg("更换头像失败！");
            }
            layer.msg("更换头像成功！");
            window.parent.getUserInfo();
        },
    });
});
});
