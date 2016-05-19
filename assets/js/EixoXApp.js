var EixoXApp = angular.module('EixoXApp', []);

EixoXApp.api = function (options) {
    
};

EixoXApp.storage = {
    get: function (name) {
        var obj = EixoXApp.storage[name];
        if (!obj) {
            var content = localStorage[name];
            obj = (content && content.length > 0) ? JSON.parse(content) : null;
            EixoXApp.storage[name] = obj;
        }
        return obj;
    },
    set: function (name, value) {
        EixoXApp.storage[name] = value;
        if (!value || value == null)
            localStorage.removeItem(name);
        else
            localStorage[name] = JSON.stringify(value);
    }
};

var RegisterCtrl = EixoXApp.controller('RegisterCtrl', function ($scope, $locale) {

    $scope.controls = {
        email: {
            value: "",
            type: "email",
            message: "",
            state: "NORMAL",
            required: true,
            minlength: 10,
            maxlength: 100,
            email: true,
        },
        firstName: {
            value: "",
            type: "text",
            messsage: "",
            state: "NORMAL",
            required: true,
            maxlength: 50,
            minlength: 10
        },
        middleNames: {
            value: "",
            type: "text",
            message: "",
            state: "NORMAL",
            required: false,
            maxlength: 50
        },
        lastName: {
            value: "",
            type: "text",
            message: "",
            state: "NORMAL",
            required: true,
            minlength: 10,
            maxlength: 50
        },
        password: {
            value: "",
            message: "",
            type: "password",
            required: true,
            minlength: 6,
            maxlength: 20
        },
        passwordConfirmation: {
            value: "",
            message: "",
            type: "password",
            required: true,
            match: "password",
            minlength: 6,
            maxlength: 20
        }
    };

    $scope.getClass = function (ctrl) {

    };

    $scope.register = function () {

    };

});