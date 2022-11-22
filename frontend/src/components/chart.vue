<template>
  <PieChart :chartData="testData" />
</template>

<script>
import { Chart, registerables } from "chart.js";
import { PieChart } from "vue-chart-3";
Chart.register(...registerables);

export default {
  props: ["data"],
  components: { PieChart },
  data() {
    return {
      testData:{
            labels: ["adult", "funny", "Doll", "Baby"],
            datasets: [
            {
              data: [30, 40, 60, 70],
           
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
        ],
      }
    
    };
  }

  
};
</script>


