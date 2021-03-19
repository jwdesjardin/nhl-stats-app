# NHL Scraping app

## Full stack project

This project consists two parts on being a being a server that is responsible for scraping websites to get National Hockey League data and respond with a JSON response. The server uses Typescript and generates objects that are of certain types and use these objects to create a JSON response. These types are then shared with the client so during developement process I have access to all the types and properties of the data I am fetching from my server.

## Cheerio web scraping

Cheerio turned out to be a very powerful tool for reading a Document Object Model of a website. With Cheerio you can select nodes from the DOM similarly to the document.querySelector method. With the Cheerio node that is returned from a Cheerio query you have the ability to access some information about that node by calling methods on it. For our purposes I mostly read the complete html of the node and its children using the .html() method.
I would use two different approaches to scraping the data from webpages depending on if the data I wanted was stored in a table or not. When it was in a table I could use Cheerio to select the table using the "id" attribute. Then, in each row each table data had a "data-stat" attribute which made it super easy to use Cheerio once again to query exatly the value that I need. Once I have the value I can type cast it or manipulate it as needed to the get the correct shape for the return object.
When the data I wanted was not stored in tables it was a little more difficult because there was often no attributes to query to exaclty return the value that I needed. So I used the .html() on the div containing the values I needed. This would provide a string containing all the html of the div and its children. Next to get the values that I needed I would parse this string using Regular Expressions and the .match() method to find occurances of a label and value and then use the .replace method to trim off the label and just get the value. I could then type cast and return the object as needed.

## creating reusable components

In places where components were being reused I created reusable components. I did this for the game component that is used to show upcoming games as well as recent games. I use a reusable component as well for the conference standings which is shown both on the home page as well as the team page. The last and most impactful place that I used a reusable component was for scoring statistics tables on each of the game, team and leaders pages.
My first approach to make the statistics tables did not include a reusable component that could be used for the tables. This was problematic because each time I wanted to add a new table I was adding a new folder or file and the organization of my project was getting out of hand. In addition, if I wanted to make a basic change that would affect all tables I would need to go to each file and make the change which was time consuming and not an ideal workflow.
To solve this I created a reusable SmallStatsTable component that took some required and optional attributes that would descibe what values to show in each column and what type of data to loop through to map out each row. After addng this component the process of adding a new table was as simple as creating the configuration of columns and addinf it to the imported component. This 100% imporved my workflow for maintaining the current tables and adding new tables.

## Coding logic.

I used the Date object to find todays date and filter the list of games accodingly. In some places I find all the games after todays data, on todays date or after todays date. I worked with both the getTime() methods which return the number of ms since 1 January 1970 . And methods like the .getDate() method, amoung others, wich returns the current day of the month.  
I also used a lot of sorting methods. Most often I was sorting objects based on the values of a specific property. Sometimes I needed to account for sorting where a value could be null as well. I wrote a lot of variations of sorting methods and wrote some functinos that took an attribute and sorted the object based on that attribute.
using chakra ui
I used the Chakra UI Library for this project. I enjoy the ease of the developing experience with this framework. I used a feature of this framework to extend the theme allowing me to change the default settings for Components. This was helpful in allowing me to set some good base styles and reducing the amount of code I needed to write to style my components later.

## Mobile friendly development

My primary use of this project was going to be mobile devices. I used framer to mockup a UI design for mobile screens. This was the primary screen size that all pages were developed for. Using a container allowed me to space out the display on desktops and ipads without allowing the page content to stretch out too far.
