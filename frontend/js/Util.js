/**
 * Created by Philipp on 25.02.2017.
 */
function toDiaryEntriesHtml (data) {


    var html = "<ul>";
    for (var i =0;i<data.length;i++) {
        html+="<li class='entry'>";
        html+="<b>"+formatDate(data[i].creationTime)+"</b>";
        html+="<br/>";
        html+=data[i].entry;
        html+="</li>";
        html+="<br/><br/>";
    }
    html+="</ul>";
    return html;
}

function initBackToTopButton() {
    var back_to_top_button = ['<a href="#top" class="back-to-top">Up</a>'].join("");
    $("body").append(back_to_top_button);
    $(".back-to-top").hide();

    $(function () {
        $("#content").scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });

        $('.back-to-top').click(function () {
            $('#content').animate({
                scrollTop: 0
            }, 300);
            return false;
        });
    });
}

function formatDate(date) {
    "2017-02-26T18:25:18.000Z"

    var t = date.split(/[-T:.]/);
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = d.getDate();
    var monthIndex = d.getMonth();
    var year = d.getFullYear();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    return day + '. ' + monthNames[monthIndex] + '. ' + year + ', ' + hours + ':' + minutes ;
}