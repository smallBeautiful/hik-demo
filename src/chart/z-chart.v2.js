const colors=["#333","#FD7A4F","#FDD764","#7359C3","#42C288","#92E98E","#2E8AE6","#44C0EA","#3C52C9","#4Dd62196","#ff679b","#fa5c7c","#0acf97","#02a8b5","#39afd1","#727cf5","#727cf5","#6b5eae","#51d69a","#81a7fe","#aa67f7","#cc3fa4","#ffba49","#ff6663"];

class chart{
    constructor(id,title){
        this.colors=colors;
        this.scale=4;
        const box=document.getElementById(id);
        if(!box){
            console.log("您传入的ID不正确");
            return false;
        }
        this.box=box;
        this.canvas=document.createElement("canvas");
        this.title=title;
        this.initData();
        var resizeFun=()=>{
            this.initData();
            this.draw();
        }
        window.addEventListener('resize',resizeFun);
        this.legendRows=[];
        this.box.addEventListener("click",(e)=>{
            this.clickLegendItem(e);
        })
    }
    clickLegendItem(e){
        let [x,y]=[e.offsetX*this.scale,e.offsetY*this.scale];
        // 图例高度为10
        let dataCount=0;//点击了第几条数据的图标
        for(let rowIndex=0;rowIndex<this.legendRows.length;rowIndex++){
            let row=this.legendRows[rowIndex];
            if(y<row.y+5*this.fontSizeScale&&y>row.y-5*this.fontSizeScale){
                for(let itemIndex=0;itemIndex<row.data.length;itemIndex++){
                    let item=row.data[itemIndex];
                    dataCount++;
                    if(x>item.startX&&x<item.startX+item.width){
                        this.reDraw(dataCount-1);
                        return;
                    }
                }
                return;
            }
            dataCount+=row.data.length;
        }
    }
    reDraw(dataIndex){}
    initData(){
        this.box.innerHTML="";
        const width=this.box.clientWidth;
        const height=this.box.clientHeight||width*0.6;
        this.box.appendChild(this.canvas);
        this.width=width*this.scale;
        this.height=height*this.scale;
        this.canvas.style.width=width+"px";
        this.canvas.style.height=height+"px";
        this.context=this.canvas.getContext("2d");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        var size=width>height?width:this.height;
        if(size<=289){
            this.fontSizeScale=0.7;
        }else if(size>=580){
            this.fontSizeScale=1.4;
        }else{
            this.fontSizeScale=size/414;
        }
        this.fontSizeScale=this.fontSizeScale*this.scale;
        this.initSelfData();
    }
    initSelfData(){}
    draw(){
        this.drawTitle();
    }
    drawTitle(){
        this.context.font=`${18*this.fontSizeScale}px Helvetica`;
        this.context.fillStyle="#000";
        this.context.textAlign="center";
        this.context.textBaseline="top";
        this.context.fillText(this.title,this.width/2,this.fontSizeScale*5,this.width);
        this.top=40*this.fontSizeScale;
    }
    drawLegend(legendRows){
        let xIconWidth=20*this.fontSizeScale;
        // 画图例
        legendRows.map((row,rowIndex)=>{
            let startX=row.startX;
            row.data.map(item=>{
                item.startX=startX;
                // 图例文字
                this.context.beginPath();
                this.context.font=`${10*this.fontSizeScale}px Helvetica`;
                this.context.textAlign="left";
                this.context.textBaseline="middle";
                this.context.fillStyle="#333";
                this.context.beginPath();
                this.context.fillText(item.name,startX+xIconWidth,row.y);
                this.context.fill();
                // 图例标志
                this.context.lineWidth=1*this.fontSizeScale;
                this.context.fillStyle=item.color;
                this.context.beginPath();
                this.context.fillRect(startX,row.y-5*this.fontSizeScale,xIconWidth*0.8,10*this.fontSizeScale)
                this.context.fill();
                startX+=item.width;
            })
        })
        this.legendRows=legendRows;
    }
}

