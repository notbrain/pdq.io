'use strict';

angular.module('btcApp').directive('btcGraph', function($log) {
  // $log.info('[btcGraph]')
  return {
    templateUrl: 'views/_btcGraph.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      graphData: '='
    },
    link: function(scope) { // attrs
      
      $log.info('[btcGraph#link:]')
      
      scope.$watch('graphData', function(newVal, oldVal) {
        
        $log.debug('$watching historical data')
        
        if(!_.isEqual(newVal, oldVal) && !_.isEmpty(newVal)) {
          
          $log.debug('CHANGED, re-render')
          
          $log.debug(newVal)
          
          render(newVal)
          
        }
        
      })
      
      var margin = {top: 0, right: 0, bottom: 30, left: 75},
          width = 1144 - margin.left - margin.right,
          height = 210 - margin.top - margin.bottom

          // 2014-07-13T07:57:36-07:00
      var parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S').parse

      var x = d3.time.scale()
          .range([0, width])

      var y = d3.scale.linear()
          .range([height, 0])
          
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
          .ticks(6)

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
          .ticks(4)

      var line = d3.svg.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.price) })

      var svg = d3.select('#graphCanvas').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      
      var render = function(data) {
        
        // d3.json(APPCONFIG.apiHost + '/coinbase/historical', function(error, data) {
          
        // })
        var dataPoints = 0
        data.forEach(function(d) {
          dataPoints++
          d.date = parseDate(d.date)
          d.price = 0+d.price
          
        })
        
        console.log('DATA POINTS: ' + dataPoints)
        
        x.domain(d3.extent(data, function(d) { return d.date }))
        y.domain(d3.extent(data, function(d) { return d.price }))
        
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
        
        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)')
        
        svg.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', line)
        
      }
      
      
      
    }
    
  }
  
})