---
title: 'zenhub の release ページで issue のタイトルだけ取得するJS'
date: '2021-06-02'
---

## コード
```javascript
title_collection =  document.getElementsByClassName("zhc-issues-list-item__title");
Array.prototype.map.call(title_collection,(title) => {return title.innerText}).join();
```




