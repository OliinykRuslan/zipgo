//mobile menu
// $(document).on("click", ".showMenu", function(){
// 	$(".showMenu").toggleClass("opened");
// 	$(".toggleMenu").toggleClass("menu-open");
// });
// sticky menu    
var objToStick = $("body");     
 var topOfObjToStick = $(objToStick).offset().top;       
 $(window).scroll(function () {
	var windowScroll = $(window).scrollTop();        
		if (windowScroll > topOfObjToStick) {             
			$(objToStick).addClass("stickyHeader");         
		} else {    
		$(objToStick).removeClass("stickyHeader");         
	};
});

$(document).ready(function(){

	// Slick slider
	$('.slick_slider').slick({
		centerPadding: '0 20% 0 0',
		slidesToShow: 1,
		centerMode: true,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 300,
		variableWidth: false,
		prevArrow: "<img src='img/arrow-left.svg' class='prev-btn' alt='arrow-left'>",
		nextArrow: "<img src='img/arrow-right.svg' class='next-btn' alt='arrow-right'>",
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					centerPadding: '0px'
				}
			}
		]
	});

	// nav link
    $(".travel-experience-section").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });


	// "Name" Text validation
	var namepattern = /^[A-Za-z ]{2,18}$/i;
	var name = $('.nameValid');
	$(document).on("blur", 'input.nameValid', function(){
		if($(this).val() != ''){
			if($(this).val().search(namepattern) == 0){
				$(this).removeClass('error');
				$(this).closest('.nameVilidBox').find('.validation_text').remove();
			}else{
				$(this).addClass('error');
				$(this).closest('.nameVilidBox').find('.validation_text').remove();
				$(this).closest('.nameVilidBox').append("<div class='validation_text'>Incorrect name</div>");
			}
		}else{
			$(this).addClass('error');
			$(this).closest('.nameVilidBox').find('.validation_text').remove();
			$(this).closest('.nameVilidBox').append("<div class='validation_text'>This is a required field</div>");
		}
	});

	//mail validation
	var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
	var mail = $('.mailValid');
	$(document).on("blur", 'input.mailValid', function(){
		if($(this).val() != ''){
			if($(this).val().search(pattern) == 0){
				$(this).removeClass('error');
				$(this).closest('.mailVilidBox').find('.validation_text').remove();
			}else{
				$(this).addClass('error');
				$(this).closest('.mailVilidBox').find('.validation_text').remove();
				$(this).closest('.mailVilidBox').append("<div class='validation_text'>Incorrect email adress</div>");
			}
		}else{
			$(this).addClass('error');
			$(this).closest('.mailVilidBox').find('.validation_text').remove();
			$(this).closest('.mailVilidBox').append("<div class='validation_text'>This is a required field</div>");
		}
	});

	//validation after click submit button
	$(document).on("click", ".schedule-btn", function(){
		var send = true;

		// name
		$(this).closest('.schedule-form').find('.nameValid').each(function(){
			if($(this).val() != ''){
				if($(this).val().search(namepattern) == 0){
					$(this).removeClass('error');
					$(this).closest('.nameVilidBox').find('.validation_text').remove();
				}else{
					$(this).addClass('error');
					$(this).closest('.nameVilidBox').find('.validation_text').remove();
					$(this).closest('.nameVilidBox').append("<div class='validation_text'>Incorrect name</div>");
				}
			}else{
				$(this).addClass('error');
				$(this).closest('.nameVilidBox').find('.validation_text').remove();
				$(this).closest('.nameVilidBox').append("<div class='validation_text'>This is a required field</div>");
			}
		});

		//mail
		$(this).closest('.schedule-form').find('.mailValid').each(function(){
			if($(this).val() != ''){
				if($(this).val().search(pattern) == 0){
					$(this).closest('.mailVilidBox').removeClass('error');
					$(this).closest('.mailVilidBox').find('.validation_text').remove();
				}else{
					$(this).addClass('error');
					$(this).closest('.mailVilidBox').find('.validation_text').remove();
					$(this).closest('.mailVilidBox').append("<div class='validation_text'>This is a required field</div>");
				}
			}else{
				$(this).addClass('error');
				$(this).closest('.mailVilidBox').find('.validation_text').remove();
				$(this).closest('.mailVilidBox').append("<div class='validation_text'>Incorrect email adress</div>");
			}
		});

	});
});

$(document).on('submit', '.jsFormEmail', function(e){
	var form = $(this);
	$.ajax({
		url: '../php/sendEmailscript.php',
		type: "POST",
		data: {
			nameBody: form.find('.jsSNameBody').val(),
			emailBody: form.find('.jsSEmailBody').val()
		},
		success: function(data){
			alert('sent!')
		},
		complete: function(){
		}
	})
	return false;
});