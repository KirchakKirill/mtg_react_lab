import {useEffect, useRef, useState} from "react";
import { useDeckContext } from "../provider/DeckBuild"; 
import * as d3 from "d3";


function ColorStats() {
    const svgRef =  useRef(null);
    const { deck } = useDeckContext();

    function generateData(deck){
        const data0 = [
            { color: 'W', count: 0 },
                { color: 'B', count: 0 },
                { color: 'R', count: 0 },
                { color: 'G', count: 0 },        
                { color:'U',count: 0},

            ]
            for (const [_, cards] of Object.entries(deck)){
                for (const card of cards){
                    if (card.colors){
                        for (const color of card.colors){
                            if (color)
                                data0.find((el)=>el.color===color).count++;
                        }
                    }
                    
                }
            }
            return data0
    }
    
    useEffect(() => {
        const data = generateData(deck)
        const element = svgRef.current;
        element.innerHTML = '';
        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.color))
            .range(['#A9A9A9', '#4682B4', '#FF0000', '#228B22', '#FFFF00', ]);

        const pie = d3.pie()
            .value(d => d.count)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        const label = document.createElement('label')
        label.textContent = "Deck Mana Color Distribution";
        label.classList.add("colorLabel");
        element.appendChild(label)

        const svg = d3.select(element)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const arcs = svg.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.color));

    }, [deck]);
    return <div id="colorStats" ref={svgRef}>

    </div>
}
export {ColorStats}