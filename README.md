# code_challenge
Instructions to install and execute the application –
1.	Install Node,js 
http://nodejs.org/
2.	Install GIT
http://git-scm.com/
3.	Install bower
npm install -g bower 
4.	Checkout the code - JuniperNetworks_Coding_Challenge from the repository
5.	Install http-server 
npm install http-server –g
6.	To start the server locate the application folder and execute the command
http-server .
7.	Open the browser and key in localhost:8080 to launch the application

Implementation details and instructions for usage –
1.	User needs to select a chart type and input valid start/end timestamps before trying to generate charts, else an error message would be alerted.
2.	On providing valid inputs, respective chart is generated. GET API is implemented for generating the charts. JSON response is mocked based on the provided JSON schema using random values. ‘angular-mock’ library is used for mocking the server response.
3.	Three types of charts are visualized – line chart, bar chart and column chart
4.	The plotted chart can be modified using ‘Configure Charts’ option
5.	Clicking on the ‘Configure Charts’ button opens up a form detailing the chart properties that could be modified. Key in values for these properties and hit ‘Apply’, the modifications are applied to the corresponding chart on the left in real-time.
6.	New record could be created using ‘Add record’ option
7.	Click on ‘Add record’, enter valid values and hit Save. The record would be posted to server and the chart on the left side gets updated in real-time with the new data.
8.	POST API is implemented for saving data record using ‘angular-mock’ library.
9.	On checking ‘Plot 2 fields’ checkbox, user is provided with an option to plot two fields. In configuration panel, user can select the fields and marker colors to be plotted.


Note – The application is tested on chrome browser, may not function as expected in few other browsers due to usage of certain new cascading styles.

