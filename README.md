# glocalwc-homepage

글로컬여성커뮤니티(GWC)와 GYA English Learning Center 소개용 정적 홈페이지입니다.

## 구성

- `index.html`: 메인 홈페이지
- `styles.css`: 반응형 스타일
- `script.js`: 모바일 메뉴와 헤더 스크롤 상태
- `assets/hero-education.png`: 첫 화면 대표 이미지

## 확인 방법

브라우저에서 `index.html`을 열거나, 로컬 정적 서버로 확인합니다.

```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=process.cwd();const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'};http.createServer((req,res)=>{const u=new URL(req.url,'http://x');const p=path.join(root,decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));fs.readFile(p,(e,d)=>{if(e){res.writeHead(404);res.end('not found')}else{res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream'});res.end(d)}})}).listen(8087)"
```

## 반영한 공개 정보

- 후원 계좌: 신한은행 140-015-135450, 글로컬여성커뮤니티
- 정기후원: https://go.missionfund.org/gya1
- 이메일: gwc20131128@gmail.com
- 대표/사무국 연락처와 주소
- 기존 홈페이지에 공개된 GWC & GYA 활동영상 링크 일부
