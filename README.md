

<h1 align="center">SQL Query Executor - Made with React</h1>

<br>

## Overview

This web-based application provides a SQL editor to execute queries and display results. This particular project is built using React, and the React Bootstrap front-end framework. UpStream endpoints are referred from [this](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv) repository. The sections below detail the salient features of this project.

<img width="1728" alt="image" src="https://github.com/ajaybharat/sql-executor/assets/39583088/3bb7f956-cb53-40e6-87d0-6fcdf371af6c">

## Features
**Tab Based Interface**: An easy to use tab-based ui to show queries. There are list of predefined queries and also users can save any specific custom query for future usage. Apart from this application also maintains track of executed queries with statuses.
<img width="498" alt="image" src="https://github.com/ajaybharat/sql-executor/assets/39583088/32d30bbc-b2e0-40ec-9465-1ef0f8a4d9b7">

   
**Table Views**: Initally there won't be any data to shown, once user clicks on predefined query or run any query then it validates and executes query. Keeping the application lightweight, and blazing fast.

<img width="1237" alt="image" src="https://github.com/ajaybharat/sql-executor/assets/39583088/2507d76c-4ed3-4085-80e1-12a58ad7f1c1">

**Output Statistics**: The user will also be alerted about the time taken to complete a query, giving the user a measure to check the performance of the system. The table is sortable, which can improve analysing data.
<img width="1728" alt="image" src="https://github.com/ajaybharat/sql-executor/assets/39583088/6c1d25ff-c606-46be-a25a-fab17770d42e">

**Ability to save the results as CSV**: This application includes functionality to save the results of a query in CSV formats.

**Caching queried data**: This application provides caching functionality, so that every time users not needed to wait long time to query large data, improving user experience and easy to use.

<br>

## App Quick Demo

https://github.com/ajaybharat/sql-executor/assets/39583088/d888c4c7-f421-4f41-a24b-7f54caec0280


## Tech Stack
- ReactJS
- Bootstrap


<br>

## Some major Dependencies
- react-ace ```11.0.1``` - Editor to write query
- font-awesome ```4.7.0``` - Icons rendering
- react-toastify ```10.0.5``` - For notifications such as success and error
- react-csv ```2.2.2``` - Exporting csv data
- react-loader-spinner ```6.1.6``` - Loader for the table
- ag-grid-react ```31.3.1``` - To create result table
- react-bootstrap ```2.10.2``` - for writing CSS and custom components


<br>

## Performance

I used Lighthouse Chrome DevTools to check application performace. The app is pretty performant with **Time to Interactive** sitting at just **0.7s** and the **First Contentful Paint (FCP)** is just **0.5s**.

<img width="1725" alt="Screenshot 2024-05-07 at 2 05 19 AM" src="https://github.com/ajaybharat/sql-executor/assets/39583088/35e7719d-7261-43b9-8def-7c945f040b62">


The performance metric varies between 96-98
Others remain constant

<br>

## Steps taken to optimize

- React lazy loading has been used for loading parts of the page not immediately required in the background.
- Used performace optimization hooks - **memo, useMemo and useCallback** to prevent unnecessary re-rendering of components and increase performance.
- **Using Default Imports for React-Bootstrap library.** Let's suppose we want to import a `Button` component. There are two ways to do that:
  - `import { Button } from "react-bootstrap";`
  - `import Button from "react-bootstrap/Button";`
The first option imports the entire library, and then imports the Button component, whereas the second, more optimised, way imports just the Button component, and nothing else. This too, shaves a lot of the load time.
- Caching data, so that further executes can render large amount of data sooner.

<h3 align="center">THANK YOU!!!</h3>
