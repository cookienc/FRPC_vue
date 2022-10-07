<template>
  <div id="app">
    <h1>손가락 압력 그래프</h1>
    <GChart
      id="chart"
      type="AreaChart"
      :settings="{ packages: ['corechart'] }"
      :data="getChartInfo()"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import axios from "axios";
import { GChart } from "vue-google-charts";

export default {
  name: "App",

  components: {
    GChart,
  },

  data() {
    return {
      sensor: {
        flexes: [],
        pressures: [],
        criteria: [],
      },

      chartOptions: {
        hAxis: {
          title: "손가락",
          titleTextStyle: { color: "#333" },
        },
        vAxis: {
          title: "압력",
          minValue: 0,
          ticks: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
        },
      },
    };
  },

  created() {
    return this.getData();
  },

  methods: {
    getChartInfo() {
      return [
        ["손가락", "기준", "사용자"],
        ["엄지", this.sensor.criteria.thumb, this.sensor.pressures.thumb],
        [
          "검지",
          this.sensor.criteria.indexFinger,
          this.sensor.pressures.indexFinger,
        ],
        [
          "중지",
          this.sensor.criteria.middleFinger,
          this.sensor.pressures.middleFinger,
        ],
        [
          "약지",
          this.sensor.criteria.ringFinger,
          this.sensor.pressures.ringFinger,
        ],
        [
          "새끼",
          this.sensor.criteria.littleFinger,
          this.sensor.pressures.thumb,
        ],
      ];
    },
    async getData() {
      await axios
        .get("http://localhost:8080/home/bar-graph", {
          params: {
            pressureId: 1,
            flexId: 1,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.sensor.criteria = res.data.criteria;
          this.sensor.flexes = res.data.flexes;
          this.sensor.pressures = res.data.pressures;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
#chart {
  border: 5px;
  height: 700px;
}
</style>