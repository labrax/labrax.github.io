---
layout: single
title:  "SQL data transformation"
date:   2020-11-12 23:00:00 +0100
categories: 
 - data science
tags: 
 - sql 
 - data 
 - ETL
---
SQL data transformation can be hard sometimes.

I needed to make the passage of SQL data from a production format to development format.

In the database were different data sources, with different formats, versions and data coverage.

The transformation was done in SQL using {% highlight code %} common table expression {% endhighlight %}.

At one of the data sources the transformation "failed", as in the SQL block didn't return anything and there were no notifications, warnings or information monitored.

This data source was not discovered as missing until later on when processed data were compared.

Take care to check the numbers, before and after. Check if the cases have passed through the different transformations.

Not only passing the data is important, but verifying if they have the same format in the different stages. Compiling samples, ranges of values and other summary statistics do wonders.
