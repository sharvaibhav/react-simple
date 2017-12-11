import * as d3 from "d3";
import BaseChart from "./BaseChart";

export default class StackedBarChart extends BaseChart {
    getScaleX() {
        return d3.scaleBand().range([0, this.props.width], 0.5);
    }

    getScaleY() {
        return d3.scaleLinear().range([this.props.height, 0]);
    }

    createAxisX(x) {
        return d3.axisBottom(x);
    }

    createAxisY(y) {
        return d3.axisLeft(y);
    }

    onMouseOver(d) {
        return this.tooltip
            .style("visibility", "visible")
            .text(`${d.xValue} (${d.yValue})`);
    }

    create(data,xData=['yValue','yValue2','yValue3'],yVal='xValue') {
        this.x = this.getScaleX();
        this.y = this.getScaleY();

        const xAxis = this.createAxisX(this.x);
        const yAxis = this.createAxisY(this.y);

        const width = this.props.width + this.props.margin.left + this.props.margin.right;
        const height = this.props.height + this.props.margin.top + this.props.margin.bottom;

        this.svg = d3.select(this.el).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
                .attr("transform", `translate(${this.props.margin.left}, ${this.props.margin.top})`);

        var dataIntermediate = xData.map(function (c) {
            return data.map(function (d) {
                return {x: d[yVal], y: d[c]};
            });
        });


        var stack = d3.stack()
                    .keys(xData);
                    
        var dataStackLayout = stack(data);
        
        // this.x.domain(dataStackLayout[0].map(function (d) {
        // return d.x;
        // }));

        this.y.domain([0,d3.max(dataStackLayout[dataStackLayout.length - 1],
                function (d) { return d[0] + d[1];})
        ]).nice();

        this.x.domain(data.map(d => { return d.xValue; }));
        //this.y.domain([0, d3.max(data, d => { return d.yValue; })]);

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${this.props.height})`)
            .attr("stroke","white")
            .call(xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .attr("stroke","white")
            .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");

        var colorSc = this.color.bind(this);
        var layer = this.svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return colorSc(i);
        });
        
        layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x",  (d) => {
            return this.x(d.data[yVal]);
        })
        .attr("y",  (d)=> {
            return this.y(d[1] + d[0]);
        })
        .attr("height",  (d) => {
            return this.y(d[0]) - this.y(d[0] + d[1]);
        })
        .attr("width", 20);
        
        
        // this.svg.selectAll("path")
        //     .style("fill", "none")
        //     .style("stroke", "#000")
        //     .style("shape-rendering", "crispEdges");

        if (this.showTooltips) {
            this.addTooltips();
        }
    }

    update(data,xData=['yValue','yValue2','yValue3'],yVal='xValue') {
        var stack = d3.stack()
                .keys(xData);
                
        var dataStackLayout = stack(data);
        // Recalculate domain given new data
        this.y.domain([0,d3.max(dataStackLayout[dataStackLayout.length - 1],
                function (d) { return d[0] + d[1];})
        ]).nice();

        this.x.domain(data.map(d => { return d.xValue; }));

        // We now have an updated Y axis
        const updatedAxisY = this.createAxisY(this.y);
        const updatedAxisX = this.createAxisX(this.x);

        // Let's update the x & y axis
        this.svg.selectAll("g.y.axis").call(updatedAxisY);
        this.svg.selectAll("g.x.axis").call(updatedAxisX);

        var colorSc = this.color.bind(this);
        //this.svg.selectAll(".stack").remove()
        var layer = this.svg.selectAll(".stack")
            .data(dataStackLayout);
     
        layer.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .transition().duration(this.transitionDuration)
            .attr("x",  (d) => {
                return this.x(d.data[yVal]);
            })
            .attr("y",  (d)=> {
                return this.y(d[1] + d[0]);
            })
            .attr("height",  (d) => {
                return this.y(d[0]) - this.y(d[0] + d[1]);
            })
            .attr("width", 20);
    }
}
