import { NextResponse } from 'next/server';

//API取得するURL
const API_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

export async function GET() {
  try{
    //APIキーの設定
    const res = await fetch(API_URL,{
      headers:{
        'X-API-KEY':'aviP2Y9W9ubiRWhiVKgE9k06FJC6I75rtkIpZXhP'
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