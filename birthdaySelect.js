window.addEventListener("load", birthdaySelectInit, false);

/**
 * Init Birthday Select at Window.load
 * @return {[type]} [description]
 */
function birthdaySelectInit() {
    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('.years').append($('<option />').val(i).html(i + " / " + (i-1911)));
    }
    for (i = 1; i < 13; i++) {
        $('.months').append($('<option />').val(i).html(i));
    }
    $('.years, .months').change(function() {
        updateNumberOfDays();
    });
    $('.days').change(function() {
        autoPutBirthDay(this);
    });
}

/**
 * Auto Put BirthDay to same area input
 * @param  {[type]} obj [for days select self this]
 */
function autoPutBirthDay(obj) {
    $(obj).closest('.birthday').find('.inputBirthday').val(getBirthDay($(obj).closest('.birthday')));
}

/**
 * Update Days by years and months
 */
function updateNumberOfDays() {
    $('.days').html('');
    $('.days').append($('<option />').val('').html('日'));
    var days = daysInMonth($('.months').val(), $('.years').val());
    for (i = 1; i < days + 1; i++) {
        $('.days').append($('<option />').val(i).html(i));
    }
}

/**
 * Get days in month
 * @param  {[type]} month [description]
 * @param  {[type]} year  [description]
 * @return {[type]} days  [description]
 */
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 * When window.load call this function, can auto cover date and auto put dateinput
 * @param  {[type]} birthday [EL get java date]
 */
function loadBirthDay(birthday, birthdaySelect) {
    setBirthDay(new Date(formatJsDate(birthday)), birthdaySelect);
}

/**
 * Get composeBirthday, if multiBirthday, need param target birthday
 * @param  {[type]} birthdaySelect  [description]
 * @return {[type]} composeBirthday [description]
 */
function getBirthDay(birthdaySelect) {
    var years = birthdaySelect ? $(birthdaySelect).find('.years').val() : $('.years').val(),
        months = birthdaySelect ? $(birthdaySelect).find('.months').val() : $('.months').val(),
        days = birthdaySelect ? $(birthdaySelect).find('.days').val() : $('.days').val();

    return (years + '-' + months + '-' + days + ' 01:00:00');
}

/**
 * Set composeBirthday to dateInput, if multiBirthday, need param target birthday
 * @param {[Javascript Date]} birthday       [description]
 * @param {[type]}            birthdaySelect [description]
 */
function setBirthDay(birthday, birthdaySelect) {
    if (birthdaySelect){
        $(birthdaySelect).find('.years').val(birthday.getFullYear()).change();
        $(birthdaySelect).find('.months').val(birthday.getMonth() + 1).change();
        $(birthdaySelect).find('.days').val(birthday.getDate()).change();
    }else {
        $('.years').val(birthday.getFullYear()).change();
        $('.months').val(birthday.getMonth() + 1).change();
        $('.days').val(birthday.getDate()).change();
    }
}

/**
 * Format from Java Date to Javascript Date
 * @param  {[Java Date String]}        value       [description]
 * @return {[Javascript Date String]}  formatDate  [description]
 */
function formatJsDate(value) {
    var dateArray = new Array(),
        formatDate = "";
    if (value) {
        dateArray = value.split(" ");
        formatDate += dateArray[1] +" ";
        formatDate += dateArray[2] +" ,";
        formatDate += dateArray[5] +" ";
        formatDate += dateArray[3];
        return formatDate;
    }else{
        return value;
    }
}

/**
 * Valid BirthdaySelect to be selected
 * @param  {[type]} element [Birthday Input element]
 * @return {[type]} isOK    [result is selected or not]
 */
function validBirthdayVal(element) {
    var year = $(element).parent().find('.years').val();
        months = $(element).parent().find('.months').val(),
        days = $(element).parent().find('.days').val();

    if (year && year !== '西元/民國') {
    }else {
        return false;
    }
    if (months && months !== '月') {
    }else {
        return false;
    }
    if (days && days !== '日') {
    }else {
        return false;
    }
    return true;
}
