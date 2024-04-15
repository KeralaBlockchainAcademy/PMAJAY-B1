**HTML - Part III**

**Exercice-3**

1. Try out file upload option in the form
2. Try out the TableLayout as shown in the image(TableLayout.png)
3. Modify the portfolio page to include a table to list the educational qualifications or experience
4. Include a page to share a message with you by submitting a form
5. List the hobbies/interests/passion

Submit before **16-Apr-2024, 9.45am**

**Assignment-1**

1. Build calculator interface similar to the given figure(Calculator.png)

Submit before **17-Apr-2024, 9.45am**

**Notes**

**Table**

The HTML tables are created using the `<table>` tag in which the `<tr>` tag is used to create
table rows and `<td>` tag is used to create data cells. 

<pre>```<table>
<tr>
<td>Row 1, Column 1</td>
<td>Row 1, Column 2</td>
</tr>
<tr>
<td>Row 2, Column 1</td>
<td>Row 2, Column 2</td>
</tr>
</table>```</pre>

To display a table with borders, you will use the `border` attribute.

`<table border="1"> `

**Headings** in a table are defined with the `<th>` tag.

```<tr>
<th>Heading1</th>
<th>Heading2</th>
</tr>```

**Cellspacing** is the pixel width between the individual data cells in the table (The thickness of the lines making the table grid). The default is zero. If the border is set at 0, the cellspacing lines will be invisible. 

`<table border="1" cellspacing="5"> `

**Cellpadding** is the pixel space between the cell contents and the cell border. The default for this property is also zero. 

`<table border="1" cellspacing="5" cellpadding="10"> `

The **width** attribute can be used to define the width of your table. It can be defined as a fixed width or a relative width. A fixed table width is one where the width of the table is specified in pixels. For example, this code, `<table width="550">`, will produce a table that is 550 pixels wide. A relative table width is specified as a percentage of the width of the visitor's viewing window. Hence this code, `<table width="80%">`, will produce a table that occupies 80 percent of the screen. 

`<table border="1" cellspacing="5" cellpadding="10" width="50%">` 

You will use **colspan** attribute if you want to merge two or more columns into a single column. Similar way you will use **rowspan** if you want to merge two or more rows.

```<table border="1">
<tr>
<th>Column 1</th>
<th>Column 2</th>
<th>Column 3</th>
</tr>
<tr><td rowspan="2">Row 1 Cell 1</td><td>Row 1 Cell 2</td><td>Row 1 Cell
3</td></tr>
<tr><td>Row 2 Cell 2</td><td>Row 2 Cell 3</td></tr>
<tr><td colspan="3">Row 3 Cell 1</td></tr>
</table>```




















