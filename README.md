# brainrot-relay

Send memes through the POST endpoint

## Features
- Upload Types (Edit according to needs)
  - image/jpeg
  - image/png
  - image/gif
  - image/webp
- Express rate limiting
- 5 MB Upload Limit
- Helmet HTTP header security
- Randomize filename with `crypto.randomBytes()`
- Filetype filtering

> [!NOTE]
> Likely improving in future

## Setup

```bash
git clone https://github.com/endrit-ademi11100/brainrot-relay
cd brainrot-relay
npm install
mkdir -p public/uploads/
npm start
```

You should change `URL` in server.js if hosting.

