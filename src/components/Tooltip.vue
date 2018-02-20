<template>
  <g class="tooltip-layer"></g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'tooltip',
  props: [],

  data() {
    return {
    };
  },

  mounted() {
    this.initializeTooltip();
  },

  updated() {
  },

  methods: {
    initializeTooltip() {
      // Wait for parent to update first
      this.$nextTick(() => {
        // TODO: check if already exists!
        const tooltip = d3.select(this.$parent.$el)
          .append('div');

        tooltip.attr('class', 'tooltip-container')
          .style('display', 'none')
          .text('');

        const { xScale } = this.$parent;
        const tooltipLayer = d3.select(this.$el);
        const tooltipMouseCatcher = tooltipLayer.append('rect');

        const verticalPositionIndicator = tooltipLayer.append('line')
          .attr('y1', this.$parent.paddings.top)
          .attr('y2', this.$parent.height - this.$parent.paddings.bottom)
          .attr('x1', 100)
          .attr('x2', 100)
          .style('stroke-width', '1px')
          .style('stroke', 'rgba(60, 60, 60, 0.5)')
          .style('stroke-dasharray', 10)
          .style('display', 'none');

        const svgRect = this.$parent.$el.querySelector('svg').getBoundingClientRect();
        const shadowPadding = 8;
        const yOffset = -50;
        const xOffset = 30;

        // TODO: we should inject empty 0s to data before this can be done reliably.
        const bisector = d3.bisector(d => d[this.$parent.dataX]).left;

        const parentRef = this.$parent;

        tooltipMouseCatcher
          .attr('width', this.$parent.width)
          .attr('height', this.$parent.height)
          // .attr('transform',
          //   `translate(${this.$parent.paddings.left}, ${this.$parent.paddings.top})`)
          .style('fill', 'none')
          .style('pointer-events', 'all');

        function moveMouseAndSetText() {
          // mouse position in x
          const xCoordinate = d3.mouse(this)[0];
          // const adjustedXCoordinate = xCoordinate + this.$parent.paddings.left;
          const y = d3.mouse(this)[1];
          // xValue corresponding to mouse x
          const xValue = parentRef.xScale.invert(xCoordinate);

          // const xValues = parentRef.vstData.map(d => d.x);
          const foundX = bisector(parentRef.vstData, xValue);
          const roundedXCoordinate = xScale(foundX);
          const data = parentRef.vstData.filter(d => d.x === foundX);

          if (data.length === 0) {
            tooltip.style('display', 'none');
            verticalPositionIndicator.style('display', 'none');
          } else {
            tooltip.style('display', 'block')
              .style('left', `${svgRect.left + shadowPadding + roundedXCoordinate + xOffset}px`)
              .style('top', `${svgRect.top + shadowPadding + y + yOffset}px`)
              .text(`x: ${data[0][this.$parent.dataX]} y: ${data[0][this.dataKey]}`);
            verticalPositionIndicator.style('display', 'block')
              .attr('x1', roundedXCoordinate)
              .attr('x2', roundedXCoordinate);
          }
        }

        tooltipMouseCatcher
          .on('mouseover', moveMouseAndSetText)
          .on('mousemove', moveMouseAndSetText)
          .on('mouseout', () => {
            tooltip.style('display', 'none');
          });
      });
    },
  },

};
</script>

<style lang="scss">
g.tooltip-layer {
}

.tooltip-container {
  font-size: 14px;
  text-align: center;
  font-weight: bold;

  padding: 1em;
  min-width: 100px;
  position: absolute;

  border-radius: 8px;
  padding: 6px;
  color: #68d;
  background: rgba(255, 255, 255, 0.75);
  border: solid 2px rgba(220, 220, 220, 0.8);
}
</style>
