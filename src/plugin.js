import AreaChart from './components/AreaChart';
import BarChart from './components/BarChart';
import Chart from './components/Chart';
import DataTable from './components/DataTable';
import LineChart from './components/LineChart';
import ScatterPlot from './components/ScatterPlot';
import Tooltip from './components/Tooltip';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';

const VisualistPlugin = {
  install(Vue, options) {
    let prefix = 'Vst';

    if (options.prefix) {
      prefix = options.prefix;
    }

    Vue.component(`${prefix}AreaChart`, AreaChart);
    Vue.component(`${prefix}BarChart`, BarChart);
    Vue.component(`${prefix}Chart`, Chart);
    Vue.component(`${prefix}DataTable`, DataTable);
    Vue.component(`${prefix}LineChart`, LineChart);
    Vue.component(`${prefix}ScatterPlot`, ScatterPlot);
    Vue.component(`${prefix}Tooltip`, Tooltip);
    Vue.component(`${prefix}XAxis`, XAxis);
    Vue.component(`${prefix}YAxis`, YAxis);
  },
};

export default VisualistPlugin;
