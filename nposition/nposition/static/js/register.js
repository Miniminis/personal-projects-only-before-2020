function register() {
    $('#reg_warning').hide()

    var email = $('#input_email').val().trim()
    var pw = $('#input_pw').val().trim()
    var re_pw = $('#input_re_pw').val().trim()
    var phnum = $('#input_phnum').val().trim()

    if(isEmpty(email)) {
        $('#reg_warning').show()
        $('#input_email').focus()
        return                    
    }

    if(isEmpty(pw)) {
        $('#reg_warning').show()
        $('#input_pw').focus()
        return                    
    }

    if(isEmpty(re_pw)) {
        $('#reg_warning').show()
        $('#input_re_pw').focus()
        return
    }

    if(isEmpty(phnum)) {
        $('#reg_warning').show()
        $('#input_phnum').focus()
        return
    }

    if(!checkEmail(email)) {
        $('#reg_warning').text('이메일 형식을 확인해주세요!').show()
        $('#input_email').focus()
        return
    }

    if(checkPw(pw) || checkPw(re_pw) || (pw != re_pw)) {
        $('#reg_warning').text('비밀번호를 확인해주세요!').show()
        $('#input_pw').focus()
        return
    }

    if(isNaN(phnum) || phnum.length <11 || phnum.length >12 
        || checkPhnum(phnum)) {
        $('#reg_warning').text('핸드폰번호를 확인해주세요!').show()
        $('#input_phnum').focus()
        return
    }

    $.post('/apis/v1/user/register/',
        {
            'email': email,
            'pw': pw,
            're_pw': re_pw,
            'phnum': phnum 
        },
        function (obj) {

        })
        .fail(function (obj) {
            $('#reg_warning').text(obj.responseJSON.message).show()
            console.log(obj.responseJSON.message)
        });
}