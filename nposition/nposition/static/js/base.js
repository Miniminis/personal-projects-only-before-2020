$(document).ready(function () {
    $.get('/apis/v1/home/',
        {},
        function (obj) {
            company = obj.data.company_info
            agreement = obj.data.agreement

            $('#top_email').text(company.email);
            $('#top_tel_num').text(company.tel_num);

            $('#footer_company_name').text(company.name);
            $('#footer_company_address').text(company.address);
            $('#footer_company_ceo').text(company.ceo);
            $('#footer_company_tel_num').text(company.tel_num);
            $('#footer_company_email').text(company.email);
            $('#footer_company_busin_num').text(company.busin_num);
            $('#footer_company_kakao_id').text(company.kakao_id);

            $('#agree_private').attr("href", agreement.personal_info);
            $('#agree_service').attr("href", agreement.service_usage);
            $('#agree_unique_info').attr("href", agreement.unique_info);

        })
        .fail(function (obj) {
            console.log(obj.responseJSON.message)
        });
});