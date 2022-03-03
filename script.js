var fandom_list_kpop, fandom_list_hh, fandom_list_pop;
var allBut, kpopBut, hhBut, popBut;
var moblieDiv;
var opacityLvl = 0.35;

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

function drawTypeBar1() {
    // margins
    const margin = {top: 10, right: 40, bottom: 50, left: 60},
        width = 600 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append svg to specified div
    const svg = d3.select("#type-word-bar1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("./data/fake_bar_data.csv").then(function(data) {

            // x axis
            const x = d3.scaleLinear()
                .domain([0, 10000])
                .range([0,width]);

            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                  .attr("transform", "translate(-10,0)rotate(-45)")
                  .style("text-anchor", "end")
                  .style("font-size", "1.2em");

            // y axis
            const y = d3.scaleBand()
                .range([0, height])
                .domain(data.map(function(d) { return d.word; }))
                .padding(.1);
                
            svg.append("g")
                .call(d3.axisLeft(y))
                .style("font-size", "0.8em");

            // draw lines
            svg.selectAll("myRect")
                .data(data)
                    .join("rect")
                    .attr("x", x(0) )
                    .attr("y", d => y(d.word))
                    .attr("width", d => x(d.value))
                    .attr("height", y.bandwidth())
                    .attr("fill", "grey")
        })
}

function drawTypeLineToxic() {
    // margins
    const margin = {top: 10, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append svg to specified div
    const svg = d3.select("#type-toxic")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#367d33", "#a33939"])

    //Read the data
    d3.csv("./data/cancel_toxic_ps.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.09, 0.26])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
            .data(sumstat)
            .join("path")
                .attr("fill", "none")
                .attr("stroke", function(d){ return colors(d) })
                .attr("stroke-width", 2)
                .attr("d", function(d){
                return d3.line()
                    .x(function(d) { return x(d.days); })
                    .y(function(d) { return y(d.severe_toxicity); })
                    (d[1])
                })
                .attr("x", 100)

        // vertical line to indicate date of cancellation
        svg.append("line")
            .join("path")
                .attr("fill", "none")
                .attr('stroke', '#333333')
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
        .attr("y", height + 45)
        .attr("text-anchor", "middle")  
        .style("font-size", "0.9em")
        .style("font-weight", "500")  
        .style("fill", "#333333")
        .text("Days Since Cancellation");
}

function drawTypeLineInsult() {
    // margins
    const margin = {top: 10, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append svg to specified div
    const svg = d3.select("#type-insult")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#367d33", "#a33939"])

    //Read the data
    d3.csv("./data/cancel_toxic_ps.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.09, 0.26])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 2)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })
            .attr("x", 100)

        // vertical line to indicate date of cancellation
        svg.append("line")
            .join("path")
                .attr("fill", "none")
                .attr('stroke', '#333333')
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
        .attr("y", height + 45)
        .attr("text-anchor", "middle")  
        .style("font-size", "0.9em")
        .style("font-weight", "500")  
        .style("fill", "#333333")
        .text("Days Since Cancellation");
}

function drawBGLineGenreToxic() {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 40, bottom: 60, left: 40},
        width = 780 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-genre-toxic")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["kpop", "hiphop", "pop"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#8e77b5", "#944d6d", "#3d7dbf"])

    //Read the data
    d3.csv("./data/genre_toxic.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0, 0.35])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 2)
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
                .attr('stroke', '#333333')
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
            .attr("cy", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", height + 50)
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("font-weight", "500") 
        .style("fill", "#333333")
        .text("Days Since Cancellation");
}

function drawBGLineGenreInsult() {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 40, bottom: 60, left: 40},
        width = 780 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-genre-insult")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["kpop", "hiphop", "pop"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#8e77b5", "#944d6d", "#3d7dbf"])

    //Read the data
    d3.csv("./data/genre_insult.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0, 0.35])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 2)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })

        // vertical line to indicate date of cancellation
        svg.append("line")
            .join("path")
                .attr("fill", "none")
                .attr('stroke', '#333333')
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
            .attr("cy", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", height + 50)
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("font-weight", "500") 
        .style("fill", "#333333")
        .text("Days Since Cancellation");
}

function drawBGLineSexToxic() {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 40, bottom: 60, left: 40},
        width = 780 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-sex-toxic")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["female", "male"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#bf43bd", "#3d5999"])

    //Read the data
    d3.csv("./data/sex_toxic.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0, 0.35])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 2)
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
                .attr('stroke', '#333333')
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
            .attr("cy", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", height + 50)
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("font-weight", "500") 
        .style("fill", "#333333")
        .text("Days Since Cancellation");
}

function drawBGLineSexInsult() {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 40, bottom: 60, left: 40},
        width = 780 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bg-sex-insult")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["female", "male"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#bf43bd", "#3d5999"])

    //Read the data
    d3.csv("./data/sex_insult.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0, 0.35])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 2)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })

        // vertical line to indicate date of cancellation
        svg.append("line")
            .join("path")
                .attr("fill", "none")
                .attr('stroke', '#333333')
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
            .attr("cy", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return colors(d)})

    // legend labels 
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 35)
            .attr("y", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colors(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", "1em");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", height + 50)
        .attr("text-anchor", "middle")  
        .style("font-size", "1em") 
        .style("font-weight", "500") 
        .style("fill", "#333333")
        .text("Days Since Cancellation");
}

