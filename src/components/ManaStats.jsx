import {useEffect, useRef} from "react";
import { useDeckContext } from "../provider/DeckBuild"; 
import * as d3 from "d3";

function ManaStats() {
    const svgRef =  useRef(null);
    const { deck } = useDeckContext();

    function generateData(){
        const costMap = {};

    Object.values(deck).forEach(cards => {
        cards.forEach(card => {
            if (Number.isInteger(card.cmc)) {
                const cost = card.cmc < 7 ? card.cmc : '7+';
                costMap[cost] = (costMap[cost] || 0) + 1;
            }
        });
    }); 

    const result = Object.keys(costMap).map(key => ({
        cost: key,
        count: costMap[key]
    }));

    return result;
    }
    useEffect(() => {
        const data = generateData(deck)

        const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        svgRef.current.innerHTML = '';

        const svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.cost))
            .padding(0.2);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.cost))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.count))
            .attr("fill", "#69b3a2");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .text("MTG Deck Mana Cost Distribution");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Number of Cards");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Mana Cost");
    }, [deck]);

    return <div id="manaStats" ref={svgRef}>

    </div>
}
export {ManaStats}