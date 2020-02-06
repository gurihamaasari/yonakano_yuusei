//武器設定
var Weapon_list = {
    "data": [
        { "id": 0, "weapon_zen": "突撃", "weapon_kou" :"銃弾"},
        { "id": 1, "weapon_zen": "打撃", "weapon_kou":"弓矢"},
        { "id": 2, "weapon_zen": "斬撃", "weapon_kou":"銃弾"},
        { "id": 3, "weapon_zen": "突撃", "weapon_kou":"弓矢"},
        { "id": 4, "weapon_zen": "打撃", "weapon_kou":"魔法"},
        { "id": 5, "weapon_zen": "斬撃", "weapon_kou":"弓矢"},
        { "id": 6, "weapon_zen": "突撃", "weapon_kou":"魔法"},
        { "id": 7, "weapon_zen": "打撃", "weapon_kou":"銃弾"},
        { "id": 8, "weapon_zen": "斬撃", "weapon_kou":"魔法"}
    ]
};



$(function () {

    //var WeekChars = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    //var dObj = new Date();    // 今日の日付

    var optional_config = {
        dateFormat: "Y/m/d",
        defaultDate: ["today"]
    };
    var optional_config_stop = {
        dateFormat: "Y/m/d",
        mode: "multiple"
    };
    //カレンダー日本語化
    flatpickr.localize(flatpickr.l10ns.ja);
    $("#txt_date").flatpickr(optional_config);

    $("#txt_stop_date").flatpickr(optional_config_stop);

    $("#calc_days").val(30);

    //select-box設定
    //$.each(Weapon_list.data, function (index, value) {
    //    $("#list_wapon").append($("<option>").val(value.id).text(value.weapon));
    //})

    //ボタンを押したとき
    $('#btn_run').click(function (e) {


        var str_zen = $("input[name='zen']:checked").val();
        var str_kou = $("input[name='kou']:checked").val();

        var buf_data = Weapon_list.data.filter(function (item, index) {
            if (item.weapon_zen === str_zen && item.weapon_kou === str_kou) return true;
        });


        var weapon_id = buf_data[0].id;

        var str_day = $("#txt_date").val();
        var calc_days = $("#calc_days").val();        
        var txt_stop_days = $("#txt_stop_date").val();
        var lst_stop_days = txt_stop_days.split(',');
        var str_rezalt = '';
        str_rezalt += '<table id = "table05">';

        str_rezalt += '<thead>';
        str_rezalt += '<tr>';
        str_rezalt += '<th>日付</th><th>特攻武器</th><th colspan="2">アイコン</th>';
        str_rezalt += '</tr>';
        str_rezalt += '</thead>';
        str_rezalt += '<tbody>';
        for (var i = 0; i < calc_days; i++) {

            str_rezalt += '<tr>';
            str_rezalt += '<th>';

            var m = moment(str_day);
            var m_day = m.add("days", i); //1日追加
            
            var data = Weapon_list.data.filter(function (item, index) {
                if (item.id === weapon_id) return true;
            });

            str_rezalt += m_day.format('YYYY年MM月DD日');
            str_rezalt += '</th>';
            str_rezalt += '<td>';

            //休日配列内検索
            var result = lst_stop_days.some(function (value) {
                var day = moment(value);
                return day.format('YYYYMMDD') === m_day.format('YYYYMMDD');
            });

            var img_zen = data[0].weapon_zen;
            var img_kou = data[0].weapon_kou;

            //前衛職
            switch (img_zen) {
                case '斬撃':
                    img_zen = '<img src="img/zan.png" width="32" height="32"/>';
                    break;
                case '突撃':
                    img_zen = '<img src="img/totsu.png" width="32" height="32"/>';
                    break;
                case '打撃':
                    img_zen = '<img src="img/da.png" width="32" height="32"/>';
                    break;
            }

            switch (img_kou) {
                case '弓矢':
                    img_kou = '<img src="img/yumi.png" width="32" height="32"/>';
                    break;
                case '銃弾':
                    img_kou = '<img src="img/jyu.png" width="32" height="32"/>';
                    break;
                case '魔法':
                    img_kou = '<img src="img/ma.png" width="32" height="32"/>';
                    break;
            }


            if (result) {
                str_rezalt += 'お休み';
                img_zen = '';
                img_kou = ''; 
            } else {
                weapon_id = weapon_id + 1;
                str_rezalt += '' + data[0].weapon_zen + '&' + data[0].weapon_kou;
            }

            str_rezalt += '<td>';
            str_rezalt += img_zen;
            str_rezalt += '</td>';
            str_rezalt += '<td>';
            str_rezalt += img_kou;
            str_rezalt += '</td>';


            if (weapon_id === 9) {
                weapon_id = 0;
            }

            str_rezalt += '</td>';
            str_rezalt += '</tr>';
           
        }//for
        str_rezalt += '</tbody>';
        str_rezalt += '</table>';
        $('#rezalt').html(str_rezalt);
        

    });   


});
