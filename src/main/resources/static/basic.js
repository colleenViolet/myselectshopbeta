let targetId;

$(document).ready(function () {
    // id 가 query 인 녀석 위에서 엔터를 누르면 execSearch() 함수를 실행하라는 뜻입니다.
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearch();
        }
    });
    $('#close').on('click', function () {
        $('#container').removeClass('active');
    })

    $('.nav div.nav-see').on('click', function () {
        $('div.nav-see').addClass('active');
        $('div.nav-search').removeClass('active');

        $('#see-area').show();
        $('#search-area').hide();
    })
    $('.nav div.nav-search').on('click', function () {
        $('div.nav-see').removeClass('active');
        $('div.nav-search').addClass('active');

        $('#see-area').hide();
        $('#search-area').show();
    })

    $('#see-area').show();
    $('#search-area').hide();

    showProduct();
})


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function execSearch() {
    /**
     * 검색어 input id: query
     * 검색결과 목록: #search-result-box
     * 검색결과 HTML 만드는 함수: addHTML
     */
        // 1. 검색창의 입력값을 가져온다.
    let query = $('#query').val();

    // 2. 검색창 입력값을 검사하고, 입력하지 않았을 경우 focus.
    if (query == '') {
        alert('검색어를 입력해주세요');
        $('#query').focus();
        return;
    }
    // 3. GET /api/search?query=${query} 요청
    $.ajax({
        type: 'GET',
        url: `/api/search?query=${query}`,
        success: function (response) {
            $('#search-result-box').empty();
            // 4. for 문마다 itemDto를 꺼내서 HTML 만들고 검색결과 목록에 붙이기!
            for (let i = 0; i < response.length; i++) {
                let itemDto = response[i];
                let tempHtml = addHTML(itemDto);
                $('#search-result-box').append(tempHtml);
            }
        }
    })

}

function addHTML(itemDto) {
    /**
     * class="search-itemDto" 인 녀석에서
     * image, title, lprice, addProduct 활용하기
     * 참고) onclick='addProduct(${JSON.stringify(itemDto)})'
     */
    return `<div class="search-itemDto">
        <div class="search-itemDto-left">
            <img src="${itemDto.image}" alt="">
        </div>
        <div class="search-itemDto-center">
            <div>${itemDto.title}</div>
            <div class="price">
                ${numberWithCommas(itemDto.lprice)}
                <span class="unit">원</span>
            </div>
        </div>
        <div class="search-itemDto-right">
            <img src="../images/icon-save.png" alt="" onclick='addProduct(${JSON.stringify(itemDto)})'>
        </div>
    </div>`
}