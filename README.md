# Angular smart bootstrap

AngularJS docs:
> You should call angular.bootstrap() after you've loaded or defined your modules. You cannot add controllers, services, directives, etc after an application bootstraps.

```javascript
// add controllers, directives etc
angular.Module()
   .controller(...)
   .filter(...)

// angular manual bootstrap
angular.Module(true)

angular.Module()
   .controller('newController', function($scope){
       $scope.value = 5;
       $scope.method = function(){
           $scope.value += 1 
       }
   })
```
