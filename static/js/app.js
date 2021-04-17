console.log("app.js is loaded")

function InitDashboard(){
    console.log("InitDashboard()");

    // populate dropdown with test subject id numbers
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data){
        console.log(data);

    })

    // update bar graph

    //update bubble chart

    //update demographic information
}

InitDashboard();