import { NextRequest, NextResponse } from 'next/server';

//チェックされた都道府県のデータの型定義
interface idData {
  id:string;
}
//初期値
let idDatas: idData[] = [];

export async function POST(req: NextRequest) {
  //チェックされた都道府県のデータを受け取る
  try {
    const data = await req.json();
    idDatas = [data.id]
    console.log('受け取った単一idデータ:', idDatas);
    const API_URL = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${idDatas}`;
    const res = await fetch(API_URL,{
      method: 'GET',
      headers:{
        'X-API-KEY':'aviP2Y9W9ubiRWhiVKgE9k06FJC6I75rtkIpZXhP'
      }
    });
    const getData =await res.json();
    return NextResponse.json(getData);
  } catch (error) {
    console.error('エラー:', error);
  }
}