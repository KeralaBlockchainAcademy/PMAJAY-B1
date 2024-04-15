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

```
<table>
<tr>
<td>Row 1, Column 1</td>
<td>Row 1, Column 2</td>
</tr>
<tr>
<td>Row 2, Column 1</td>
<td>Row 2, Column 2</td>
</tr>
</table>
```

To display a table with borders, you will use the `border` attribute.

`<table border="1"> `

**Headings** in a table are defined with the `<th>` tag.

```
<tr>
<th>Heading1</th>
<th>Heading2</th>
</tr>
```

**Cellspacing** is the pixel width between the individual data cells in the table (The thickness of the lines making the table grid). The default is zero. If the border is set at 0, the cellspacing lines will be invisible. 

`<table border="1" cellspacing="5"> `

**Cellpadding** is the pixel space between the cell contents and the cell border. The default for this property is also zero. 

`<table border="1" cellspacing="5" cellpadding="10"> `

The **width** attribute can be used to define the width of your table. It can be defined as a fixed width or a relative width. A fixed table width is one where the width of the table is specified in pixels. For example, this code, `<table width="550">`, will produce a table that is 550 pixels wide. A relative table width is specified as a percentage of the width of the visitor's viewing window. Hence this code, `<table width="80%">`, will produce a table that occupies 80 percent of the screen. 

`<table border="1" cellspacing="5" cellpadding="10" width="50%">` 

You will use **colspan** attribute if you want to merge two or more columns into a single column. Similar way you will use **rowspan** if you want to merge two or more rows.

```
<table border="1">
<tr>
<th>Column 1</th>
<th>Column 2</th>
<th>Column 3</th>
</tr>
<tr><td rowspan="2">Row 1 Cell 1</td><td>Row 1 Cell 2</td><td>Row 1 Cell
3</td></tr>
<tr><td>Row 2 Cell 2</td><td>Row 2 Cell 3</td></tr>
<tr><td colspan="3">Row 3 Cell 1</td></tr>
</table>
```

**Form**

All forms start with the `<FORM>` tag and end with `</FORM>`. All other form objects go between these two tags.

```
<form>

</form
```

The form tag has two main properties: **METHOD** and **ACTION**. METHOD refers to **post** or **get**. The post attribute will send the information from the form as a text document. The get attribute is used mostly with search engines. We will generally set METHOD="post". ACTION usually specifies the location of the CGI script that will process the form data

**Text Field**

A text field is just that, a field in your form where the user can enter a line of text. This is ideal for names, states, zip codes and other similar information that does not need
too much space.

`<input type="text" name="shortnameforfield">`

Following is the list of attributes for `<input>` tag for creating text field:
1. type: Indicates the type of input control and for text input control it will be set to text.
2. name: Used to give a name to the control which is sent to the server to be recognized and get the value.
3. value: This can be used to provide an initial value inside the control.
4. size: Allows to specify the width of the text-input control in terms of characters.
5. maxlength: Allows to specify the maximum number of characters a user can enter into the text box.

**Password**

This is also a single-line text input but it masks the character as soon as a user enters it. They are also created using HTML `<input>` tag but `type` attribute is set to `password`.

`<input type="password" name="password" >`

Attributes are type, name, value, size, maxlength

**Text Area**

This is used when the user is required to give details that may be longer than a single sentence. Multi-line input controls are created using HTML `<textarea>` tag.

`<textarea rows="5" cols="50" name="address"> </textarea>`

Following is the list of attributes for <textarea> tag:
1. name: Used to give a name to the control which is sent to the server to be recognized and get the value.
2. rows: Indicates the number of rows of text area box.
3. cols: Indicates the number of columns of text area box

**Radio Button**

Radio buttons are used when you have a set number of options and you only want to let your site's visitor to choose only one of these choices.

```
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female
```

**Checkbox**

Checkboxes are used when more than one option is required to be selected. They are also created using HTML `<input>` tag but `type` attribute is set to `checkbox`.

```
<input type="checkbox" name="education" value="ug"> UG
<input type="checkbox" name="education" value="pg"> PG
```

**Select Box**

A select box, also called drop down box which provides option to list down various options in the form of drop down list, from where a user can select one or more options.

```
<select name="course">
<option value="cba" selected>Certified Blockchain Associate</option>
<option value="CED">Certified Ethereum Developer</option>
<option value="CHF">Certified Hyperledger Fabric Developer</option>
</select>
```

**Button**

There are various ways in HTML to create clickable buttons. You can also create a clickable button using `<input>` tag by setting its`type` attribute to `button`. The type attribute can take the following values:

1. submit: This creates a button that automatically submits a form.
2. reset: This creates a button that automatically resets form controls to their initial values.
3. button: This creates a button that is used to trigger a client-side script when the user clicks that button.
4. image: This creates a clickable button but we can use an image as background of the button.

```
<input type="submit" name="submit" value="Submit">
<input type="reset" name="reset" value="Reset">
```

**Inline Style**

We can apply styling to our HTML inside individual HTML tags with inline styling. The style attribute works in the same way as any other HTML attribute. We use style, followed by the equality sign (=), and then a quote where all of the style values will be stored using the standard CSS property-value pairs - "property: value;".

`<input type="submit" name="submit" value="Submit" style="color:blue">`

We can have as many property-value pairs as we want as long as we separate them with a semicolon (;).

**Lists**

There are three types of lists in HTML

1. Unordered list or Bulleted list (ul)
2. Ordered list or Numbered list (ol)
3. Description list or Definition list (dl)

**Unordered List**

In HTML unordered list, the list items have no specific order or sequence. An unordered list is also called a Bulleted list, as the items are marked with bullets. It begins with the `<ul>` tag and and closes with a `</ul>` tag. The list items begin with the `<li>` tag and end with `</li>` tag.

Syntax:

`<ul>List of Items</ul>`

**Ordered List**

In HTML, all the list items in an ordered list are marked with numbers by default instead of bullets. An HTML ordered list starts with the `<ol>` tag and ends with the `</ol>` tag. The list items start with the `<li>` tag and end with `</li>` tag.

Syntax:

`<ol>List of Items</ol>`

Instead of numbers, you can mark your list items with the alphabet: A, B, C or a,b,c, or roman numerals: i, ii, iii, etc. You can do this by using the `<ol>` tag type attribute.


**Description List**

In an HTML Description list or Definition List, the list items are listed like a dictionary or encyclopedia. Each item in the description list has a description. You can use a description list to display items like a glossary. You will need the following HTML tags to create a description list:

1. `<dl>` (Definition list) tag – Start tag of the definition list
2. `<dt>` (Definition Term) tag – It specifies a term (name)
3. `<dd>` tag (Definition Description) – Specifies the term definition
4. `</dl>` tag (Definition list) – Closing tag of the definition list




