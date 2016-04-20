#initial_plugin
----

#   step_one:
    
    //immediately-Invoked Function Expression (IIFE)
     (function($){
        //expression
     }(jQuery);
     
#   construction of the Prototype
    
    (function($){
    
        var beauti = function(ele,opt){
           this.$element = ele;
           this.defaults = {
                'color':'red',
                'fontSize':'50px',
                'textDecoration':'none'
           };
           this.options = $.extend({},this.defaults,opt);
        };
        
    }(jQuery)
    
    
#   add prototype chain function
    
        (function($){
        
            var beauty = function(ele,opt){
               this.$element = ele;
               this.defaults = {
                    'color':'red',
                    'fontSize':'50px',
                    'textDecoration':'none'
               };
               this.options = $.extend({},this.defaults,opt);
            };
            
            // prototype chain function
            
           beauty.prototype.full = function(){
                return this.$element.css({
                    'color':this.options.color,
                    'fontSize':this.options.fontSize,
                    'textDecoration':this.options.fontSize
                }) ;
           };
            
        }(jQuery)
        
        
#   initial it.
        (function($){
        
            var beauty = function(ele,opt){
               this.$element = ele;
               this.defaults = {
                    'color':'red',
                    'fontSize':'50px',
                    'textDecoration':'none'
               };
               this.options = $.extend({},this.defaults,opt);
            };
            
            // prototype chain function
            
           beauty.prototype.full = function(){
                return this.$element.css({
                    'color':this.options.color,
                    'fontSize':this.options.fontSize,
                    'textDecoration':this.options.fontSize
                });
           };
           
           //   initial it
           
           $.fn.initial_plugin = function(option){
                
                var beauty = new beauty( this,  option);
                
                return beauty.full();
           }
            
            
        }(jQuery)
             
         
        
    
    
    