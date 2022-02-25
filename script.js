var fandom_list_kpop, fandom_list_hh, fandom_list_pop;
var allBut, kpopBut, hhBut, popBut;
var lucasDataBut;
var opacityLvl = 0.5;

// fandom viz

function changefandomOpacityAll() {
    allBut.classList.add("active");
    kpopBut.classList.remove("active");
    hhBut.classList.remove("active");
    popBut.classList.remove("active");

    for (var i = 0; i < fandom_list_kpop.length; i++) {
        var currentImg = fandom_list_kpop[i];
        currentImg.style.opacity = 1;
    }

    for (var i = 0; i < fandom_list_hh.length; i++) {
        var currentImg = fandom_list_hh[i];
        currentImg.style.opacity = 1;
    }

    for (var i = 0; i < fandom_list_pop.length; i++) {
        var currentImg = fandom_list_pop[i];
        currentImg.style.opacity = 1;
    }
}

function changefandomOpacityKpop() {
    allBut.classList.remove("active");
    kpopBut.classList.add("active");
    hhBut.classList.remove("active");
    popBut.classList.remove("active");

    for (var i = 0; i < fandom_list_kpop.length; i++) {
        var currentImg = fandom_list_kpop[i];
        currentImg.style.opacity = 1;
    }

    for (var i = 0; i < fandom_list_hh.length; i++) {
        var currentImg = fandom_list_hh[i];
        currentImg.style.opacity = opacityLvl;
    }

    for (var i = 0; i < fandom_list_pop.length; i++) {
        var currentImg = fandom_list_pop[i];
        currentImg.style.opacity = opacityLvl;
    }
}

function changefandomOpacityHiphop() {
    allBut.classList.remove("active");
    kpopBut.classList.remove("active");
    hhBut.classList.add("active");
    popBut.classList.remove("active");

    for (var i = 0; i < fandom_list_kpop.length; i++) {
        var currentImg = fandom_list_kpop[i];
        currentImg.style.opacity = opacityLvl;
    }

    for (var i = 0; i < fandom_list_hh.length; i++) {
        var currentImg = fandom_list_hh[i];
        currentImg.style.opacity = 1;
    }

    for (var i = 0; i < fandom_list_pop.length; i++) {
        var currentImg = fandom_list_pop[i];
        currentImg.style.opacity = opacityLvl;
    }
}

function changefandomOpacityPop() {
    allBut.classList.remove("active");
    kpopBut.classList.remove("active");
    hhBut.classList.remove("active");
    popBut.classList.add("active");

    for (var i = 0; i < fandom_list_kpop.length; i++) {
        var currentImg = fandom_list_kpop[i];
        currentImg.style.opacity = opacityLvl;
    }

    for (var i = 0; i < fandom_list_hh.length; i++) {
        var currentImg = fandom_list_hh[i];
        currentImg.style.opacity = opacityLvl;
    }

    for (var i = 0; i < fandom_list_pop.length; i++) {
        var currentImg = fandom_list_pop[i];
        currentImg.style.opacity = 1;
    }
}

function drawBGLineToxic() {
    // set the dimensions and margins of the graph
    const margin = {top: 60, right: 40, bottom: 60, left: 40},
        width = 850 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-toxic")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#80e898", "#fdb3a5"])

    //Read the data
    d3.csv("./data/toxic_ps.csv", function(d){
        return {days: d.days_cancel, group: d.group, 
        severe_toxicity:d.severe_toxicity}
      },).then(function(data) {
        // group the data
        const sumstat = d3.group(data, d => d.group);

        const x = d3.scaleLinear()
            .domain([-185, 185])
            .range([0,width]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                    .tickSizeOuter(0))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.1, 0.25])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.severe_toxicity); })
                (d[1])
            })

        // vertical line to indicate date of cancellation
        svg.append("line")
            .join("path")
                .attr("fill", "none")
                .attr('stroke', 'white')
                .attr("stroke-width", 1.5)
                .attr('x1', width / 2)
                .attr('y1', 0)
                .attr('x2', width / 2)
                .attr('y2', height)
    })

    // legend dots
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 20)
            .attr("cy", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("fill", "white")
        .text("Change in Severe Toxicity Rolling Mean");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", height + 45)
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("fill", "white")
        .text("Days Since Cancellation");
}

