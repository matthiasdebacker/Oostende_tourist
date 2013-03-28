var TouristApi = function(params){
    this.params = params;
};
TouristApi.prototype = {

    getTemplate : function(url, responder){
        return $.ajax({
            url : url,
            type : 'get',
            success : function(data){
                responder(data);
            }, error : function(){
                responder(arguments);
            }
        });
    },

    call : function(url, type, params, responder){
        return $.ajax({
            url :  url,
            type : type,
            data : params,
            success : function(data){
                responder(data);
            }, error : function(){
                responder(arguments);
            }
        });
    }

};