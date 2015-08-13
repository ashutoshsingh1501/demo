(function(ctx) {
    'use strict'
    ctx.fetch = function(url,success) {
        $.ajax({
            dataType: "json",
            url: 'data/'+ url +'.json',
            success: success
        });
    }

})(window);