class axisChart extends chart{
    constructor(id,title="",series,xAxis,yAxis,type){
        super(id,title);
        this.defalutIndex=0;
        this.type=type;
        this.series=series;
        if(this.series[0].name!="全部"){
            this.series.unshift({name:"全部",num:[]});
        }
        this.xAxis=xAxis;
        this.xAxisPoint=[];
        this.yAxis=yAxis;
        this.yAxisCount=5;
        this.initSelfData();
        this.draw();
    }
    initSelfData(){
        this.xAxisPoint=[];
        this.titleHeight=40*this.fontSizeScale;
        this.left=this.fontSizeScale*60;
        this.lineLeft=this.left+30*this.fontSizeScale;
        this.right=this.width-this.fontSizeScale*10;
        this.lineRight=this.right-30*this.fontSizeScale;
        this.top=this.titleHeight;
        this.lineTop=this.top+30*this.fontSizeScale;
        this.bottom=this.height-80*this.fontSizeScale;
        this.lineBottom=this.bottom-30*this.fontSizeScale;
        this.stepSize = 0;//单个数值所占的尺寸(高度or宽度)
    }
    initLegendData(){
        // 画图例
        // 设置图例样式
        this.context.font=`${10*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";

        let xIconWidth=20*this.fontSizeScale,gapWidth=10*this.fontSizeScale;
        // 计算图例的行数和起始位置
        let legendRows=[];
        let legends=[]
        let legendW=0;
        this.series.map((item,i)=>{
            let xTagWidth=this.context.measureText(item.name).width+gapWidth;
            let itemWidth=xTagWidth+xIconWidth+gapWidth;
            if(legendW+itemWidth>this.width){
                legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
                legends=[];
                legendW=0;
            }
            legendW+=itemWidth;
            legends.push({name:item.name,color:this.colors[i],width:itemWidth});
        })
        legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
        this.bottom=this.height-20*this.fontSizeScale*legendRows.length-40*this.fontSizeScale;
        this.lineBottom=this.bottom-30*this.fontSizeScale;
        legendRows.map((row,i)=>{
            row.y=this.bottom+40*this.fontSizeScale+20*this.fontSizeScale*i;
        })
        this.drawLegend(legendRows);
    }
    drawVerticleAxis(){
        const everyX=(this.right-this.left)/this.xAxis.data.length;
        // x轴坐标
        for(let i=0;i<this.xAxis.data.length;i++){
            let point={x:(i+0.5)*everyX+this.left,y:this.bottom}
            this.xAxisPoint.push(point);
            this.context.fillStyle="#666";
            this.context.font=`${10*this.fontSizeScale}px Helvetica`;
            this.context.textAlign="center";
            this.context.textBaseline="top";
            this.context.fillText(this.xAxis.data[i],point.x,this.bottom+this.fontSizeScale*10,everyX);
        }
        // 垂直坐标
        // 计算数据最大值和最小值
        var seriesDatas=[];
        for(let i=1;i<this.series.length;i++){
            seriesDatas=seriesDatas.concat(this.series[i].data);
        }
        this.dataMax=Math.max(...seriesDatas);
        this.dataMin=Math.min(...seriesDatas);
        const stepYaxisDataCount=(this.dataMax-this.dataMin)/(this.yAxisCount-1);
        const stepHeight=(this.lineBottom-this.lineTop)/(this.yAxisCount-1);
        this.stepSize=(this.lineBottom-this.lineTop)/(this.dataMax-this.dataMin);

        // 画Y轴坐标
        this.context.textAlign="right";
        this.context.textBaseline="middle";
        for(let i=0;i<this.yAxisCount;i++){
            this.context.fillText(Number(this.dataMax-i*stepYaxisDataCount).toFixed(this.yAxis.tofixed)+this.yAxis.tag||"",this.left-10*this.fontSizeScale,this.lineTop+stepHeight*i);
        }
    }
    drawHorisonAxis(){
        // 画y轴坐标
        this.context.fillStyle="#666";
        this.context.textAlign="right";
        this.context.textBaseline="middle";
        const everyY=(this.bottom-this.top)/this.xAxis.data.length;
        this.xAxis.data.map((item,index)=>{
            this.context.fillText(item,this.left-10*this.fontSizeScale,this.top+(index+0.5)*everyY);
        })

        // 计算数据最大值和最小值
        var seriesDatas=[];
        for(let i=1;i<this.series.length;i++){
             seriesDatas=seriesDatas.concat(this.series[i].data);
        }
        this.dataMax=Math.max(...seriesDatas);
        this.dataMin=Math.min(...seriesDatas);
        const stepXaxisDataCount=(this.dataMax-this.dataMin)/(this.yAxisCount-1);
        const stepWidth=(this.lineRight-this.lineLeft)/(this.yAxisCount-1);
        this.stepSize=(this.lineRight-this.lineLeft)/(this.dataMax-this.dataMin);
        // 画Y轴坐标
        this.context.textAlign="center";
        this.context.textBaseline="top";
        for(let i=0;i<this.yAxisCount;i++){
            this.context.fillText(Number(this.dataMin+i*stepXaxisDataCount).toFixed(this.yAxis.tofixed),this.lineLeft+i*stepWidth,this.bottom+this.fontSizeScale*10);
        }
    }
    drwaAxis(){
        this.initLegendData();
        // 画坐标轴
        this.context.strokeStyle="#ccc";
        this.context.lineWidth=2;
        this.context.moveTo(this.left,this.top);
        this.context.lineTo(this.left,this.bottom);
        this.context.lineTo(this.right,this.bottom);
        this.context.stroke();

        if(this.type=="horizon"){
            this.drawHorisonAxis()
        }else{
            this.drawVerticleAxis();
        }
    }
}
// 柱状图
class barChart extends axisChart{
    constructor(id,{title="",type="verticle",series=[],xAxis={data:[]},yAxis={tofixed:0,type: 'value'},callback=()=>{}}){
        super(id,title,series,xAxis,yAxis,type);
        this.callback=callback;
    }
    draw(){
        this.drawTitle();
        this.drwaAxis();
        this.drawBar();
    }
    reDraw(dataIndex){
        this.context.clearRect(0,0,this.width,this.height);
        this.defalutIndex=dataIndex;
        this.draw();
        this.callback(dataIndex);
    }
    drawBar(){
        if(this.type!="horizon"){
            this.drawVirticleBar();
        }else{
            this.drawHorizonBar();
        }
    }
    drawHorizonBar(){
        let everyYHeight=(this.bottom-this.top)/this.xAxis.data.length;
        
        let startIndex,endIndex;
        if(this.defalutIndex==0){
            startIndex=1;
            endIndex=this.series.length;
        }else{
            startIndex=this.defalutIndex;
            endIndex=startIndex+1;
        }
        let barHeight=everyYHeight/(endIndex-startIndex+1);
        this.context.font=`${7*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";
        for (let rowIndex = startIndex; rowIndex < endIndex; rowIndex++) {
            this.context.fillStyle=this.colors[rowIndex];
            let row=this.series[rowIndex];
            row.data.map((data,dataIndex)=>{
                let barWidth=(data-this.dataMin)*this.stepSize+(this.lineLeft-this.left);
                var y=this.defalutIndex==0?this.top+everyYHeight*dataIndex+barHeight*(rowIndex-0.5):this.top+everyYHeight*dataIndex+barHeight*0.5;
                this.context.fillRect(this.left,y,barWidth,barHeight);
                if(row.tag!=undefined){
                    this.context.fillText(data+row.tag,this.left+barWidth,y+barHeight*0.5);
                }
            })
        }
    }
    drawVirticleBar(){
        let everyXWidth=(this.right-this.left)/this.xAxis.data.length;
        
        let startIndex,endIndex;
        if(this.defalutIndex==0){
            startIndex=1;
            endIndex=this.series.length;
        }else{
            startIndex=this.defalutIndex;
            endIndex=startIndex+1;
        }
        let barWidth=everyXWidth/(endIndex-startIndex+1);
        this.context.font=`${7*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="center";
        this.context.textBaseline="bottom";
        for (let rowIndex = startIndex; rowIndex < endIndex; rowIndex++) {
            this.context.fillStyle=this.colors[rowIndex];
            let row=this.series[rowIndex];
            row.data.map((data,dataIndex)=>{
                let x=this.defalutIndex==0?this.left+everyXWidth*dataIndex+(rowIndex-0.5)*barWidth:this.left+everyXWidth*dataIndex+0.5*barWidth;
                var rectStartPoint=[x,this.lineTop+(this.dataMax-data)*this.stepSize];
                this.context.fillRect(...rectStartPoint,barWidth,this.bottom-rectStartPoint[1]);
                if(row.tag!=undefined){
                    this.context.fillText(data+row.tag,rectStartPoint[0]+barWidth/2,rectStartPoint[1])
                }
            })
        }
    }
}
