var DBPath = location.pathname.slice(0,location.pathname.indexOf('.nsf'))+'.nsf';

function getMsg(selector) {
    return $(selector).attr('data-msg');
}
function isIE () {
	
	var isIE = /*@cc_on!@*/false || !!document.documentMode, // Internet Explorer 6-11
    isEdge = !isIE && !!window.StyleMedia; // Edge 20+
 
	// Check if Internet Explorer 6-11 OR Edge 20+
	if(isIE || isEdge) {
		return true;
	}
	return false;	
}

$(document).ready(function(){
		
	$(".cellClickable").click(function() {			
		window.document.location = $(this).data("url");
	});
	
	$(".rowClickable").click(function() {
		window.document.location = $(this).data("url");
	});
	
	$(".rowClickableNewWindow").click(function() {
		window.open($(this).data("url"), "", "menubar=no");
	});
	
	$('.input-group.date input').datepicker( {
		format: "yyyy-mm-dd",
		autoclose: true,	
		language: "sv"
	
	});
		
	$('.input-daterange').datepicker({
	    format: "yyyy-mm-dd",
	    autoclose: true,
		language: "sv"
	});
	
	if ($('iframe.flexIframe').length > 0) {
		$('iframe.flexIframe').iFrameResize({
			autoResize:true
		});	
	}
	
	$(document).on("click", '.printbtn', function(e) {
		window.print();
		e.preventDefault();
	});
				
	// custom checkbox and radio
	$('input.custom').iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue'
	});
	
	if ($('.box-remove').length > 0) {
		
		$(document).on("click", '.box-remove', function(e) {
			
			var boxtype = $(this).data("boxtype");
			var boxname = $(this).data("boxname");
			var boxid = $(this).data("boxid");
			var settingsunid = $("#settingsunid").val();
			var change = "remove";
						
			var url = DBPath+'/xsp/settings/'+settingsunid+'/?action=changebox';

			var title = $(this).attr("title");
			var msg = $(this).data("msg");
			    
	    	$('#genericModal .modal-title').html(title);
	    	$('#genericModal .modal-body').html(msg);
	    	
		    $('#genericModal').modal({ backdrop: 'static', keyboard: false }).one('click', '#genericConfirm', function() {
		    	
		    	messageOfLoading();
		    	
				$.ajax({
					type:'POST', 
					url: url,	
					dataType: 'json', 
					data: { 
							"change": change,
							"boxtype": boxtype,
							"boxname": boxname,
							"_method": "PUT"
					}
				
				}).done(function(data) {
                	messageOfSuccess();	
                	$('#'+boxid).remove();
                	unloadMessageOfLoading();
                	
                	$('#genericModal').modal('hide');      
                });
				
		    });
			
			e.preventDefault();
		});	
	}
	
	if ($('.box-toggle').length > 0) {
		$(document).on("click", '.box-toggle', function(e) {
			
			var boxtype = $(this).data("boxtype");
			var boxname = $(this).data("boxname");
			var boxid = $(this).data("boxid");
			var settingsunid = $("#settingsunid").val();
			var change = "close";
			var $box = $('#'+boxid);
			var $icon = $(this).find("i");
			if ($box.hasClass("collapsed-card")) {
				change = "open";
				$icon.removeClass("fa-chevron-down");
				$icon.removeClass("text-red");
				$icon.addClass("fa-chevron-up");
			} else {
				$icon.removeClass("fa-chevron-up");
				$icon.addClass("fa-chevron-down");
				$icon.addClass("text-red");
			}
						
			var url = DBPath+'/xsp/settings/'+settingsunid+'/?action=changebox';

			$.ajax({
				type:'POST', 
				url: url,	
				dataType: 'json', 
				data: { 
						"change": change,
						"boxtype": boxtype,
						"boxname": boxname,
						"_method": "PUT"
				},
				success: function(data) {	
					// go on toggle
				}			   
			});
			
			e.preventDefault();

		});	
	}
	if($('.checkEditAccess').length > 0) {
		
		$(document).on("click", '.checkEditAccess', function(e) {
			
			var url = $(this).data("url");	
			
			var access = $(this).data("access");
			
			if (access == true) {
				location.href = url;
			} else {
				
				var title = $(this).attr("title");
				var msg = $(this).data("msg");
						
				$('#genericModal .modal-header').addClass("bg-warning");
		    	$('#genericModal .modal-title').html(title);
		    	$('#genericModal .modal-body').html(msg);
		    	
			    $('#genericModal').modal({ backdrop: 'static', keyboard: false }).one('click', '#genericConfirm', function() {
			    	
			    	$('#genericModal').modal('hide');
			    	$('#genericModal .modal-header').removeClass("bg-warning");
			    });
			}
			
			e.preventDefault(); 
		});	
		
	}
	
	if($('#trash').length > 0) {
		
		$(document).on("click", '#trash', function(e) {
						
			var title = $(this).attr("title");
			var msg = $(this).data("msg");
			var url = $(this).data("url");
			    
	    	$('#genericModal .modal-title').html(title);
	    	$('#genericModal .modal-body').html(msg);
	    	
		    $('#genericModal').modal({ backdrop: 'static', keyboard: false }).one('click', '#genericConfirm', function() {
		    	
		    	messageOfLoading();
		    	
                $.ajax({
                    type:'POST', 
                    url:url,
                    dataType:'json',
                    data: {
	                    '_method' : "DELETE"
	                }			                    
                }).done(function(data) {
                	if(data.result =="ok") {
                		messageOfSuccess();	
                		location.href = data.redirecturl;
                	}
                });

		     });
			    
			e.preventDefault(); 
		});		
	}	
	
	$(".numberfilter").keydown(function (e) {
        // Allow: backspace, delete, tab, escape and enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            // Allow: Ctrl+V, Command+V
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl+C, Command+C
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl+X, Command+X
            (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
	// Control Sidebar (right sidebar)
	$('.sidebar-close').on('click', function(e) {
		controlSidebarToggle(false);
		e.preventDefault();
	});
	$('#navprofile').on('click', function(e) {

		if(isSidebarOpen()) {
			if ( $('.control-sidebar .profile').css('display') == 'none' ){
				controlSidebarCollapse();
				controlSidebarShow();
				$('.control-sidebar .profile').show();
			}			
		} else {
			controlSidebarShow();
			$('.control-sidebar .profile').show();
		}
		e.preventDefault();
	});		
	$('#navsearch').on('click', function(e) {

		if(isSidebarOpen()) {
			if ( $('.control-sidebar .search').css('display') == 'none' ){
				controlSidebarCollapse();
				controlSidebarShow();
				$('.control-sidebar .search').show();
				$('#searchFT').focus();
			}			
		} else {
			controlSidebarShow();
			$('.control-sidebar .search').show();
			$('#searchFT').focus();
		}
		e.preventDefault();
	});
	$('.right-toggler').on('click', function(e) {

		if(isSidebarOpen()) {
			if ( $('.control-sidebar .cardcontent').css('display') == 'none' ){
				controlSidebarCollapse();
				controlSidebarShow();
				$('.control-sidebar .cardcontent').show();
			}			
		} else {
			controlSidebarShow();
			$('.control-sidebar .cardcontent').show();
		}
		e.preventDefault();
	});
		
	initSearch();
	
	
});

function initSearch() {
	 
	$(document).on("click", '#global-search-btn', function(e) {
	    
		searchFT();	    
	    e.preventDefault();
	});
	
	
	// disable form submit on keypress to prevent form from being submitted twice (keypress + keyup).
	$('#searchFT').on('keypress', function(e) {
	    return e.which !== 13;
	});
	
	$('#searchFT').keyup(function(e) {		
		
	    if (e.which == '13') {
	    	searchFT();	    	
	    }
	    e.preventDefault();
	});
	
}

function searchFT() { 

	var search=$("#searchFT").val();
	
	var form = $('<form/>', {
        action: DBPath+'/xsp/start/',
        method: "GET"
    });
    form.append($('<input/>', {
    	type: 'hidden',
    	name: 'query',
    	value: encodeURIComponent(search)
    })); 
    form.appendTo('body').submit();

	//var url = DBPath+'/xsp/start/?query=' + search;
	//console.log(search);
	//window.location.replace(url);				
}

function messageOfSuccess() {
	
	if ($('.message-icon-loader').length > 0) {
		$('.message-icon-loader').hide();
	}
	
	var message = $('<div class="floating-message text-center icon-success " style="display: none;">');
    message.append('<i class="far fa-check-circle"></i>');
    message.appendTo($('body')).fadeIn(200).delay(300).fadeOut(200);		
}

function messageOfError() {

	if ($('.message-icon-loader').length > 0) {
		$('.message-icon-loader').hide();
	}

	var message = $('<div class="floating-message text-center icon-error " style="display: none;">');
	message.append('<i class="far fa-remove-circle"></i>');
	message.appendTo($('body')).fadeIn(200).delay(300).fadeOut(200);		
}

function messageOfLoading() {
	var message = $('<div class="floating-message text-center icon-loader ">');
    message.append('<i class="fas fa-spinner fa-spin"></i>');
    message.appendTo($('body')).show();		
}
function unloadMessageOfLoading() {
	$('.icon-loader').hide();
}

function controlSidebarCollapse(){
    // Collapse the control sidebar
	  $('.control-sidebar .sidebar-content').hide();
    $('body').removeClass('control-sidebar-slide-open');
}
function controlSidebarShow(){
    // Show the control sidebar
	  $('.control-sidebar .sidebar-content').hide();
    $('body').addClass('control-sidebar-slide-open');
}
function controlSidebarToggle(){
		var isOpen = isSidebarOpen();
		if (isOpen) {	
			controlSidebarCollapse();
		} else {
			controlSidebarShow();
		}                
}
function isSidebarOpen() {
	return $('body').hasClass('control-sidebar-slide-open');
}



