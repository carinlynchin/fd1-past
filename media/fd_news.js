var APIKEY = "9a456403a55c4b73856022b42f027e60";
var URL = "https://newsapi.org/v2/everything?apiKey=" + APIKEY + "&language=en&q=";
var DAYOFWEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

$(document).ready(function() {
    if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
         //window.isMobile = true;
         $('.owl-nav button').addClass('active');
     }
     else {
         //window.isMobile = false;
         $('.newsSlider').on('mouseover', function() {
             $('button', this).addClass('active');
         });
         $('.newsSlider').on('mouseout', function() {
             if (event.relatedTarget == document.querySelector('main')) {
                 $('button', this).removeClass('active');
             }
         });
     }
     
    // var interval1 = setInterval(function() {
    //     $('.newsSlider1 .owl-carousel').trigger('next.owl.carousel.core');
    // },3000);
    var interval1 = setInterval(function() {
        window.newsCarousel.trigger('prev.owl.carousel.core');
        window.newsCarousel2.trigger('next.owl.carousel.core');
    },3000);

    // 
    // 
    // $('.newsSlider1').on('mouseover', function() {
    //     clearInterval(interval1);
    // });
    // $('.newsSlider2').on('mouseover', function() {
    //     clearInterval(interval2);
    // });
    // $('.newsSlider1').on('mouseout', function() {
    //     interval1 = setInterval(function() {
    //         $('.newsSlider1 .owl-carousel').trigger('next.owl.carousel.core');
    //     },3000);    
    // });
    // $('.newsSlider2').on('mouseout', function() {
    //     interval2 = setInterval(function() {
    //         $('.newsSlider2 .owl-carousel').trigger('prev.owl.carousel.core');
    //     },3000);    
    // });
    
    $('.owl-nav button').click(function() {
        if (event.currentTarget.classList.contains('owl-prev')) {
            window.newsCarousel.trigger('prev.owl.carousel.core');
            window.newsCarousel2.trigger('next.owl.carousel.core');
            // if (!window.isMobile) {
            //     $('.owl-carousel', $(this).closest('.newsSlider')).trigger('prev.owl.carousel.core');
            //     $('.owl-carousel', $(this).closest('.newsSlider')).trigger('prev.owl.carousel.core');
            // }
        }
        else if (event.currentTarget.classList.contains('owl-next')) {
            window.newsCarousel.trigger('next.owl.carousel.core');
            window.newsCarousel2.trigger('prev.owl.carousel.core');
            // if (!window.isMobile) {
            //     $('.owl-carousel', $(this).closest('.newsSlider')).trigger('next.owl.carousel.core');
            //     $('.owl-carousel', $(this).closest('.newsSlider')).trigger('next.owl.carousel.core');
            // }
        }
    })
});
/* searchTerms = query string for search terms.
   elem refers to the element where this will be added. 
   sortBy options are:
       relevancy = articles more closely related to q come first.
       popularity = articles from popular sources and publishers come first.
       publishedAt = newest articles come first.
*/
function getNews (searchTerms, elem, sortBy) {
    $.get(URL + encodeURIComponent(searchTerms) + '&excludeDomains=gamedev.net, geeksofdoom.com, vanguardngr.com, vimeo.com, blcklst.com, economictimes.indiatimes.com, indiatimes.com, livemint.com, latimes.com, bhmgnews.com, thestar.com.my, bbc.co.uk, iol.co.za, bbc.com, yahoo.com, thehindu.com, allafrica.com, jagranjosh.com, reuters.com, prnewswire.com, independent.co.uk, oann.com, cnbc.com, gamespot.com, newyorker.com, vancouversun.com,angryasianman.com, freemalaysiatoday.com, business-standard.com, seekingalpha.com, ndtv.com, bangkokpost.com, channelnewsasia.com, santabanta.com, soompi.com, rollingout.com, slashfilm.com, nypl.org, creativereview.co.uk, bloombergquint.com, thisismoney.co.uk' + '&sortBy=' + sortBy, function(response) { 
        var articleDom = '', thumbnailDom = '';
        //add personal article
        if (sortBy == 'relevancy') {
            response.articles.push(
                {
                    author: "Rebecca Rubin",
                    description: "Margot Robbie channeled 1960s Hollywood in a new teaser for Quentin Tarantino’s “Once Upon a Time in Hollywood.”",
                    publishedAt: "2018-08-06T04:00:00.000Z",
                    source: {id: null, name: "Variety.com"},
                    title: "Margot Robbie Teases First Look as Sharon Tate in ‘Once Upon a Time in Hollywood’",
                    url: "https://variety.com/2018/film/news/margot-robbie-sharon-tate-once-upon-a-time-in-hollywood-first-look-1202896029/",
                    urlToImage: "https://pmcvariety.files.wordpress.com/2018/08/margot-robbie.jpg?w=1000&h=562&crop=1"
                },
                {
                    author: "Richard Verrier",
                    description: "The FAA granted an exemption that will allow filmmakers to use drones. Above, a drone operated by Aerial MOB, one of the production companies that won clearance to use the unmanned aircraft. On the left is Shaun Khan, founder of FD Productions.",
                    publishedAt: "2014-09-25T04:00:00.000Z",
                    source: {id: null, name: "LA Times.com"},
                    title: "FAA gives drone exemption to Hollywood production firms",
                    url: "http://www.latimes.com/entertainment/envelope/cotown/la-et-ct-hollywood-drones-20140925-story.html",
                    urlToImage: "http://www.latimes.com/resizer/3hYBFsRf8rRfr8ztzNg-F0FDJDE=/1400x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/7EMDAJCWN5BCHHUCW2TFAGOGDY.jpg"
                }    
            );
        }
        
        var prevtitle = '';
        
        response.articles.map(function(val) {
            if (val.urlToImage == null || !val.urlToImage.match(/^http/)) return;
            if (prevtitle.replace(/\W/, '') == val.title.replace(/\W/, '')) return;
            var date = new Date(val.publishedAt);
                /* a potential option to handle these bad url's newsapi is sending us, is to create a variable for new Image and load it... if it loads successfully,
                   then we can create the news article, otherwise we skip it. Downfall to this is time. It will take time to load the image x however many images 
                   are there...therefore slower load time 
               */
            articleDom += `<article class='item' data-url="${val.url}">
                            <div class='img-container'>
                              <img src="${val.urlToImage}">
                            </div>
                            <div class="news-overlay">
                                <div class="text-overlay">
                                    <span class="badge badge-danger">${val.source.name}</span>
                                    <div class="text-overlay-title">
                                        <h2>${val.title}</h2>
                                    </div>
                                    <div class="text-overlay-meta">
                                        <span>${DAYOFWEEK[date.getDay()]} ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</span>
                                    </div>
                                    <a href="${val.url}" target='_blank' class="button button-reveal button-border button-light button-small button-rounded uppercase tright noleftmargin topmargin-sm">
                                        <span>Read Story</span>
                                        <i class="icon-angle-right"></i>
                                    </a>
                                </div>
                                <div class="rounded-skill">${/^http/.test(val.author) || val.author == null ? "" : val.author.match(/\w+\s*\w+/) ? val.author.match(/\w+\s*\w+/)[0] : val.author}</div>
                            </div>
                  </article>`;
                  thumbnailDom += `<article class='item' data-url="${val.url}">
                               <div class='img-container'>
                                 <a href="${val.url}" target='_blank'>
                                    <img src="${val.urlToImage}">
                                </a>
                               </div>
                              </article>`;
                 prevtitle  = val.title;
                 
            $(elem).html(articleDom);
            $('main .newsSlider.thumbnails .loop').html(thumbnailDom);
            
            setTimeout(function() {
                window.newsCarousel = $('.newsSlider1 .loop').owlCarousel({
                    center: true,
                    items:2,
                    loop:true,
                    margin:3,
                    stagePadding:50,
                    merged:false,
                    slideBy:1,
                    rewind:false,
                    nav: true,
                    smartSpeed: 250,
                    fluidSpeed: 250,
                    responsive:{
                        974:{
                            items:2,
                            slideBy:3
                        },
                        456: {
                            items: 1
                        },
                        0: {
                            items: 1
                        }
                    }
                });
                           
                window.newsCarousel2 = $('.newsSlider.thumbnails .loop').owlCarousel({
                    center: true,
                    items:20,
                    loop:true,
                    margin:3,
                    stagePadding:50,
                    merged:false,
                    slideBy:1,
                    rewind:false,
                    nav: true,
                    smartSpeed: 250,
                    fluidSpeed: 250,
                    responsive:{
                        900: {
                            items: 15
                        },
                        650: {
                            items: 7
                        },
                        0: {
                            items: 5
                        }
                    }
                });
            }, 1000);
            
            if( $('.loop').length < 2 && $($('.loop')[1]).find('.owl-item .item').length > 0){
                return;
            }
        });
    });
}

getNews('"film production"', $('.loop')[0], 'publishedAt');
getNews('film technology movie', $('.loop')[1], 'relevancy');
//(+film+production OR +\"paramount pictures\")
//Must be space separated terms