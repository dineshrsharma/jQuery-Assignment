var i = 1; // Incremental Global Var for changing the Radio buttons groupName

var aInputs = {
	"Text Box": "<input type='text'/>",
	"Radio": "<input type='radio' name='' value='yes' checked/>Yes<input type='radio' name='' value='no'/>No",
	"Select Box": "<select name='cars'><option value=''></option><option value='yes'>Yes</option><option value='no'>No</option></select>",
	"Check Box": "<input type='checkbox' name='checkbox' value='checkbox'/>",
	"Text Area": "<textarea name='message' rows='2'/>",
	"Auto Complete": "<input type='text' autocomplete='on'/>"
}; //Array of all HTML elements with their input html code

/**
 * Adds an element. This function is called whenever user check the checkbox.
 * @param element
 */
var addCheckedInputs = function (element) {
	element.siblings("div").find("span").text(1);
	var sValue = element.val();
	var sType = element.attr('id');
	var sContent = aInputs[sValue];
	if ($.trim($('#rightTopPane').html()) == '' || $("#rightTopPane").children("[id='" + sValue + "']").length == 0) {
		$('#rightTopPane').children('div.noneSelected').css('display', 'none');
		var newRightTopEle = $("<div class='grey font-12' id='" + sValue + "'>" + sValue + "<div class='grey font-12 inline'>(<span class='count'>1</span>)</div><img class='icon delete' src='../icons/delete.png'/></div>");
		$('#rightTopPane').append(newRightTopEle);
	}
	if ($.trim($('table').html()) == '') {
		var newRightBottomEle = $("<thead id='rightBottomHeader'><th>What is added</th><th colspan='2'>HTML Element</th></thead><tbody></tbody>");
		$('table').append(newRightBottomEle);
	}

	if (sValue === 'Radio')
		sContent = changeRadioName(sContent);

	$("tbody").append("<tr id='" + sValue + "'><td>" + sValue + "</td><td>" + sContent + "</td><td><img class='icon add' src='../icons/add.png'><img class='icon remove' src='../icons/remove.png'></td></tr>");

	$('#rightTopPane').css('display', 'block');
	$('#rightBottomPane').css('display', 'block');
};

/**
 * Removes all elements from RightTop & RightBottom on Unchecking Checkbox. This function is called whenever user uncheck the checkbox.
 * @param
 */
var removeUncheckedInputs = function (element) {
	element.siblings("div").find("span").text(0);
	var sValue = element.val();
	var sType = element.attr('id');

	if (($("#rightTopPane").has("[id='" + sValue + "']").length)) {
		$("#rightTopPane").children("[id='" + sValue + "']").remove();
	}

	chechNoneSelection();
	hidePane();

	if ($("tbody").has("[id='" + sValue + "']").length)
		$("tbody").children("[id='" + sValue + "']").remove();
};

/**
 * Verify whenther "None selected" text is to be displayed or not
 */
var chechNoneSelection = function () {
	if ($('#rightTopPane').children().not("div.noneSelected").length == 0) {
		$('table').empty();
		showNoneSelect();
	}
};

/**
 * Hides the pane
 */
var hidePane = function () {
	if ($("#rightTopPane").children().length == 0) {
		$("#rightTopPane").css('display', 'none');
		$('#rightBottomPane').css('display', 'none');
	}
}

/**
 * Clears all
 */
var clearAll = function () {
	$('table').empty();
	$(".count").text(0);
	$('#rightTopPane').children().not("div.noneSelected").remove();
	showNoneSelect()
	$("#searchFacet").val("");
	$('#inputTypesList>li').show();
};

/**
 * Display None Selected text in RightTop pane
 */
var showNoneSelect = function () {
	$('#rightTopPane').children('div.noneSelected').css('display', '');
};


/**
 * Sets the width & height of the body
 */
var setBodyWidth = function () {
	$('body').css('width', $(document).width() - 10);
};

/**
 * Clones an element & update the counts
 * @param element
 */
