angular
    .module('MainApp')
    .controller('MainController', [
        '$state', '$scope', 'getFirms', MainController
    ]);

function MainController($state, $scope, getFirms) {
    var vm = this;

    vm.results = getFirms.list;


    vm.search = {
        firmID: '',
        firmName: '',
        firmState: 'Any',
        firmStatus: 'Any'
    };


    vm.types = ['Fiduciary', 'Health Care', 'Individual', 'Insurance', 'Insurer', 'Lawyer', 'Money Manager', 'Consultant', 'Contractor', 'Patent Agent'];

    vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    vm.click = function () {
        if (vm.search.firmID) {
            getFirms.getFirmByID(vm.search);
        } else {
            getFirms.getFirms(vm.search);
        }

    }
};


