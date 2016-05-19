var AppCtrl = EixoXApp.controller('AppCtrl', function ($scope, $locale) {
    
    $scope.loadApps = function(){
        EixoXApp.api({
            success: function(result){
                $scope.apps = result.result;
            }
        });
    };
    
});
module.exports = AppCtrl;