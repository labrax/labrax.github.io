---
layout: single
title:  "Mini database course"
date:   2019-12-02 20:00:00 +0100
categories: 
 - data science
tags: 
 - database
 - course
 - sql
---
A mini-course on databases.

## Motivation

Many of our daily activities use different database systems somewhere. 
When we go to the bank there is a system that stores your credit information, and updates as you use it; when we search for a book in a library there is a system that stores all the media available; when we register for an event online, make a phone call or our heart beat (smartwatch/healthband users), there is a storage system, a database system somewhere storing this information.

And today even more. 
In times like these, you have big data, petabytes and petabytes of data and the data lakes.
Organization storing data in scales never seen before, and using it as an essential part of their businesses.

Before we go any deeper, if you feel like exploring more about databases, there is a great book that is focused on traditional databases: Fundamentals of Database Systems - Ramez Elmasri. And this is the book that I used as a reference for this material.

In the book (page 4) they define databases: *A database is a collection of related data*. And furthermore, data are *facts that can be recorded and that have implicit meaning*. 
Databases have a **universe of discourse** that it is about, there should be some structure (even minimal) and a **purpose** to it.

**In summary:** Companies need databases. Databases store data. The data are facts. These facts should have some structure. {: .notice--info}

## Index

1. [Motivation/background](#motivation)
2. [Setup Instructions](#setup-instructions)
3. [Databases](#databases)
4. [Exercises](#exercises)
5. [References](#references)

## Setup instructions

There are two required files to the practical part of this lecture. Download both DBeaver and the Chinook database.

### DBeaver
This is a browser for SQL databases. It supports different types.

1.	Go to: [https://dbeaver.io/download/](https://dbeaver.io/download/)
2.	Identify your operating system and obtain the compressed (standalone) version.
3.	Move the file to a folder and unzip.
4.	Check if the executable works. If not (i.e. missing Java), you’ll need to download the installer version.

![Downloading DBeaver](/assets/2019-12-02-mini-db-course/dbeaver_download.png)
Figure: Downloading DBeaver

### Chinook
This is a sample SQL database. It will provide us with a sandbox for testing different commands.
1.	Go to the GitHub repository: [https://github.com/lerocha/chinook-database/blob/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite](https://github.com/lerocha/chinook-database/blob/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite).
2.	Click on Download.

Chinook license is available [here](https://github.com/lerocha/chinook-database/blob/master/LICENSE.md).

![Downloading Chinook database](/assets/2019-12-02-mini-db-course/chinook_download.png)
Figure: Downloading Chinook database
 
### Opening the database
1.	Open DBeaver executable. You should have DBeaver as Figure 3.
2.	Click Database: New Database Connection.
3.	Search for SQLite. Next.
4.	Browse for the Chinook_Sqlite.sqlite file. Finish.
5.	On the left side panel click on the arrow to expand information about the database.
6.	Download required drivers (if prompted by DBeaver).
7.	Click to expand the Tables information you should have something like Figure 4.

![Main view of dbeaver](/assets/2019-12-02-mini-db-course/dbeaver_main.png)
Figure: Main view of dbeaver

![Creating new connection](/assets/2019-12-02-mini-db-course/1_connection.png)
Figure: Create new connection.

![SQLite setup](/assets/2019-12-02-mini-db-course/2_connect_to_db.png)
Figure: Choosing SQLite

![Connecting to database](/assets/2019-12-02-mini-db-course/3_connect_to_db.png)
Figure: Conecting to database

![After opening the file](/assets/2019-12-02-mini-db-course/dbeaver_open.png)
Figure: After opening the file

## Databases

### Evolution of databases

Data have always been stored, either in the mind of people, or in different physical structures. The evolution of databases can be illustrated as:

- Paper and pencil systems, folders and files organized into cabinets
  - Pros: good for small scale
  - Cons: hard to maintain with big scale
- Spreadsheets
  - Pros: good for small scale
  - Cons: difficult to share access with others
- Relational database systems
  - Pros: good for big scale
  - Cons: require Structured Query Language (SQL) knowledge
- NoSQL: other than tabular
  - Pros: provide more options to database structure
  - Cons: require more specialized knowledge

Although NoSQL was inspired from relational databases they are not necessarily better for all scenarios. NoSQL allow a flexible abstraction of storage, while there could be a trade-off on consistency and reliability.

**In summary:** There are many database systems, with different advantages and disadvantages {: .notice--info}

### Relational database systems

It is a term invented in 1970 by Edgar F. Codd.

It stands for a system that contains multiple tables, and data points that are related one-another.
For the time being, think of it as an excel file.

![Excel DB PCA](/assets/2019-12-02-mini-db-course/20191202_DB_clinical_sample_pca.png) ![Excel DB Patient](/assets/2019-12-02-mini-db-course/20191202_DB_clinical_sample_visits.png)

There are many relational database variants:
- PostgreSQL
- MySQL
- MariaDB
- Microsoft SQL
- SQLite
- ...

Some commands function in all of them. If not there are workarounds.

### Understanding the Chinook database

![Excel DB PCA](/assets/2019-12-02-mini-db-course/20191202_chinook_schema.png)
Source: http://schemaspy.org/sample/relationships.html

In the figure, only different **tables**, "spreadsheets", and links between them are shown.

For example, table **Employee**, which contains data about employees, has data associated with an **EmployeeId**, and each employee has a person that they respond to (**ReportsTo**).
Each customer, in **Customer** table, has an associated employee representative (**SupportRepId**), and from the **Invoice** table there is a linked **CustomerId**.

#### Opening the database

- Open DBeaver and the Chinook database. [Instructions here](#setup-instructions).
- Click around DBeaver, open different parts and see what happens.

Your goal: Explore the different tables, check the columns available, identify unique keys, foreign keys, indexes and references. Double-click some tables.

Identify some information:
- Table Album: Data Type for column Title.
- Table Track: Related tables.

Right click on table Employee: Read data in SQL console.
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
FROM Employee
{% endhighlight %}

**SELECT** is the keyword to tell the program to return data. **FROM** indicates the table they are coming frm.

In SQL the keywords are not case-sensitive. **SELECT** is as valid as **select** or **SeLeCt**.

In this section we will go through some examples and see how to get some data from SQL.

When you want to see all the columns without listing them you can use a wildcard:
{% highlight sql %}
SELECT *
FROM Employee
{% endhighlight %}

View only a few columns specifying their names:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate
FROM Employee
{% endhighlight %}

Filter the results you can use the **where** keyword:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate
FROM Employee
WHERE Title = 'IT Staff'
{% endhighlight %}

Filter text using a pattern, **like** is the keyword for it, complement with text with **%** on where it can be expanded:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate
FROM Employee
WHERE Title LIKE '%Sales%'
{% endhighlight %}

Filter using a date, **>** will probe elements where **HireDate** is greater than the '2002-10-10' given:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
FROM Employee
WHERE HireDate > '2002-10-10'
{% endhighlight %}

Filter using missing values:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
FROM Employee
WHERE ReportsTo IS NULL
{% endhighlight %}

Filter using existing values:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
FROM Employee
WHERE ReportsTo IS NOT NULL
{% endhighlight %}

Filter using multiple conditions (exclusive), if this **AND** something else is valid:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
FROM Employee
WHERE HireDate > '2002-10-10' AND Title LIKE 'IT%'
{% endhighlight %}

Filter using multiple conditions (inclusive), if this **OR** another conditions is valid:
{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
FROM Employee
WHERE HireDate > '2002-10-10' OR Title LIKE 'IT%'
{% endhighlight %}

Aggregate functions, **min** returns the smallest and **max** the highest value:
{% highlight sql %}
SELECT MIN(BirthDate), MAX(BirthDate)
FROM Employee
{% endhighlight %}

Other aggregate functions are: **AVG**, **COUNT**, **SUM**

Count the number of elements:
{% highlight sql %}
SELECT COUNT(CustomerId)
FROM Invoice;
{% endhighlight %}

Count the number of unique elements, **DISTINCT** is the keyword:
{% highlight sql %}
SELECT COUNT(DISTINCT CustomerId)
FROM Invoice;
{% endhighlight %}

Filter based on a built-in function:
{% highlight sql %}
SELECT City
FROM Customer
WHERE LENGTH(City) > 10
{% endhighlight %}

More functions in: [https://www.sqlite.org/lang_corefunc.html](https://www.sqlite.org/lang_corefunc.html).

Returned columns can have aliases using **AS** will change the name of the returned column:
{% highlight sql %}
SELECT MIN(BirthDate) AS min_birth_date, MAX(BirthDate) AS max_birth_date
FROM Employee
{% endhighlight %}

Collect unique values after filtering:
{% highlight sql %}
SELECT DISTINCT City
FROM Customer
WHERE LENGTH(City) > 10
{% endhighlight %}

### How queries work

- A query starts in the **FROM** term
- After it is filtered with the **WHERE** conditions
- Some columns are returned in the **SELECT** part

{% highlight sql %}
SELECT EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email
FROM Employee
WHERE HireDate > '2002-10-10'
{% endhighlight %}

### Obtaining data from multiple tables

- Tables normally contain specific information about a thing
- Querying information across tables provides more information
- An example, table Customer: for a each customer there is an associated employee number

![Foreign keys](/assets/2019-12-02-mini-db-course/20191202_foreign_key.png)

There are different types of relations
- 1-1 relations: 
  - One employee has only one supervisor (if it is not the big boss!)
  - One track has only a genre in this database

{% highlight sql %}
SELECT TrackId, GenreId
FROM Track
{% endhighlight %}

- 1-Many relations:
  - One employee supports multiple customers

{% highlight sql %}
SELECT CustomerId, SupportRepId
FROM Customer
{% endhighlight %}

- N-M relations:
  - Multiple from one side to multiple in the other side

{% highlight sql %}
SELECT PlaylistId, TrackId
FROM PlaylistTrack
WHERE TrackId = 100
{% endhighlight %}

{% highlight sql %}
SELECT PlaylistId, TrackId
FROM PlaylistTrack
WHERE PlaylistId = 1
{% endhighlight %}

The relationships come from the foreign keys and references.

There are many ways to get the tables together.

![Table relationships](/assets/2019-12-02-mini-db-course/20191202_table_rel.png)

**LEFT JOIN**: get all from the left, extras from the right side
![Table relationships](/assets/2019-12-02-mini-db-course/20191202_table_rel_left_join.png)

{% highlight sql %}
SELECT staff.FirstName, staff.Title, staff.ReportsTo, supervisor.EmployeeId, supervisor.FirstName, supervisor.Title
FROM Employee staff
LEFT JOIN Employee supervisor ON staff.ReportsTo = supervisor.EmployeeId
{% endhighlight %}

All the records on the *LEFT* side, extra columns from the *RIGHT* side if data is there.

A similar operation can be done on the other way around using **RIGHT JOIN**. All the data from the *RIGHT*, extra columns from *LEFT*.

**INNER JOIN**: prioritize the left side, with added information from the right side
![Table relationships](/assets/2019-12-02-mini-db-course/20191202_table_rel_inner_join.png)

{% highlight sql %}
SELECT staff.FirstName, staff.Title, staff.ReportsTo, supervisor.EmployeeId, supervisor.FirstName, supervisor.Title
FROM Employee staff
INNER JOIN Employee supervisor ON staff.ReportsTo = supervisor.EmployeeId
{% endhighlight %}

Complete query on both left and right side.

**FULL JOIN**: information from both sides
![Table relationships](/assets/2019-12-02-mini-db-course/20191202_table_rel_full_join.png)

{% highlight sql %}
SELECT TrackId, Name, AlbumId, MediaTypeId, GenreId, g.Name
FROM Track
FULL OUTER JOIN Genre g ON Track.GenreId = g.GenreId 
{% endhighlight %}

**FULL OUTER JOIN** in this dataset can be done using another query, the **UNION** (combined datasets) of the *LEFT* part with intersection, and another from the previous *RIGHT* without the intersecting parts.
{% highlight sql %}
SELECT * FROM Track AS a 
LEFT JOIN Genre AS b 
ON a.GenreId = b.GenreId
UNION
SELECT * FROM Genre AS a 
LEFT JOIN Track AS b 
ON a.GenreId = b.GenreId WHERE a.GenreId IS NULL
{% endhighlight %}

### Combining filtering and joining tables

It is possible to add conditions to these queries.

Query the employees – supervisors relation which the supervisor has **General** title
{% highlight sql %}
SELECT staff.FirstName, staff.Title, staff.ReportsTo, supervisor.EmployeeId, supervisor.FirstName, supervisor.Title
FROM Employee staff
INNER JOIN Employee supervisor ON staff.ReportsTo = supervisor.EmployeeId
WHERE supervisor.Title LIKE 'General%'
{% endhighlight %}

Query the employees – supervisors relation which staff is in **Sales**
{% highlight sql %}
SELECT staff.FirstName, staff.Title, staff.ReportsTo, supervisor.EmployeeId, supervisor.FirstName, supervisor.Title
FROM Employee staff
INNER JOIN Employee supervisor ON staff.ReportsTo = supervisor.EmployeeId
WHERE staff.Title LIKE 'Sales%'
{% endhighlight %}

### Grouping data

Get some information from the table
{% highlight sql %}
SELECT CustomerId, FirstName
FROM Customer
{% endhighlight %}

Count the number of customers from the United Kingdom
{% highlight sql %}
SELECT COUNT(*)
FROM Customer
WHERE Country = ‘United Kingdom’
{% endhighlight %}

What if you need for other countries? 
{% highlight sql %}
SELECT COUNT(*)
FROM Customer
WHERE Country = ‘USA’
{% endhighlight %}

It goes very repetitive to all the countries in the list
{% highlight sql %}
SELECT DISTINCT Country
FROM Customer
{% endhighlight %}

**GROUP BY** operator does it.
{% highlight sql %}
SELECT Country, COUNT(*)
FROM Customer
GROUP BY Country
{% endhighlight %}
- For each Country, use the aggregate function count
- It is possible to add conditionals in the query

{% highlight sql %}
SELECT Country, COUNT(*)
FROM Customer
WHERE Company IS NOT NULL
GROUP BY Country
{% endhighlight %}

### Other SQL details
When a query becomes too long and complex it is good to break it into chunks, these are called Common Table Expression (CTE)

**WITH** operator does it:
{% highlight sql %}
WITH customers_USA AS (
    SELECT *
    FROM Customer
    WHERE Country = 'USA' AND Company IS NOT NULL
), customers_purchases AS (
    SELECT CustomerId, SUM(Total) AS T
    FROM Invoice
    GROUP BY CustomerId
)
SELECT EmployeeId, e.FirstName, c.CustomerId, c.FirstName, cp.T
FROM Employee e
INNER JOIN customers_USA c ON c.SupportRepId = e.EmployeeId
LEFT JOIN customers_purchases cp ON cp.CustomerId = c.CustomerId
{% endhighlight %}

Some queries might return too much data.
DBeaver returns the data in blocks by default.
It might be needed to limit in other interfaces/programs.

Use keyword **LIMIT** to do it:
{% highlight sql %}
SELECT PlaylistId, TrackId
FROM PlaylistTrack
LIMIT 100
{% endhighlight %}

The database tries to optimize the queries for the fastest/optimal execution.

Some commands not shown are:
{% highlight sql %}
CREATE TABLE
CREATE INDEX
ALTER TABLE
DROP TABLE
SELECT INTO
{% endhighlight %}

### Other types of databases

There are many different types of databases:
- Relational databases
- Graph databases
- Object storage
- Document store
- Time-series database

And they are optimized to different scenarios.

#### Graph Database Neo4j

- Part of the database features an embedded browser for visualisation
- In the Neo4j sandbox are some datasets
- In an example, this is a dataset on public information about crimes in the UK

The dataset focuses on relationships between different elements
![Neo4j schema](/assets/2019-12-02-mini-db-course/20191202_DB_schema.png)

It is possible to query direct relationships and expand from there
![Neo4j sample](/assets/2019-12-02-mini-db-course/20191202_DB_sample.png)

#### InfluxDB

- Functions optimized for management of time-related data
- Build-in functions for handling storage of older data into groupings
- In combination with Grafana: powerful visualisation tool

![Grafana](/assets/2019-12-02-mini-db-course/20191202_grafana.png)

## Exercises

- **A**: SELECT FROM WHERE
- **B**: JOIN
- **C**: COUNT
- **D**: GROUP BY
- **E**: WITH

Table Customer
- A
  - Get the customers where there is no support employee (SupportRepId)
  - Get the customers with a company.
  - Get the Customers for the support employee (SuportRepId) equal to 1
- B
  - Get the EmployeeId and FirstName of the employee associated with a customer
  - Get the number of customers for each employee. Report with EmployeeId and FirstName
- C
  - Get the number of rows in the table

Table Invoice
- D
  - Get the number of invoices Total for each CustomerId
  - Get the sum of the Invoices Total for each CustomerId
  - Get the sum of the Invoices Total for each BillingCountry
  - Get the sum of the Invoices Total for each Customer Country
  
Table Track
- A
  - Get the longest track
  - The Name for the tracks in AlbumId 1
  - The genre names for the tracks in AlbumId 1
- C
  - Get the number of rows in the table
- D
  - Get the maximum track length (Milliseconds) for each AlbumId
  - Get the maximum track length (Milliseconds) for each AlbumId for GenreId which Name starts with ‘R’
- E
  - Collect the names of the tracks which had the longest length per album (problem D1)

### Querying data in Python

Querying and collecting the data in Python
- Copy the database and [the .ipynb file](/assets/2019-12-02-mini-db-course/db-01.ipynb).
- Load Python jupyter notebook.

Explore a database in the Neo4j Sandbox:
- Graph database – Neo4j Sandbox: [https://neo4j.com/sandbox-v2/](https://neo4j.com/sandbox-v2/).

Check the features in Grafana:
- Time-series database companion – Grafana Sandbox: [https://play.grafana.org](https://play.grafana.org).


## References

- 1st Chapter of Fundamentals of Database Systems - Ramez Elmasri & Shamkant B. Navathe
- Comparison and evolution of databases: [https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37](https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37).
- Easy to follow SQL course: [https://swcarpentry.github.io/sql-novice-survey/](https://swcarpentry.github.io/sql-novice-survey/).
- Chinook database: [https://github.com/lerocha/chinook-database](https://github.com/lerocha/chinook-database).
- Some information about the Chinook database: [https://www.sqlitetutorial.net/sqlite-sample-database/](https://www.sqlitetutorial.net/sqlite-sample-database/).

- Graph database – Neo4j Sandbox: [https://neo4j.com/sandbox-v2/](https://neo4j.com/sandbox-v2/).
- Graph database – Neo4j GraphGists: [https://neo4j.com/graphgists/](https://neo4j.com/graphgists/).
- Time-series database – InfluxDB Sample data: [https://docs.influxdata.com/influxdb/v1.7/query_language/data_download/](https://docs.influxdata.com/influxdb/v1.7/query_language/data_download/).
- Time-series database companion – Grafana Sandbox: [https://play.grafana.org](https://play.grafana.org).

Other SQL articles:
- SQL Queries Don’t Start With Select: [https://jvns.ca/blog/2019/10/03/sql-queries-don-t-start-with-select/](https://jvns.ca/blog/2019/10/03/sql-queries-don-t-start-with-select/).
- Why You Should Use SQL CTEs: [http://www.helenanderson.co.nz/sql-ctes/](http://www.helenanderson.co.nz/sql-ctes/).
- 10 SQL Tricks That You Didn’t Think Were Possible: [https://blog.jooq.org/2016/04/25/10-sql-tricks-that-you-didnt-think-were-possible/](https://blog.jooq.org/2016/04/25/10-sql-tricks-that-you-didnt-think-were-possible/).
