/*<a ng-click="toggleCollapsedStates($index)" href="#{{panelBaseId}}-{{$index}}">{{item.Title}}</a>\*/
customDirectives = angular.module('customDirectives', []);
customDirectives.directive('customAccordion', function () {
    return {
        scope: {
            ngModel: '='
        },
        restrict: 'A',
        template: '<div class="panel-group" id="{{panelId}}">\
                       <div class="panel panel-default" ng-repeat-start="item in ngModel">\
                           <div class="panel-heading">\
                               <h4 class="panel-title"> {{item.Title}}\
                               <i class="pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': item.open, \'glyphicon-chevron-right\': !item.open}"></i>\
                               </h4>\
                           </div>\
<div id="{{panelBaseId}}-{{$index}}" data-parent="#{{panelId}}" class="panel-collapse collapse">\
                               <div class="panel-body">{{item.Content}}</div>\
                           </div>\
                       </div>\
                       <div ng-repeat-end></div>\
                   </div>',
        link: function (scope, el, attrs) {
            scope.panelBaseId = attrs.collapsePanelBodyId;
            scope.panelId = attrs.collapsePanelId;

            $(document).ready(function () {
                angular.forEach(scope.ngModel, function (value, key) {
                    if (value.open) {                        
                        $("#" + scope.panelBaseId + "-" + key).collapse('show');
                    }
                });
            });

            scope.toggleCollapsedStates = function (ind) {
                angular.forEach(scope.ngModel, function (value, key) {
                    if (key == ind) {
                        scope.ngModel[key].open = !scope.ngModel[key].open;
                        $("#" + scope.panelBaseId + "-" + ind).collapse('toggle');
                    } else
                        scope.ngModel[key].open = false;
                });
            }
        }
    };
});