function drawBGLineInsult() {
    // set the dimensions and margins of the graph
    const margin = {top: 60, right: 40, bottom: 60, left: 40},
        width = 850 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-insult")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#80e898", "#fdb3a5"])

    //Read the data
    d3.csv("./data/toxic_ps.csv", function(d){
        return {days: d.days_cancel, group: d.group, 
        insult:d.insult}
      },).then(function(data) {
        // group the data
        const sumstat = d3.group(data, d => d.group);

        const x = d3.scaleLinear()
            .domain([-185, 185])
            .range([0,width]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                    .tickSizeOuter(0))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.1, 0.25])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })
            .attr("x", 100)
    })

    // legend dots
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 20)
            .attr("cy", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("fill", "white")
        .text("Change in Insult Rolling Mean");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", height + 45)
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("fill", "white")
        .text("Days Since Cancellation");
}

function drawBGLineVader1() {
    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-vader1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#92a8d1", "#fdb3a5"])

    //Read the data
    d3.csv("./data/toxic_ps.csv", function(d){
        return {days: d.days_cancel, group: d.group, 
        insult:d.insult}
      },).then(function(data) {
        // group the data
        const sumstat = d3.group(data, d => d.group);

        const x = d3.scaleLinear()
            .domain([-185, 185])
            .range([0,width]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                    .tickSizeOuter(0))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.1, 0.25])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })
            .attr("x", 100)
    })

    // legend dots
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 20)
            .attr("cy", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");
}

function drawBGLineVader2() {
    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-vader2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#92a8d1", "#fdb3a5"])

    //Read the data
    d3.csv("./data/toxic_ps.csv", function(d){
        return {days: d.days_cancel, group: d.group, 
        insult:d.insult}
      },).then(function(data) {
        // group the data
        const sumstat = d3.group(data, d => d.group);

        const x = d3.scaleLinear()
            .domain([-185, 185])
            .range([0,width]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                    .tickSizeOuter(0))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.1, 0.25])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })
            .attr("x", 100)
    })

    // legend dots
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 20)
            .attr("cy", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");
}

function drawPSLineToxic() {
    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#type-toxic")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#92a8d1", "#fdb3a5"])

    //Read the data
    d3.csv("./data/toxic_ps.csv", function(d){
        return {days: d.days_cancel, group: d.group, 
        severe_toxicity:d.severe_toxicity}
      },).then(function(data) {
        // group the data
        const sumstat = d3.group(data, d => d.group);

        const x = d3.scaleLinear()
            .domain([-185, 185])
            .range([0,width]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                    .tickSizeOuter(0))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.1, 0.25])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.severe_toxicity); })
                (d[1])
            })
            .attr("x", 100)
    })

    // legend dots
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 20)
            .attr("cy", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "1em") 
            .style("fill", "white")
            .text("Change in Severe Toxicity Rolling Mean");
}

function drawPSLineInsult() {
    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#type-vader")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#92a8d1", "#fdb3a5"])

    //Read the data
    d3.csv("./data/toxic_ps.csv", function(d){
        return {days: d.days_cancel, group: d.group, 
        insult:d.insult}
      },).then(function(data) {
        // group the data
        const sumstat = d3.group(data, d => d.group);

        const x = d3.scaleLinear()
            .domain([-185, 185])
            .range([0,width]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                    .tickSizeOuter(0))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.1, 0.25])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "white"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "white")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })
            .attr("x", 100)
    })

    // legend dots
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
            .attr("cx", 20)
            .attr("cy", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "1em") 
            .style("fill", "white")
            .text("Change in Insult Rolling Mean");
}

function init() {
    // set variables
    fandom_list_kpop = document.querySelectorAll("div.fandom-kpop");
    fandom_list_hh = document.querySelectorAll("div.fandom-hh");
    fandom_list_pop = document.querySelectorAll("div.fandom-pop");

    allBut = document.getElementById("btn-all");
    kpopBut = document.getElementById("btn-kpop");
    hhBut = document.getElementById("btn-hh");
    popBut = document.getElementById("btn-pop");

    allBut.addEventListener("click", changefandomOpacityAll);
    kpopBut.addEventListener("click", changefandomOpacityKpop);
    hhBut.addEventListener("click", changefandomOpacityHiphop);
    popBut.addEventListener("click", changefandomOpacityPop);

    drawBGLineToxic();
    drawBGLineInsult();
    drawBGLineVader1();
    drawBGLineVader2();
    drawPSLineToxic();
    drawPSLineInsult();
}

document.addEventListener('DOMContentLoaded', init, false);