/**
 *
 * Angular Smart Bootstrap
 * @autor Max Buldovsky
 *
 */
(function( factory ) {
    if ( typeof define === "function" && define.amd ) {
    // AMD. Register as an anonymous module.
    define([ "angular", "jquery" ], factory );
    } else {
    // Browser globals
    factory( angular, jQuery );
    }
}(function( angular, $ ) {

    var d = $.Deferred()
    var appId = 'myApp'
    var app, injector
    // программа для отложенной компиляции
    var delay = false
    // функция компиляции
    var compile = function(element){

        var handler = function(){
            injector.invoke(function($compile, $rootScope){
                $compile(element)($rootScope);
                $rootScope.$apply();
            });
        }
        
        if(!element) element = document
        if(!injector) $.when(d).then(handler)
        else handler()

        
    }
    
    /**
     *
     * Возвращаем функцию через которую можно управлять модулем ангуляра
     *
     */
    angular.Module = function(arg){

        // откладываем перекомпиляцию
        if(arg === false) {
            delay = true
            return app
        }

        if($.isArray(arg)) {

            if(!app) app = angular.module(appId, arg);
            else app.requires = app.requires.concat(arg)
            return app
        }
        
        // если пришел объект для перекомпиляции
        if(typeof arg == 'object') {
            compile(arg);
            // восстанавливаем по умолчанию
            delay = false
        }
        
        // прописываем бутстрап ангуляра
        if(arg === true)
        angular.element(document).ready(function() {

            /**
             *
             * Теперь после загрузки подменяем стандартные методы
             *
             */
            app.config(function( $controllerProvider, $provide, $compileProvider){

                app._controller = app.controller;
                app.controller = function( name, constructor ) { $controllerProvider.register( name, constructor ); if(!delay) compile(); return( this ); };

                app._service = app.service;
                app.service = function( name, constructor ) { $provide.service( name, constructor ); if(!delay) compile(); return( this ); };

                app._factory = app.factory;
                app.factory = function( name, factory ) { $provide.factory( name, factory ); if(!delay) compile(); return( this ); };

                app._value = app.value;
                app.value = function( name, value ) { $provide.value( name, value ); if(!delay) compile(); return( this ); };

                app._directive = app.directive;
                app.directive = function( name, factory ) { $compileProvider.directive( name, factory ); if(!delay) compile(); return( this ); };

            }); 
            
            injector = angular.bootstrap(document, [appId]);
            
            // когда бутстрап загрузился
            d.resolveWith(injector)
            
                        
        });
        
        return app
    }

}));
