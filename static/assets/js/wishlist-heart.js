(function(){
  // Tô tim các sản phẩm đã có trong wishlist khi load trang
  $.getJSON("/api/wishlist-pids/", function(res){
    (res.pids || []).forEach(function(pid){
      $('.add-to-wishlist[data-product-item="'+ pid +'"]').addClass('active');
    });
  });

  // Toggle add/remove khi click
  $(document).on("click", ".add-to-wishlist", function(e){
    e.preventDefault();
    var $btn = $(this);
    var pid  = $btn.attr("data-product-item"); // pid product
    if(!pid) return;

    var isActive = $btn.hasClass("active");
    var url = isActive ? "/remove-from-wishlist/" : "/add-to-wishlist/";
    $btn.addClass("pe-none"); // tạm khóa nút trong lúc gọi

    $.ajax({
      url: url,
      data: { id: pid },           // backend đang nhận 'id' = pid
      dataType: "json"
    })
    .done(function(){
      // Đổi trạng thái UI
      if(isActive){
        // remove
        $('.add-to-wishlist[data-product-item="'+ pid +'"]').removeClass('active');
      }else{
        // add
        $('.add-to-wishlist[data-product-item="'+ pid +'"]').addClass('active');
      }
    })
    .always(function(){
      $btn.removeClass("pe-none");
    });
  });
})();