(function( global ) {
    var module = (function() {

        var genderData =  [];
        var adverseEffects = [];
        var causingDrugs = [];

        return {
            getGenderData: function() {
                this.validateData(genderData);
                return genderData;
            },
            getAdverseEffects:function(){
                this.validateData(adverseEffects);
                return adverseEffects
            },
            getCausingDrugs:function(){
                this.validateData(causingDrugs);
                return causingDrugs;
            },
            setAdverseEffects:function(values){
                adverseEffects = values;
            },
            setCausingDrugs:function(values){
                causingDrugs = values;
            },
            setGenderData:function(values){
                genderData = values;
            },
            validateData:function(data){
                if(!data || !data.length){
                    return "no valid data found";
                }
            }

        };
    })();

    global.Module = module;

})( this );
