import { NextResponse } from 'next/server';

//API取得するURL
const API_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

export async function GET() {
  try{
    //APIキー
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("APIキーがありません");
      return;
    }
    const res = await fetch(API_URL,{
      headers:{
        'X-API-KEY': apiKey
      }
    });
    //json形式を指定
    const data =await res.json();
    //取得したjsonを返す
    return NextResponse.json(data);
  } catch (error) {
    console.error('都道府県取得エラー:', error);
  }
}