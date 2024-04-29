$(document).ready(function () {
    //將縣市和地區json資料加到select中
    $.ajax({
        url: "./TaiwanAddress_Simple.json",
        dataType: "JSON",
    }).done(cityData => {
        // console.log(cityData);
        cityData.forEach(item => {
            const option = $(`<option value=${item.city}>${item.city}</option>`)

            $("#citySelect").append(option)
        });
        $("#citySelect").on('change', function (e) {
            $('#areaSelect').empty();

            const citySelectVal = e.target.value;
            // console.log(citySelectVal);
            if (citySelectVal === '') {
                $("#areaSelect").html('<option value="">請先選擇縣市</option>');
                return;
            }

            const areaData = cityData.find(item => item.city === citySelectVal).districts
            // console.log(areaData);

            areaData.forEach(item => {
                const option = `<option value=${item.district}>${item.district}</option>`
                $('#areaSelect').append(option)
            })
        });

    })
})