function drawPSLineToxicCancel() {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#ps-toxic-cancel")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#367d33", "#a33939"])

    //Read the data
    d3.csv("./data/cancel_toxic_ps.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.09, 0.26])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 2)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.severe_toxicity); })
                (d[1])
            })
            .attr("x", 100)

        // vertical line to indicate date of cancellation
        svg.append("line")
            .join("path")
                .attr("fill", "none")
                .attr('stroke', '#333333')
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
            .attr("y", height + 45)
            .attr("text-anchor", "middle")  
            .style("font-size", "0.9em")
            .style("font-weight", "500")  
            .style("fill", "#333333")
            .text("Days Since Cancellation");
}

function drawPSLineInsultCancel() {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 40, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#ps-insult-cancel")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const keys = ["strong", "weak"]

    const colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["#367d33", "#a33939"])

    //Read the data
    d3.csv("./data/cancel_toxic_ps.csv", function(d){
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
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .attr("y", "12")
                    .style("font-size", "1.4em"));

        // y axis
        const y = d3.scaleLinear()
            .domain([0.09, 0.26])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y)
                    .ticks(10))
            .call(g => g.selectAll(".domain")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick line")
                    .attr("stroke", "#333333"))
            .call(g => g.selectAll(".tick text")
                    .attr("fill", "#333333")
                    .style("font-size", "1.4em"));

        // draw lines
        svg.selectAll(".line")
        .data(sumstat)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return colors(d) })
            .attr("stroke-width", 2)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.days); })
                .y(function(d) { return y(d.insult); })
                (d[1])
            })
            .attr("x", 100)

        // vertical line to indicate date of cancellation
        svg.append("line")
            .join("path")
                .attr("fill", "none")
                .attr('stroke', '#333333')
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
            .attr("y", height + 45)
            .attr("text-anchor", "middle")  
            .style("font-size", "0.9em") 
            .style("font-weight", "500") 
            .style("fill", "#333333")
            .text("Days Since Cancellation");
}

function init() {
    if (window.innerWidth < 900) {
        moblieDiv = document.getElementById("moblie-disclaimer");
        moblieDiv.style.display = "block"
    }

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

    drawTypeBar1();
    drawTypeLineToxic();
    drawTypeLineInsult();

    drawBGLineGenreToxic();
    drawBGLineGenreInsult();
    drawBGLineSexToxic();
    drawBGLineSexInsult();

    drawPSLineToxicCancel();
    drawPSLineInsultCancel();
}

document.addEventListener('DOMContentLoaded', init, false);