 
(function($){
    
    var AppCreate={
        event: function(){
            var $this=this;
          $("#submit").click( function(){
              $this.submitComment();
          });  
          
          $(document).on("click", ".delete", function(){
              $this.deleteComment(this);
          });  
        },
        deleteComment: function($this){
            var $_this=this;
            $.ajax({
                type: "post",
                data: {id: $($this).data("id")},
                url: '/delete/'+$($this).data("id"),
                success: function(msg){
                   $(".main #delete-show").html(msg);
                   $_this.showComment();
                }
            });
            
        },
        
        
        submitComment: function(){
            if(this.validate()){
                $("#error").html("Please fill all field.");
                return false;
            }
            var $this=this;
            
            $.ajax({
                type: "post",
                data: {
                        nm: $("#nm").val(),
                        email: $("#email").val(),
                        comment: $("#comment").val(),
                    },
                url: '/insert',
                success: function(msg){
                   $("#nm, #email, #comment").val("");
                   $("#error").html(msg);
                   $this.showComment();
 
                }
            });
            
        },
        validate: function(){
          var nm= $("#nm").val();
          var email=$("#email").val();
          var comment= $("#comment").val();
          
          if(nm == "" || email == "" || comment ==""){
              return true; 
          }
          else{
              return false;
          }
            
        },
        showComment: function(){
            $.ajax({
                type: "post",
                //data: {},
                url: '/show',
                success: function(msg){
                    $(".app-list-view").html(msg);
                }
            });
        },
    };
    AppCreate.event();
    AppCreate.showComment();
    
    
})(jQuery);