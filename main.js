var ngApp = angular.module('ng_app', []);

ngApp.controller('mainController', ['$scope', function ($scope) {

    $scope.frequency = 100;

    $scope.leftKey = function ($event) {
        $scope.keyPress(1);
    };

    $scope.rightKey = function ($event) {
        $scope.keyPress(2);
    };

    $scope.upKey = function ($event) {
        $scope.keyPress(3);
    };

    $scope.downKey = function ($event) {
        $scope.keyPress(4);
    };

    $scope.keyPress = function(target){
        if(target == null || $scope.target != target){
            $scope.stopInterval();
            $scope.target = target;
            move();
            $scope.setIntervalInst = setInterval(function(){move();}, $scope.frequency);
        }
    }

    $scope.stopInterval = function(){
        clearInterval($scope.setIntervalInst);
    }

    $scope.onKeyPress = function ($event) {

        switch ($event.keyCode) {
            case 38:
                $scope.upKey();
                break; // вверх
            case 40:
                $scope.downKey();
                break; // вниз
            case 39:
                $scope.rightKey();
                break; // вправо
            case 37:
                $scope.leftKey();
                break; // влево

            case 87:
                $scope.upKey();
                break; // вверх
            case 83:
                $scope.downKey();
                break; // вниз
            case 68:
                $scope.rightKey();
                break; // вправо
            case 65:
                $scope.leftKey();
                break; // влево
        }

    };

    function move(){
        var deltaX = 0;
        var deltaY = 0;

        switch($scope.target){
            case 1: { deltaX = -2; } break;
            case 2: { deltaX = 2;  } break;
            case 3: { deltaY = -2; } break;
            case 4: { deltaY = 2;  } break;
        }

        var newXPoint = gameModel.getBallXPoint() + deltaX;
        var nexYPoint = gameModel.getBallYPoint() + deltaY;

        if(gameModel.checkDimension(newXPoint, nexYPoint)){

            if(gameModel.repaintBonus){
              gameModel.generateBonusPoint();
              $scope.frequency = $scope.frequency - 20;
            }

            gameModel.ballMoveTo(newXPoint, nexYPoint);
            gameModel.checkHit();
            gameModel.paint();
        }

    }

    var mainCanvas = $('#mainCanvas').get(0);
    var gameModel = new GameModel(5);
    gameModel.setCanvas(mainCanvas);
    $scope.gameModel = gameModel;
    gameModel.paint();

}]);