var clone = function (element) {
	var sValue = element.attr('id');
	var input = aInputs[element.attr('id')];
	if (sValue === 'Radio') {
		input = changeRadioName(input);
		//input = input.replace(/name=''/g, "name='" + i + "'");
		//i++;
	}
	var text = "<tr id='" + sValue + "'><td>" + sValue + "</td><td>" + input + "</td><td><img class='icon add' src='../icons/add.png'><img class='icon remove' src='../icons/remove.png'></td></tr>"
	element.parent().append(text);
	updateCounter(element.attr('id'), 1);
};

/**
 * Changes the group name of Radio button
 * @param str
 * @returns {XML|string|void}
 */
var changeRadioName = function (str) {
	return str.replace(/name=''/g, "name='" + i++ + "'");
};

/**
 * Updates the leftPane & RightTop counts
 * @param id
 * @param value
 */
var updateCounter = function (id, value) {
	var leftPaneCounterElement = $("li[title='" + id + "']").find(".count");
	leftPaneCounterElement.text(+leftPaneCounterElement.text() + value);

	var rightTopCounterElement = $("#rightTopPane").children("div[id='" + id + "']").find(".count");
	rightTopCounterElement.text(+rightTopCounterElement.text() + value);
};

/**
 * Update the LeftPane & RightTopPane elements
 * @param id
 */
var updateSelection = function (id) {
	if (!$("table").find("tr[id='" + id + "']").length) {
		updateLeftPane(id);
		$("#rightTopPane").children("div[id='" + id + "']").remove();
	}

	if (!$("tbody").children().length) {
		$("table").empty();
	}
	hidePane();
	chechNoneSelection();
};

/**
 * Updates the LeftPane elements
 * @param id
 */
var updateLeftPane = function (id) {
	$("#inputTypesList").find("input[value='" + id + "']").attr('checked', false);
};

/**
 * Updates the RightBottom Pane
 * @param id
 */
var updateRightBottomPane = function (id) {
	console.log($("table>tbody").find("tr[id='" + id + "']"));
	$("table>tbody").find("tr[id='" + id + "']").remove();
};

/**
 * Resets the count of elements
 * @param id
 */
var resetCount = function (id) {
	$("#inputTypesList").find("li[title='" + id + "']>div>span").text(0);
};

$(document).ready(function () {

	setBodyWidth();

	$(window).resize(function () {
		setBodyWidth();
	});

	$('#searchFacet').keyup(function () {
		var valThis = $(this).val().toLowerCase();
		$('#inputTypesList>li').each(function () {
			var text = $(this).attr('title').toLowerCase();
			(text.indexOf(valThis) > -1) ? $(this).show() : $(this).hide();
		});
	});

	$('#leftPane input:checkbox').change(function () {
		var isChecked = $(this).is(':checked');
		if (isChecked)
			addCheckedInputs($(this));
		else
			removeUncheckedInputs($(this));
	}
	);

	$("#clearSelected").click(function () {
		$("#inputTypesList input:checkbox").removeAttr('checked');
		clearAll();
	});

	$("img.collapse").click(function () {
		if ($(this).attr('src') == '../icons/collapse.png') {
			$(this).attr({
				src: "../icons/expand.png",
				title: "Expand elements"
			});
		} else {
			$(this).attr({
				src: "../icons/collapse.png",
				title: "Collapse elements"
			});
		}
		$("#searchArea").slideToggle();
	});

	$("table").on("click", 'img.add', function () {
		clone($(this).closest("tr"));
	});

	$("table").on("click", 'img.remove', function () {
		var trElement = $(this).closest("tr");
		var id = trElement.attr("id");
		updateCounter(id, -1);
		trElement.remove();
		updateSelection(id);
	});

	$("#rightTopPane").on("click", "img.delete", function () {
		var divElement = $(this).closest("div");
		var id = divElement.attr("id");
		updateLeftPane(id);
		updateRightBottomPane(id);
		divElement.remove();
		chechNoneSelection();
		resetCount(id);
		hidePane();
	});

});