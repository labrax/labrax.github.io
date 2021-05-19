---
layout: single
title:  "Lived life percentage"
date:   2021-05-17 20:00:00 +0100
categories: 
 - philosophy
---
This last year with COVID-19 made many people think about their lifes.

And for me it was not different.

I sometimes wonder about the last *N* months, and how much it was over my lived life, and on the overall scale of how much I expect to live.

![overall perspective chart](/assets/2021-05-17-life-percent/20210517_figure_overall_last_year.png)

Figure: Perspective over the whole life. In orange what percentage of the life over the last year, in grey the percentage over the expected lifetime.

Not only when you are younger you have many new experiences, these experiences account for most of your life. 
Any year lived will still account for the same overall percentage, but they account for more of your life when you are younger.

Thinking of the 4 years when I did my PhD, they accounted for about 14% of my life up to that stage.
And they are expected to count for about 5% of my life!

That is quite an amount of time!

**The calculator:**
<form>
	<div style="float:left;">
		<label for="age_years">Your age (years):</label>
		<input type="number" id="age_years" name="age_years" value="28" onchange="update_model()">
		<label for="age_months">Months (optional):</label>
		<input type="number" id="age_months" name="age_months" value="0" onchange="update_model()">
	</div>
	
	<div style="float:right;">
		<label for="period_years">Period of interest (years):</label>
		<input type="number" id="period_years" name="period_years" value="4" onchange="update_model()">
		<label for="period_months">Months (optional):</label>
		<input type="number" id="period_months" name="period_months" value="0" onchange="update_model()">
	</div>
	<div style="clear:both;">&nbsp;</div>
		
	<div style="float:left;">
		<label for="expectancy_years">Life expectancy (years):</label>
		<input type="number" id="expectancy_years" name="expectancy_years" value="75" onchange="update_model()">
	</div>  
	<div style="clear:both;">&nbsp;</div>
	
	<hr>
	
	<div style="float:left;">
		<label for="percent_until_now">Percentage until now</label>
		<input type="text" id="percent_until_now" name="percent_until_now" disabled>
		<label for="percent_lifetime">Percentage over lifetime</label>
		<input type="text" id="percent_lifetime" name="percent_lifetime" disabled>
	</div>
	<div style="clear:both;">&nbsp;</div>
</form>

<script type="text/javascript">
    function update_model() {
		var current = (parseFloat(document.getElementById("age_years").value) || 0) * 12 + (parseFloat(document.getElementById("age_months").value) || 0);
		var interest = (parseFloat(document.getElementById("period_years").value) || 0) * 12 + (parseFloat(document.getElementById("period_months").value) || 0);
		var expectancy = (parseFloat(document.getElementById("expectancy_years").value) || 0) * 12;
				
		document.getElementById("percent_until_now").value = ( Math.round(interest/current * 10000)/100 ) + "%";
		document.getElementById("percent_lifetime").value = ( Math.round(interest/expectancy * 10000)/100 ) + "%";
    }
	update_model();
</script>
