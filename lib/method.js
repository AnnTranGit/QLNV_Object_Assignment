//kiểm tra rỗng

function kiemTraRong (value,selectorError,name) {
    //.trim(): loại bỏ khoảng trắng đầu và cuối của chuỗi
    if(value == '') {
        document.querySelector(selectorError).innerHTML = `${name} không được bỏ trống`;
        return false;
    }

    document.querySelector(selectorError).innerHTML = '';
    return true;

}



//ID min max

function kiemTraDoDai(value,selectorError,minLength,maxLength){

    if (value.length < minLength || value.length > maxLength) {
        document.querySelector(selectorError).innerHTML = `Nhập từ ${minLength} - ${maxLength} kí số và vui lòng không để trống!`
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';

    return true;

}

function kiemTraKyTu(value, selectorError, name) {
    var regexLetter = /^[a-zA-Z\u00C0-\u1EF9\s]+$/g;
    if (regexLetter.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = `${name} phải là ký tự`;
    return true;

}


function kiemTraEmail(value,selectorError) {
    var regexEmail = /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(regexEmail.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    document.querySelector(selectorError).innerHTML = 'Email không hợp lệ';
    return false;

}

function kiemTraPassword(value,selectorError) {
    var passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,10}$/;

    if(passwordRegex.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    document.querySelector(selectorError).innerHTML = 'Password không hợp lệ (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)';
    return false;

}


//kiemtra sogiolam

function kiemTraSoGioLam(value,selectorError,minNumber,maxNumber){

    if (value < minNumber || value > maxNumber) {
        document.querySelector(selectorError).innerHTML = `Số giờ làm bắt buộc từ ${minNumber} - ${maxNumber}!`
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';

    return true;

}