<template>
  <div id="app">
    <h1>최근 5일 동안 압력 측정 현황</h1>
    <GChart
      id="chart"
      type="LineChart"
      :data="getPressures()"
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
      pressures: [],

      chartOptions: {
        hAxis: {
          title: "손가락",
          titleTextStyle: { color: "#333" },
        },
        vAxis: {
          title: "압력",
          minValue: 10,
          ticks: [10, 15, 20, 25, 30],
        },
      },
    };
  },

  created() {
    this.getData();
  },

  methods: {
    getDate() {
      return this.$route.query.date;
    },

    async getData() {
      await axios
        .get("http://localhost:8080/home/line-graph", {
          params: {
            date: this.getDate(),
          },
        })
        .then((res) => {
          console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            this.pressures.push(res.data[i]);
          }
        })
        .catch((err) => console.log(err));
    },

    getPressures() {
      var list = [["날짜", "엄지", "검지", "중지", "약지", "새끼"]];

      for (var i in this.pressures) {
        var tmp = [];
        tmp.push(this.pressures[i].date.substr(0, 10));
        tmp.push(this.pressures[i].thumb);
        tmp.push(this.pressures[i].indexFinger);
        tmp.push(this.pressures[i].middleFinger);
        tmp.push(this.pressures[i].ringFinger);
        tmp.push(this.pressures[i].littleFinger);
        list.push(tmp);
      }
      return list;
    },
  },
};
</script>

<style>
h1 {
  margin-top: 50px;
}

#chart {
  height: 700px;
}
</style>