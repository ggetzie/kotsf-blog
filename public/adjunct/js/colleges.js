var adjs = []
// var name_index = {}
var DATA_WIDTH = 40
var headings = {rank: {title: "US News Rank",
		       sort_val: sortRank,
		       width: DATA_WIDTH},

		school_name: {title: "School Name",
			      sort_val: function(x) {return x;},
			      width: 200},

		location: {title: "Location",
			   sort_val: function (x) {return x;},
			   width: 80},

		tuition: {title: "Tuition",
			  sort_val: sortTuition,
			  width: 80},

		enrollment: {title: "Enrollment",
			     sort_val: sortMixed,
			     width: 60},

		percent_of_faculty_who_are_full_time: 
		{title: "% Faculty who are full-time",
		 sort_val: sortMixed,
		 width: 100},

		value: {title: "Professors per $",
			sort_val: sortMixed,
			width: DATA_WIDTH},

		in_state_value: {title: "Professors per $ (in-state)",
				 sort_val: sortMixed,
				 width: DATA_WIDTH},

		financial_resources_rank: {title: "Financial Resources Rank",
					   sort_val: sortMixedRank,
					   width: DATA_WIDTH},

		predicted_graduation_rate: {title: "Graduation Rate",
					    sort_val: sortMixed,
					    width: DATA_WIDTH},

		faculty_resources_rank: {title: "Faculty Resources Rank",
					 sort_val: sortMixedRank,
					 width: DATA_WIDTH},

		high_school_counselor_score_out_of_5: 
		{title: "High School Counselor Score (of out 5)",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		average_freshman_retention_rate: 
		{title: "Average Freshman Retention Rate",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		graduation_and_retention_rank: 
		{title: "Graduation and Retention Rank",
		 sort_val: sortMixedRank,
		 width: DATA_WIDTH},

		student_selectivity_rank: {title: "Student Selectivity Rank",
					   sort_val: sortMixedRank,
					   width: DATA_WIDTH},

		satact_25th_75th_percentile: 
		{title: "SAT / ACT 25th - 75th Percentile",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		freshmen_in_top_10_percent_of_high_school_class: 
		{title: "Freshman in top 10% of high school class",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		classes_with_50_or_more_students: 
		{title: "% Classes with 50 or more Students",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		six_year_graduation_rate: {title: "6 year Graduation Rate",
					   sort_val: sortMixed,
					   width: DATA_WIDTH},

		classes_with_fewer_than_20_students: 
		{title: "% Classes with fewer than 20 students",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		student_faculty_ratio: {title: "Student:Faculty Ratio",
					sort_val: sortMixedRank,
					width: DATA_WIDTH},

		alumni_giving_rank: {title: "Alumni Giving Rank",
				     sort_val: sortMixedRank,
				     width: DATA_WIDTH},

		peer_assessment_score_out_of_5: 
		{title: "Peer Assessment Score (out of 5)",
		 sort_val: sortMixedRank,
		 width: DATA_WIDTH},

		freshmen_in_top_25_percent_of_high_school_class: 
		{title: "Freshmen in top 25% of high school class",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		overperformanceunderperformance: 
		{title: "Over-performance / Under-performance",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		fall_2013_acceptance_rate: {title: "Fall 2013 Acceptance Rate",
					    sort_val: sortMixed,
					    width: DATA_WIDTH},

		average_alumni_giving_rate: 
		{title: "Average Alumni Giving Rate",
		 sort_val: sortMixed,
		 width: DATA_WIDTH},

		url: {title: "US News url",
		      sort_val: sortMixed,
		      width: DATA_WIDTH},
	       };

var rev_headings =  reverseHeadings(headings);

function sortMixed(x) {
    val = parseFloat(x)
    if (isNaN(val)) {
	return -9999;
    } else {
	return val;
    }
};


function sortMixedRank(x) {
    val = parseFloat(x)
    if (isNaN(val)) {
	return 9999;
    } else {
	return val;
    }
};


function sortRank(x) {
    var numRE = /\d+/

    if (x.includes("RNP")) {
	return 9998;
    } else if (x.includes("Unranked")) {
	return 9999;
    } else if (x[0] == '#') {
	return parseInt(numRE.exec(x));
    }
    else {
	return x
    }
};


function sortTuition(x, state) {
    // tuitions are either a single number in currency format
    // or in the format "in-state: $##,###, out-of-state: $##,###"
    // for state schools, sort by the out of state tuition
    // by default or change parameter "state" to 0 to sort by in-state
    // If tuition info is missing, put that below (lower value)
    // all other schools

    // default value of state is 1 (returns out of state tuition)
    state = typeof state !== 'undefined' ? state : 1;
    
    // remove commas and dollar signs
    clean = x.replace(/[\,\$]/g, '');
    
    // extract tuition numbers
    tstrs = clean.match(/\d+/g);
    tints = []
    for (t in tstrs) {
	tints.push(parseInt(tstrs[t]));
    }

    if (tints.length == 0) {
	// non numerical value such as "N/A"
	return -9999999;
    } else if (tints.length == 1) {
	// private school, only one tuiton value
	return tints[0]
    } else {
	// if in the expected format regex
	// will put in-state tuition first
	// and out of state second
	return tints[state]
    }
};
    

function reverseHeadings(obj) {
    // map from printable version of heading name
    // to field name
    result = {}
    for (k in obj) {
	result[obj[k].title] = k
    }
    return result
}


function parseNums(element) {
    for (prop in element) {
	if (prop === 'satact_25th_75th_percentile' ||
	   prop === 'student_faculty_ratio') { continue;};
	if (!isNaN(parseFloat(element[prop]))) {
	    element[prop] = parseFloat(element[prop]);
	}
    }
};

function setUp() {
    // Use the headings as labels for checkboxes
    var labels = [];
    for (k in headings) {
	if (k != 'url' && k != 'school_name' && k != 'rank') {
	    labels.push(headings[k].title);
	}
    }
    checkboxes(labels);

    showData($("#data_choices").val());
};

function showData(datafile) {
    d3.csv(datafile, function(data){

	// copy data to global variable
	adjs = data;
	
	// convert string numbers to floats
	// calculate professors per tuition dollar
	adjs.forEach(function (element, index, array) {
	    parseNums(element);
	    
	    // sometimes column header remains starting with
	    // number 6 instead of word six, not sure why
	    // fix that if necessary
	    var sixyrgr = element["6_year_graduation_rate"];
	    if (typeof sixyrgr !== "undefined") {
		element["six_year_graduation_rate"] = sixyrgr;
	    }
	    
	    var enrollment = element.enrollment
	    var sfr = parseFloat(element.student_faculty_ratio)
	    var ftf = element.percent_of_faculty_who_are_full_time / 100
	    var tuition = sortTuition(element.tuition)
	    if (isNaN(sfr) || 
		isNaN(enrollment) || 
		isNaN(ftf) ||
		isNaN(tuition)) {
		element.value = 'N/A'
		element.in_state_value = 'N/A'
	    } else {
		// calculate professors per dollar
		var oos_ppd = ((enrollment / sfr) * ftf) / tuition
		var is_tuition = sortTuition(element.tuition, 0)
		var is_ppd = ((enrollment / sfr) * ftf) / is_tuition
		element.value = oos_ppd.toFixed(2)
		element.in_state_value = is_ppd.toFixed(2)
	    }

	});

	// index by school name - don't need this right now
	// adjs.forEach(function (x) { name_index[x['school_name']] = x});

	// sort in descending order of first selected column
	var first_col = rev_headings[$("input:checked").parent().eq(0).text()];
	sortBy(first_col, -1);

	var ctable = tabulate(adjs)
	
    });
}

function tabulate(colleges) {
    checked = $(".column_check:checked:enabled")
    cols = ['rank', 'school_name']
    checked.each(function () {
	label_text = $('label[for=' + this.id + ']').text()
	cols.push(rev_headings[label_text])
    });

    $('table#data').remove();
	
    var table = d3.select("body").append("table"),
    thead = table.append("thead"),
    tbody = table.append("tbody");

    table.attr("id", "data")
    thead.append("tr").selectAll("th")
	.data(cols).enter().append("th")
	.text(function(column) { 
	    return headings[column].title; })
	.attr("onClick", function(column) { 
	    return "sortBy('" + column + "', 1);"})
	.attr("id", function(column) {
	    return "head_" + column;})
	.attr("class", function(column) {
	    return column + "_col"})
	.attr("style", function (column) {
	    var width = headings[column].width;
	    return "width: " + width + "px";});

    var rows = tbody.selectAll("tr")
	.data(colleges)
	.enter()
	.append("tr");

    var cells = rows.selectAll("td")
	.data(function (row) {
	    return cols.map(function(column) {
		return { column: column, 
			 value: row[column]};
	    });
	})
	.enter()
	.append("td")
	.html(function (d) {
	    return d.value; })
	.attr("class", function (d) {
	    return d.column + "_col"})
	.attr("style", function (d) {
	    var width = headings[d.column].width;
	    return "width: " + width + "px";});

    return table;
}


function checkboxes(labels) {
    // create a checkbox for each column
    var checks = d3.select("#checkboxes").selectAll("span")
	.data(labels).enter()
//	.append('span')
//	.attr('class', 'cb')
    	.append('label')
	.text(function (d) { return d; })
	.attr("for", function(d, i) { return 'cb' + i })
	.append("input")
	.attr("type", "checkbox")
	.attr("id", function (d,i) { return 'cb' + i })
	.attr("class", "column_check")
	.on("change", function () {
	    tabulate(adjs);
	    styleChecks();
	})
    // initially display only percent full time faculty column
	.property('checked', function(d) { 
	    return d == "% Faculty who are full-time";
	});
    
    // set background and border style based on whether checkbox is
    // selected
    styleChecks();
};

function styleChecks() {
    $("input:checked").parent()
	.css("background-color", "#5FDA81")
	.css("border", "2px solid black");

    $("input:checkbox:not(:checked)").parent()
	.css("background-color", "#FFFFFF")
    	.css("border", "1px dotted black");
};

function clearChecks() {
    // unselect all checkboxes
    $("input:checked").prop("checked", false);
    styleChecks();
    tabulate(adjs);
};

function sortBy(col, direction) {
    // direction = 1 for ascending sort
    // direction = -1 for descending sort
    adjs.sort(function (a, b) {
	var keyA = headings[col].sort_val(a[col]);
	var keyB = headings[col].sort_val(b[col]);
	if (keyA < keyB) {
	    return -1*direction;
	} else if (keyA > keyB) {
	    return 1*direction;
	} else {
	    return 0;
	}});
    tabulate(adjs);
    $("#head_" + col).attr("onClick", 
			   "sortBy('" + col +"', " + direction * -1 + ");");
};
    

