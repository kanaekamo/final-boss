import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//送られてくるデータの型定義
type Graphprops = {
  data: {
    type: string;
    name: string;
    labeldata: {
      label: string;
      value:number[];
    }[];
  }[];
  labelFilter: string;
}

const Graph: React.FC<Graphprops> = ({ data, labelFilter }) => {

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  //データが送られていない状態(初期)はメッセージを表示
  if (!Array.isArray(data) || data === null || data.length === 0) {
    return <div>表示したい都道府県を選択し、送信ボタンを押してください。</div>;
  }

  //送られてくるデータに対する処理
  const filteredData = data.flatMap((itemArray) => {
    if (Array.isArray(itemArray)) {
      return itemArray.map((item) => {
        //どの人口構成(label)なのかフィルターをかける
        const filteredLabelData = item.labeldata.find((data: { label: string; }) => data.label === labelFilter);
        if (filteredLabelData) {
          return {
            type: 'line',
            name: item.name,
            value: filteredLabelData.value,
          };
        }
        return null;
      }).filter((item) => item !== null);
    } else {
      console.warn("Expected itemArray to be an array, but it is not:", itemArray);
      return [];
    }
  }).flat();

  //グラフに表示するデータを定義
  const options: Highcharts.Options = {
    title:{
      text:""
    },
    xAxis: {
      title: {
        text: "年度"
      },
      categories: ['1980','1985','1990','1995','2000','2005','2010','2015','2020','2025','2030','2035','2040','2045']
    },
    yAxis: {
      title: {
        text: "人口数"
      }
    },
    series: filteredData.map(item => ({
      type: 'line',
      name: item?.name,
      data: item?.value,
    })),
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef} />
  )
}

export default Graph;