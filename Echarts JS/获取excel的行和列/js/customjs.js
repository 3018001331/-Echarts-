(function () {
    var app = angular.module('myApp', []);
    app.controller('MyController', ['$scope', myController]);


    var excelJsonObj = [];
    function myController($scope) {
        $scope.uploadExcel = function () {
            var myFile = document.getElementById('file');
            var input = myFile;
            var reader = new FileReader();
            reader.onload = function () {
                var fileData = reader.result;
                var workbook = XLSX.read(fileData, { type: 'binary' });

                // 表格的表格范围，可用于判断表头是否数量是否正确
                var fromTo = '';
                // 遍历每张表读取
                var sheet0 = workbook.Sheets[workbook.SheetNames[0]];//sheet0代表excel表格中的第一页
                var str = XLSX.utils.sheet_to_json(sheet0);//利用接口实现转换。
                for (var i in str) {
                    var lat = str[i].LATB;//得到经度

                    var lng = str[i].LNGB;//得到纬度
                    $('#myTable tbody:last-child').append("<tr><td>" + lat + "</td><td>" + lng + "</td></tr>");

                }
                
                
            };
            reader.readAsBinaryString(input.files[0]);
        };
    }
})();