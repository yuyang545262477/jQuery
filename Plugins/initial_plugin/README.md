#initial_plugin
----

#   step_list:
    
    //immediately-Invoked Function Expression (IIFE)
     (function($){
        //  construct function
        //  add prototype chain
        //  initial function
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
        //  add prototype chain
        //  initial it
    }(jQuery)
    
    
#   add prototype chain function
    
        (function($){
        
           //   construct function
            
           beauty.prototype.full = function(){
                return this.$element.css({
                    'color':this.options.color,
                    'fontSize':this.options.fontSize,
                    'textDecoration':this.options.fontSize
                }) ;
           };
           
           // initial it
            
        }(jQuery)
        
        
#   initial it.
        (function($){
        
            //  construct function
            
            
            //  add prototype chain 
                      
           $.fn.initial_plugin = function(option){
                
                var beauty = new beauty( this,  option);
                
                return beauty.full();
           }
            
            
        }(jQuery)
             
         
        
    
    
    