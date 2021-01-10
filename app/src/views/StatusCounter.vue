<template>
  <div>
    <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import axios from "axios";
import BarChart from "../BarChart.js";
export default {
  name: "App",
  components: {
    BarChart,
  },
  data() {
    return {
      counter: [],
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        maintainAspectRatio: false,
        datasets: [
          {
            label: "",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "Yellow","Red"],
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    getCount() {
      let url = `${this.api}counter`;
      axios.get(url).then((res) => {
        this.counter = res.data;

        let Total =
          this.counter.approved +
          this.counter.disApproved +
          this.counter.notYetEncoded +
          this.counter.forApproval+
          this.counter.obsolete;

        this.chartData.datasets[0].label = `Total: ${Total}`;
        this.chartData.datasets[0].data = [
          this.counter.approved,
          this.counter.disApproved,
          this.counter.notYetEncoded,
          this.counter.forApproval,
          this.counter.obsolete
        ];

        this.chartData.labels = [
          `Approved:${this.counter.approved}`,
          `Disapproved:${this.counter.disApproved}`,
          `For Encoding:${this.counter.notYetEncoded}`,
          `For Approval: ${this.counter.forApproval}`,
          `Obsolete: ${this.counter.obsolete}`
        ];

      });
    },
  },
  mounted() {
    this.getCount();
    console.log(this.chartData)
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
