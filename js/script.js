
var tumblr_api_key = 'YOUR API KEY';

(function($){
    
    $(document).ready(function() {       
        $(".block").fadeIn('slow');
        refresh();

        $("#refresh-button").click(function(e) {
            //console.log('refresh!');
            e.preventDefault();
            refresh();
        });

        $("form").keypress(function(e) {
            if ( e.which == 13 ) {
                e.preventDefault();
                refresh();                        
            }
        });                           
    });

    function refresh() {
        var tag = $("#tag").val();            
        var url = 'http://api.tumblr.com/v2/tagged?tag=' + tag + '&api_key=' + tumblr_api_key;

        if (tag.trim() == "") {
            return;
        };

        $("#refresh-button").attr("disabled", true);
        $("#refresh-button").html("LOADING...");
        //$('<div class="block"><div class="block-inner">TUMBLR<br>IMAGE<br>SEARCH</div>').hide().prependTo("#freetile").fadeIn();

        $.ajax(
            {
                url: url,
                dataType: 'jsonp',
                success: function(data) {
                    //console.log(data);
                    for (var i in data.response) {
                        if (typeof(data.response[i].photos) != "undefined") {
                            //console.log(data.response[i].photos[0].alt_sizes[2].url);
                            var photo = data.response[i].photos[0];

                            //var src_url = data.response[i].photos[0].alt_sizes[2].url;  
                            if (typeof(photo.alt_sizes[2]) != "undefined") {
                                var src_url = data.response[i].photos[0].alt_sizes[2].url;  
                            } else {
                                // fallback to the largest image size
                                var src_url = data.response[i].photos[0].alt_sizes[0].url;      
                            }

                            var width = 100 + parseInt(Math.random()*200);

                            $("#freetile").prepend('<div style="display: none;" class="pic"><img width="' + width + '" src="' + src_url + '"></div>');

                        } 
                    }
                    $("#freetile").freetile({
                        animate: true,
                        elementDelay: 10,
                        callback: function() {
                            //console.log("done!");
                            $(".pic").fadeIn();
                            $("#refresh-button").attr("disabled", false);
                            $("#refresh-button").html("SEARCH TAG");
                        }
                    });

                },
                error: function() {
                    alert("No response. tumblr might be down.");
                },
                complete: function() {
                }
            }
        );       
    }
})(jQuery)