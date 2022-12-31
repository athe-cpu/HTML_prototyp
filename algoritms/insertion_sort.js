
var count = 1 + 50,
durationTime = 2000/count,
array = d3.shuffle(d3.range(1,count)),
unsortedArray = [...array],
sortedArray = [],
stop = false,
steps = 0,
bogoShuffles = 0;

var margin = {top: 40, right: 5, bottom: 40, left: 5},
width = 1000 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

var barWidth = width/count;

var x = d3.scaleLinear()
.domain([0,count])
.range([0, width]);

var svg = d3.select(".bubble-container").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var rects = svg.append("g")
.attr("transform",  function(d, i) { return "translate(" + barWidth + ",0)"})
.selectAll("rect")
.data(unsortedArray)
.enter().append("rect")

var labels = svg.selectAll("text")
.data(unsortedArray)
.enter().append("text")

labels.attr("id", function(d) {return "text" + d})
.attr("transform", function(d, i) {return "translate(" + x(i) + ",350)"})
.html(function(d) {return d;})

rects.attr("id", function(d) {return "rect" + d})
.attr("transform", function(d, i) {
   return "translate(" + (x(i) - barWidth) + ","+ (330 - unsortedArray[i] * 6.48) +")"
  })
.attr("width", barWidth *.9)
.attr("height", function(d) {return d*barWidth/3})


function shuffle(){
unsortedArray = [...array];
sortedArray = [];
stop = false;

d3.select("svg").remove();

svg = d3.select(".bubble-container").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

rects = svg.append("g")
.attr("transform",  function(d, i) { return "translate(" + barWidth + ",0)"})
.selectAll("rect")
.data(unsortedArray)
.enter().append("rect")

labels = svg.selectAll("text")
.data(unsortedArray)
.enter().append("text")

labels.attr("id", function(d) {return "text" + d})
.attr("transform", function(d, i) {return "translate(" + x(i) + ",350)"})
.html(function(d) {return d;})

rects.attr("id", function(d) {return "rect" + d})
.attr("transform", function(d, i) {
   return "translate(" + (x(i) - barWidth) + ","+ (330 - unsortedArray[i] * 6.48) +")"
  })
.attr("width", barWidth *.9)
.attr("height", function(d) {return d*barWidth/3})

}

function reset() {
unsortedArray = [...array];
sortedArray = [];
stop = false;

d3.select("#counter").html(steps = 0)

labels.attr("class", "")                
    .transition().duration(2000)
    .attr("transform", function(d, i) {return "translate(" + (x(i)) + ",350)"})              

rects.attr("class", "")                
    .transition().duration(2000)
    .attr("transform", function(d, i) {return "translate(" + (x(i)-barWidth) + ","+ (330 - unsortedArray[i] * 6.48) +")"})
    .attr("width", barWidth *.9)
    .attr("height", function(d) {return d*barWidth/3})
}

function insertionSort() {

   var value = unsortedArray.shift();
   sortedArray.push(value);      
   reArrange(sortedArray.length-1);

   function reArrange(n) {
       if (stop) return stop = false;            

       d3.selectAll("rect").attr("class", "")                
       d3.select("#rect" + value).attr("class", "testing")
       d3.select("#text" + value).attr("class", "sorted")     
       d3.select("#counter").html(++steps);
       
       if (n > 0 && sortedArray[n-1] > value) {
           d3.timeout(function() {
               sortedArray.splice(n,1);
               sortedArray.splice(n-1,0,value);

               slide(sortedArray[n], n);
               slide(sortedArray[n-1], n-1);

               reArrange(--n)
           }, durationTime * 2);
       } else if (unsortedArray.length) {
           d3.timeout(function() {insertionSort()}, durationTime * 2);
       } else {
       
           return d3.selectAll("rect").attr("class", "")
       }
   }
}

function slide(d, i) {
d3.select("#text" + d)
    .transition().duration(durationTime)
    .attr("transform", function(d) {return "translate(" + (x(i)) + ", 350)"})

d3.select("#rect" + d)
    .transition().duration(durationTime)
    .attr("transform", function(d) { return "translate(" + (x(i-1)) + ", "+ (330 - d * 6.48) +")" })               
}

document.getElementById("sort").onclick = function () { 
stop = false;
document.getElementById("sort").disabled = true;
insertionSort(); 
};
document.getElementById("stop").onclick = function () { 
stop = true; 
document.getElementById("sort").removeAttribute('disabled');
};
document.getElementById("reset").onclick = function () { reset(); };
document.getElementById("shuffle").onclick = function () {  
array = d3.shuffle(d3.range(1,count));shuffle();
stop = true; 
d3.select("#counter").html(steps = 0)
document.getElementById("sort").removeAttribute('disabled');
};
