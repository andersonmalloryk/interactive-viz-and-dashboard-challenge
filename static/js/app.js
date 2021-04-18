console.log("app.js is loaded")

// create a stub for the functions that will be created
function DrawBarGraph(sampleID) {
    console.log(`DrawBarGraph(${sampleID})`);

    d3.json("data/samples.json").then(data => {
        var samples = data.samples;
        var resultsArray = samples.filter(s => s.id == sampleID);
    });
}

function DrawBubbleChart(sampleID) {
    console.log(`DrawBubbleChart(${sampleID})`);
}

function ShowMetaData(sampleID) {
    console.log(`ShowMetaData(${sampleID})`);
}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
    console.log("optionChanged")
    var selector = d3.select("#selDataset");
    var sampleID = selector.property("value")

    // update bar graph
    DrawBarGraph(sampleID);
    //update bubble chart
    DrawBubbleChart(sampleID);
    //update demographic information
    ShowMetaData(sampleID);
};

function InitDashboard() {
    console.log("InitDashboard()");

    // populate dropdown with test subject id numbers
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
        var sampleNames = data.names;

        sampleNames.forEach(sampleID => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID)
        });
        var id = sampleNames[0]

        DrawBarGraph(id);
        DrawBubbleChart(id);
        ShowMetaData(id);
    });
};

    InitDashboard();