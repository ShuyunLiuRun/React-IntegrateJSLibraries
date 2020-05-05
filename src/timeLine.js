/**
 * 将D3集成到一个React组件中最简单的办法是让React渲染UI，然后用D3创建和添加可视化元素。
 * 本例中D3被集成到一个React组件中，一旦该组件渲染完成，D3会构造可视化元素，
 * 并将它们添加到DOM里。
 * 
 * D3 处理的数据，一般是对象数组
 */
import * as d3 from 'd3'
import React from 'react'
import {render} from 'react-dom'
import Canvas from './Canvas'
import TimelineDot from './TimelineDot'

const historicDatesForSkiing = [{
    year:1879,
    event:"Ski Manufacturing Begins"
},
{
    year:1882,
    event:"US Ski Club Founded"
},
{
    year:1924,
    event:"First Winter Olympics Held"
},
{
    year:1926,
    event:"First UK Ski Shop Opens"
},
{
    year:1932,
    event:"North America's First Rope Tow Spins"
},
{
    year:1949,
    event:"First Gondola Spins"
},
{
    year:1964,
    event:"Plastic Buckle Boots Available"
}
]

class Timeline extends React.Component{
    constructor({data=[]}){
        //extend 在一个数值区间找到最大值和最小值。
        const times = d3.extent(data.map(d => d.year))
        //区间表示时间轴上以像素为单位的区间
        const range = [50,450]
        super({data})
        this.state = {data,times,range}
        // this.targetRef = React.createRef()
        this.scale=d3.scaleTime(times,range)
    }
    // componentDidMount(){
    //     let group
    //     const {data,times,range} = this.state
    //     const target = this.targetRef.current
    //     //创建标尺。标尺是根据传递的时间段和像素区间到D3的time。scale函数而创建的
    //     //scale函数是用来在可视化应用中为每个位于1879年和1964年之间的大事日期获取x坐标位置的。
    //     //const scale = d3.time.scale.domin(times).range(range)
    //     const scale = d3.scaleTime(times,range)

    //     d3.select(target)
    //         .append('svg')
    //         .attr('height',200)
    //         .attr('width',500)

    //     group = d3.select(target.children[0])
    //         .selectAll('g')
    //         .data(data)
    //         .enter()
    //         .append('g')
    //         .attr(
    //             'transform',
    //             (d,i) => 'translate(' + scale(d.year) + ',0)'
    //         )

    //     group.append('circle')
    //         .attr('cy',160)
    //         .attr('r',5)
    //         .style('fill','blue')

    //     group.append('text')
    //         .text(d=> d.year + " - " + d.event)
    //         .style('font-size',10)
    //         .attr('y',115)
    //         .attr('x',-95)
    //         .attr('transform', 'rotate(-45)')
    // }

    render(){
        const {data} = this.state
        const {scale} = this
        return(
            <div className="timeline">
                <h1>{this.props.name} Timeline</h1>
                {/* <div ref={this.targetRef}></div> */}
                <Canvas>
                    {data.map((d,i) =>
                    <TimelineDot position={scale(d.year)}
                                    txt={`${d.year} - ${d.event}`}/>
                    )}
                </Canvas>
            </div>
        )
    }
}

render(
    <Timeline name="History of Skiing"
                   data={historicDatesForSkiing} />,
       document.getElementById('d3-container')
   )