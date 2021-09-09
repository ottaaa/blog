---
title: 'SQL で GROUP BY WITH ROLLUP した際に正しく値を取得できないケース' date: '2021-09-10'
---

## 結論

GROUP BY hoge.id WITH ROLLUP のときに WITH ROLLUP のレコードでは hoge.name などを正しく取得できないケースがある。

## 前提

**MySQL バージョン: 5.6 での実行**

ユーザー(users)

|id|name|  
|--|---|  
|1 |田中|  
|2 |佐藤|  

ユーザーの決済(transactions)

|user_id|price|  
|-------|-----|  
|   1   | 1000|  
|   1   | 2000|  
|   2   | 3000|  
|   2   | 4000|  

上記のような2テーブルがあり、 ユーザーごとの合計決済額と全てのユーザーの合計決済額を出したいとする。  
そこで下記のようなSQLを実行する。

```sql
SELECT 
u.id
, u.name 
, sum(t.price)
FROM users AS u 
INNER JOIN transactions AS t
ON u.id = t.user_id
GROUP BY u.id WTIH ROLLUP
```

すると、WITH ROLLUP の結果として出力されるレコードで正しく`u.name`が表示されない。  
(`u.id`はNULLで出力されるが`u.name`はランダムで`u.name`のいずれかが出力される)

WITH ROLLUP のレコードは 全てまとめたものになっており、単一の値でないため hoge.name がランダムに取得されるため。

例えば、WITH ROLLUP のレコードにおいては`u.name`のカラムを`合計`という値で表示したい場合 下記のように記載する。

```
if(count(distinct mu.id) > 1,"合計", u.name) 
```

参考: https://stackoverflow.com/questions/42223119/if-cases-broken-when-using-rollup 



