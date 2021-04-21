console.log("app.js is loaded")
// portions of this code are taken from instructor's office hours tutorial

// create a stub for the functions that will be created
function DrawBarGraph(sampleID) {
    console.log(`DrawBarGraph(${sampleID})`);

    d3.json("data/samples.json").then(data => {
        var samples = data.samples;
        var resultsArray = samples.filter(s => s.id == sampleID);
        var result = resultsArray[0]

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }
        var barArray = [barData];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, 1: 150 }
        }
        Plotly.newPlot("bar", barArray, barLayout);

    });
};

function DrawBubbleChart(sampleID) {
    console.log(`DrawBubbleChart(${sampleID})`);

    d3.json("data/samples.json").then(data => {
        var samples = data.samples;
        var resultsArray = samples.filter(s => s.id == sampleID);
        var result = resultsArray[0]
        // Use otu_ids for the x values and marker color
        var otu_ids = result.otu_ids;
        // Use sample_values for the y values and marker size
        var sample_values = result.sample_values;
        // Use otu_labels for the text values.
        var otu_labels = result.otu_labels;

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            hovertemplate: '<i>OTU Labels</i> : %{text}<br>' +
                '<i>Sample value</i> %{y}<br>' +
                '<i>OTU Ids</i> %{x}<br>',
            marker: {
                size: sample_values,
                color: sample_values}
        };

var data = [trace1];
var layout = {
    title: 'Samples',
    xaxis: { title: 'OTU Ids' },
    showlegend: false,
    height: 600,
    width: 1200
};
Plotly.newPlot("bubble", data, layout);
    });
};


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