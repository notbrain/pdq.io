'use strict';

angular.module('btcApp').directive('btcGraph', function($log, APPCONFIG) {
  // $log.info('[btcGraph]')
  return {
    templateUrl: 'views/_btcGraph.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    link: function() { // attrs
      
      $log.info('[btcGraph#link:]')
      
      var margin = {top: 0, right: 0, bottom: 20, left: 35},
          width = 761 - margin.left - margin.right,
          height = 210 - margin.top - margin.bottom

          // 2014-07-13T07:57:36-07:00
      var parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S-07:00').parse

      var x = d3.time.scale()
          .range([0, width])

      var y = d3.scale.linear()
          .range([height, 0])
          
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')

      var line = d3.svg.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.price) })

      var svg = d3.select('#graphCanvas').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      d3.json(APPCONFIG.apiHost + '/coinbase/historical', function(error, data) {
        
        if(error) {$log.error(error)}
        
        data.forEach(function(d) {
          
          $log.info('raw: ' + d.date + ' parsed: ' + parseDate(d.date))
          
          d.date = parseDate(d.date)
          d.price = 0+d.price
          
        })
        
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
      })
      
    }
    
  }
  
})