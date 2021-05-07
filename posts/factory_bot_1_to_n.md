---
title: 'FactoryBotで親子関係にあるモデルを複数作成する(子ごとに別々の親)'
date: '2021-05-08'
---

## 結論
```ruby
FactoryBot.define do
  factory :post do
    title { "Through the Looking Glass" }
    user
  end

  factory :user do
    name { "Rachel Sanchez" }
  end
end

def user_with_posts(posts_count: 5)
  FactoryBot.create(:user) do |user|
    FactoryBot.create_list(:post, posts_count, user: user)
  end
end
```
下記から引用(2021-05-07)<br>
https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#has_many-associations


## 経緯
```ruby
FactoryBot.create_list(:post, 3, user: FactoryBot.create(:user)) 
```

当初上記の書き方をしていた。<br>
各postにつき別々のuserが関連づけられると想定していたが、共通した親が関連づけられる。


```
FactoryBot.create(:user) do |user|
  FactoryBot.create_list(:post, posts_count, user: user)
end
```

引用のこの部分の実装で、子ごとに別々の親をもつモデルを作成できる。
