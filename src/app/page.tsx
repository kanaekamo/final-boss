"use client"
import { useEffect, useState } from 'react';
import Graph from '../components/graph';
import { NextResponse } from 'next/server';

//都道府県取得APIの型指定
interface Prefecture {
  prefCode: number;
  prefName: string;
}

export default function Home() {
  //都道府県APIの取得
  const [results, setResults] = useState<Prefecture[]>([]);
  useEffect(()=>{
    const getResults = async () => {
      const response = await fetch('/api/v1/prefectures');
      const data = await response.json();
      setResults(data.result);
    };
    getResults();
  }, []);

  //チェックを入れた時の動作
  let [checkedItems, setCheckedItems] = useState<{ value: string; id: string }[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id, checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, { value, id }]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter(item => item.value !== value));
    }
  };

  const [graphData, setGraphData] = useState<any>(null);

  //送信ボタンを押した時の動作
  const handleSubmit = async () => {
    try {
      const requestData = {
        items: checkedItems,
        };
      const response = await fetch('/api/checked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), 
      });

      if (response.ok) {
        const graphLists = await response.json();
        console.log('グラフファイルへ送るデータ', graphLists);
        setGraphData(graphLists);
        return NextResponse.json(graphLists);
      }
    
    }catch (error) {
      console.error('都道府県データ送信エラーが発生しました:', error);
    }
  };

  //人口構成タブの切り替え
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value);
  };

  return (
    <div className="min-h-full">
      <header className="bg-blue-800 p-4 text-center sm:text-4xl text-3xl text-white font-bold">
        都道府県別 人口数グラフ
      </header>
      <main className="xl:mx-60 lg:mx-32 md:mx-12 mx-1 my-8">
        <div className="mb-4">
          <h1 className="sm:text-3xl text-2xl font-bold">■都道府県 選択</h1>
          <p className="sm:text-lg text-sm mx-8 mb-4">表示したい都道府県を選択し、送信ボタンを押してください。</p>
          <div className="mx-8 grid sm:grid-cols-5 grid-cols-3 gap-4">
            {results.map((result) => (
              <div key={result.prefCode}>
                <input type="checkbox" id={`${result.prefCode}`} onChange={handleCheckboxChange} value={result.prefName} name='todohuken' className="w-5 h-5" />
                <label htmlFor={`${result.prefCode}`} className="text-xl">{result.prefName}</label>
              </div>
            ))}
          </div>
          <button className='m-4 py-1 px-2 outline outline-1 rounded bg-gray-300 active:bg-gray-500' onClick={handleSubmit}>送信</button>
        </div>
        <div>
          <h1 className="sm:text-3xl text-2xl font-bold">■人口数グラフ</h1>
          <p className="sm:text-lg text-sm mx-8 mb-4">表示する人口構成をタブで切り替え</p>
          <div className="flex">
            <input type="radio" id="all" value="all" name="jinko" className="hidden peer/all" checked={selectedRadio === 'all'} onChange={handleRadioChange} />
              <label htmlFor="all" className="p-2 outline outline-1 outline-offset-[-1px] rounded-t-lg peer-checked/all:bg-blue-800 peer-checked/all:text-white peer-checked/all:outline-blue-800 peer-checked/all:outline-2 cursor-pointer">総人口</label>
            <input type="radio" id="kid" value="kid" name="jinko" className="hidden peer/kid" checked={selectedRadio === 'kid'} onChange={handleRadioChange} />
              <label htmlFor="kid" className="p-2 outline outline-1 outline-offset-[-1px] rounded-t-lg peer-checked/kid:bg-blue-800 peer-checked/kid:text-white peer-checked/kid:outline-blue-800 peer-checked/kid:outline-2 cursor-pointer">年少人口</label>
            <input type="radio" id="sei" value="sei" name="jinko" className="hidden peer/sei" checked={selectedRadio === 'sei'} onChange={handleRadioChange} />
              <label htmlFor="sei" className="p-2 outline outline-1 outline-offset-[-1px] rounded-t-lg peer-checked/sei:bg-blue-800 peer-checked/sei:text-white peer-checked/sei:outline-blue-800 peer-checked/sei:outline-2 cursor-pointer">生産年齢人口</label>
            <input type="radio" id="old" value="old" name="jinko" className="hidden peer/old" checked={selectedRadio === 'old'} onChange={handleRadioChange} />
              <label htmlFor="old" className="p-2 outline outline-1 outline-offset-[-1px] rounded-t-lg peer-checked/old:bg-blue-800 peer-checked/old:text-white peer-checked/old:outline-blue-800 peer-checked/old:outline-2 cursor-pointer">老年人口</label>
          </div>
          <div className="outline outline-offset-[-2px] outline-blue-800">
            {selectedRadio === 'all' && (
              <Graph data={graphData} labelFilter="総人口" />
            )}
            {selectedRadio === 'kid' && (
              <Graph data={graphData} labelFilter="年少人口" />
            )}
            {selectedRadio === 'sei' && (
              <Graph data={graphData} labelFilter="生産年齢人口" />
            )}
            {selectedRadio === 'old' && (
              <Graph data={graphData} labelFilter="老年人口" />
            )}
          </div>
        </div>
      </main>
      <footer className="bg-gray-400 py-8 text-center bottom-0 w-full sm:text-base text-sm">
        <p>
          API取得 : <a href="https://opendata.resas-portal.go.jp/" className="underline text-blue-900">https://opendata.resas-portal.go.jp/</a>
        </p>
        <p>Page created by Kanae Sugiura</p>
      </footer>
    </div>
  );
}
