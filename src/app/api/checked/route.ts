import { NextRequest, NextResponse } from 'next/server';

//チェックされた都道府県のデータの型定義
interface checkedData {
  value:string;
  id:string;
}
//初期値
let checkedLists: checkedData[] = [];

//人口構成APIデータから抜き出すデータの型定義
interface labelData {
  label:string;
  value:number;
}

//グラフ作成用データの型定義
interface graphData {
  type: 'line'
  name: string;
  labeldata: labelData[]
}

export async function POST(req: NextRequest) {
  //チェックされた都道府県のデータを受け取る
  try {
    const checkListData = await req.json();
    checkedLists = [...checkListData.items]
    console.log('受け取ったチェックリスト:', checkedLists);

    //受け取ったデータに対する処理
    const fetchPromises = checkedLists.map(async (checkedList) => {
      const value = checkedList.value;
      const id = checkedList.id;
      //idに対する処理
      try{
        //idを送る
        const response = await fetch('http://localhost:3000/api/v1/population/composition/perYear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        });

        //レスポンスを受け取る
        if (response.ok) {
          const iddatas = await response.json();
          //console.log('idからGETしたデータ', iddatas);

          //受け取ったレスポンスから必要な項目のみ取り出す
          const labelList: labelData[] = iddatas.result.data.map((dataItem: { label: string; data: { year: number; value: number; }[] }) => ({
            label: dataItem.label,
            value: dataItem.data.map((data: { value: number }) => data.value)
          }));

          //グラフ作成用のデータを作成
          let graphLists: graphData[] = [{
            type: 'line',
            name: `${value}`,
            labeldata: labelList
          }]

          return graphLists;

        } else {
          console.error(`ID: ${id} のリクエストでエラーが発生しました:`, response.statusText);
        }

      } catch (error) {
        console.error(`ID: ${id} でエラーが発生しました:`, error);
      }
    });

    //idに対する処理を終えて返ってきたデータを定義
    const graphLists = await Promise.all(fetchPromises);
    return NextResponse.json(graphLists);

  } catch (error) {
    console.error('都道府県データの処理エラー:', error);
  }
}
