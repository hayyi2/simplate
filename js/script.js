var height_topnav = 50;
var height_footer = 36 + 1;
function set_auto_height() {
	var height_window = window.innerHeight;
	document.getElementsByClassName('auto-height')[0].style.minHeight = (height_window - height_topnav - height_footer)+"px";
}
document.onreadystatechange = function(e) {
	if (document.readyState === 'interactive') {
		set_auto_height();
	}
};
// $(document).on("click","body [data-toggle=collapse]",function() {
// 	if ($('body').hasClass('active-sidenav')) {
// 		$('body').removeClass('active-sidenav');
// 		document.cookie="sidenav=nonactive";
// 	}else{
// 		$('body').addClass('active-sidenav');
// 		document.cookie="sidenav=active";
// 	}
// });
$(window).resize(function(){
	set_auto_height();
});

$(function() {
	// datatables
	try {
		$('.datatables').DataTable();
		$('.datatables-noorder-first-last').DataTable({
			columnDefs: [
			{ orderable: false, targets: [-1, 0] }
			],
		});
		$('.datatables-noorder-last').DataTable({
			columnDefs: [
			{ orderable: false, targets: -1 }
			]
		});
	}catch(err) {
		console.log(err.message);
	}
	// bs-custom-file-input
	try {
		bsCustomFileInput.init();
	}catch(err) {
		console.log(err.message);
	}

	// bootstrap-select
	// $('.selectpicker').selectpicker();
	
	// tinymce
	var tinymce_option = {
		mini: {
			height: 100,
			menubar:false,
			toolbar1: 'undo redo | styleselect | bold underline italic | bullist numlist | outdent indent | table | link unlink | filemanager image | forecolor backcolor | code',
		}, 
		full: {
			height: 200,
			toolbar1: 'undo redo | styleselect | bold underline italic | bullist numlist | outdent indent | table | link unlink | filemanager image | forecolor backcolor | code',
			image_advtab: true,
		}
	};
	var base_url = $('base').attr('href');
	var tinymce_css = [base_url + "css/bootstrap.min.css"];
	// var tinymce_css = [base_url + "http://project/template/dashmaster/css/bootstrap.min.css"];
	$('[tinymce]').each(function() {
		var el = $(this);
		var options = {
			selector: '#' + el.attr('id'),
			convert_urls: false,
			elementpath: true,
			relative_urls: true,
			document_base_url : base_url,
			theme: 'modern',
			skin : 'kopiskin',
			plugins: [
				"autolink link image imagetools lists advlist charmap print preview hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
				"table contextmenu directionality emoticons paste textcolor code"
			],
			content_style: "@import '" + tinymce_css.join("'; @import '") + "';  body{ margin: .5rem 1rem; }",
		};
		jQuery.extend(options, tinymce_option[el.attr('tinymce')]);
		if (el.attr('tinymce-height') != undefined) {
			options.height = el.attr('tinymce-height');
			console.log(el.attr('tinymce-height'));
		}
		tinymce.init(options);
	});
});