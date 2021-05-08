---
layout: single
title:  "Excel VBA script!"
date:   2021-03-14 20:41:00 +0100
categories: 
 - data science
tags: 
 - excel 
 - vba 
 - xml 
 - function
---
In a computer without any programming environment you might be tasked with collecting data from XML files.

It is possible to do it using Excel - you create some VBA macros that become functions that are like the other Excel functions. To start doing it press ALT+F11 to open the macro editor. Create a new module, and add some code:

In my case I had 2 types of XML files.
I executed the function for all the files, if it failed I executed the other function as well.

For my first case, the value was in a direct field. You set the name of the function as the content of the field and the function is done.

{% highlight csharp %}
Public Function Type1(XMLFileName As String) As String
    Set oXMLFile = CreateObject("Microsoft.XMLDOM")
    oXMLFile.Load (XMLFileName)
    Type1 = oXMLFile.SelectSingleNode("/document/sample/sampleId").Attributes.getNamedItem("value").Text
End Function
{% endhighlight %}

`Public Function` is to indicate that it can be used by external modules (the spreadsheets).

`String` indicates that variables are text, both the input (`XMLFileName`) and the output (`As String`).

`Set oXMLFile` is an instanced variable, which is an object of Microsoft XML file reader.

`oXMLFile.Load` opens that file.

and `oXMLFile.SelectSingleNode` collects the specific value in the field needed.

In another case, the data are in a list with identifier and values, and the right identifier identifies the data I need.

{% highlight csharp %}
Public Function Type2(XMLFileName As String) As String
    Set oXMLFile = CreateObject("Microsoft.XMLDOM")
    oXMLFile.Load (XMLFileName)
    Set els = oXMLFile.SelectNodes("/another_document_format/basic_data/data_values")
    Dim output As String
    If els.Length = 0 Then
        output = "err"
    Else
        For Each Child In els
            Label = Child.Attributes.getNamedItem("ID").Text
            vals = Child.Attributes.getNamedItem("VALUE").Text
            If Label = 2 Then
                output = vals
                Exit For
            End If
        Next Child
    End If
    Type2 = output
End Function
{% endhighlight %}

This case is a bit more complex. Given that the value is within a list, it is necessary to iterate through the values in the list until we find what we need.

`SelectNodes(...)` collect all these nodes in a format.

If there is no value in that path, the `els.Length = 0` marks the output as error.
In case of any value there iterate through them and identify the one need.

If you need to collect the files in a directory possible something like <a class="external-url" href="https://stackoverflow.com/a/31428399">this</a> might help you.

Example (download all files to the same folder):
- [Example XLS file](/assets/2021-03-14-excel-vba-scripting/20210508_example.xlsx)
- [Example XML file 1](/assets/2021-03-14-excel-vba-scripting/first_file.xml)
- [Example XML file 2](/assets/2021-03-14-excel-vba-scripting/second_file.xml)
