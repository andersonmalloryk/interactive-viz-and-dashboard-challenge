console.log("app.js is loaded")
// portions of this code are taken from instructor's office hours tutorial

function DrawBarGraph(sampleID) {
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
                color: otu_ids}
        };

        var data = [trace1];
        
        var layout = {
            title: 'Samples',
            // xaxis: { title: `Otu Labels(${otu_labels})`},
            xaxis: {title: 'OTU Labels'},
            showlegend: false,
            height: 600,
            width: 1200
        };

    Plotly.newPlot("bubble", data, layout);
    });
};

function ShowMetaData(sampleID) {
    // read out the id, ethnicity, gender, age, location, bbtype, and wfreq of the id

    d3.json("data/samples.json").then(data => {
        var metadata = data.metadata;
        var resultsArray = metadata.filter(m => m.id == sampleID);

        var demoInfo = d3.select(".panel-body")
        
        resultsArray.forEach((set) => {
            Object.entries(set).forEach(([key,value]) => {
                demoInfo.text(`${key}: ${value}`)
            });
        });        
    });
};

function GaugeChart(sampleID) {

    d3.json("data/samples.json").then(data => {
        var metadata = data.metadata;
        var resultsArray = metadata.filter(m => m.id == sampleID);
        var result = resultsArray[0]
        var scrubs = result.wfreq;
        console.log(result);

        var data = [
            {
                type: "indicator",
                mode: "gauge+number+delta",
                value: scrubs,
                title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
                gauge: {
                    axis: { range: [null, 9], tickwidth: 4, tickcolor: "black" },
                    bgcolor: "white",
                    borderwidth: 2,
                    steps: [
                        { range: [0, 1], color: "#ffffcc" },
                        { range: [1, 2], color: "#eeffcc" },
                        { range: [2, 3], color: "#d9f0a3" },
                        { range: [3, 4], color: "#addd8e" },
                        { range: [4, 5], color: "#78c679" },
                        { range: [5, 6], color: "#41ab5d" },
                        { range: [6, 7], color: "#238443" },
                        { range: [7, 8], color: "#238443" },
                        { range: [8, 9], color: "#005a32" }
                    ],
                    threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.75,
                        value: scrubs
                    }
                }
            }
        ];
        var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "black", family: "Arial" }
        };
        Plotly.newPlot('gauge', data, layout);
    });
}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
    var selector = d3.select("#selDataset");
    var sampleID = selector.property("value")

    // update bar graph
    DrawBarGraph(sampleID);
    //update bubble chart
    DrawBubbleChart(sampleID);
    //update demographic information
    ShowMetaData(sampleID);
    //update gauge
    GaugeChart(sampleID);
};

function InitDashboard() {
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
        GaugeChart(id);
    });
};

InitDashboard();