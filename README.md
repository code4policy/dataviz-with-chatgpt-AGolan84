# Dataviz With GPT

## Learning Objectives

Students will be able to:
- Use ChatGPT to build something in a programming language they're not familiar with (D3) #learning-how-to-learn

## Pre-requisites

This lesson assumes you are familiar with:
- Basic HTML, CSS and JavaScript
- Using GitHub

## Instructions

<!-- We demo some exploratory data analysis with ChatGPT and R -->
<!-- backup in python notebook just in case -->
https://data.boston.gov/dataset/311-service-requests


### Part 1: Download the data

Download data of all 311 calls in Boston from 2023
```
wget -O boston_311_2023_raw.csv https://data.boston.gov/dataset/8048697b-ad64-4bfc-b090-ee00169f2323/resource/e6013a93-1321-4f2a-bf91-8d8a02f1e62f/download/tmpc0m94i5x.csv
```

Run `pivot.py` as shown below to make a new file that has the reasons for 311 calls and their counts

```
python pivot.py 
```

this will output a file called `boston_311_2023.csv

### Part 2: Build a D3 visualization with ChatGPT

Use your knowledge of the vocabulary of HTML, CSS and JS to prompt ChatGPT. Your goal is to, with it's help, make a D3 visualization of all of the 311 calls in Boston from 2023. 

1. Make a bar chart of the top 10 reasons for 311 calls in the past year (hint: use the `reason` column in the data)
2. The initial bar chart may not look quite right. With the help of ChatGPT, fix anything that looks immediately off (for example, sometimes the axis labels overlap or the bars are out of order etc...)
3. Give the bar chart a good headline and subheadline
4. Make the bar chart horizontal instead of vertical
5. Change the default colors, text size, or anything else
6. Add a citation for where the data comes from and give yourslves a chart authorship credit in the footnotes

Bonus: Create a button that shows an extended bar chart with all of the remaining counts of the `reason` column. 


### Part 3: Reflect

What worked? What didn't? Review your classmates' conversations with ChatGPT in Slack. Fill out an AI reflection form about your experience today.
