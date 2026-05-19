# 견적서 뷰어

노션 데이터베이스에 입력한 견적서를 클라이언트가 별도 계정 없이 공유 URL 하나로 확인하고 PDF로 저장할 수 있는 웹 앱.

## 프로젝트 개요

**목적**: 프리랜서 및 1인 사업자가 Notion에 작성한 견적서를 클라이언트에게 URL 하나로 공유하고, 클라이언트는 계정 없이 견적서를 확인하고 PDF로 저장할 수 있습니다.

**사용자**:

- 어드민 (프리랜서/1인 사업자): Notion에 견적서 작성 후 공유 URL을 클라이언트에게 전달
- 클라이언트 (견적서 수신자): 공유 URL로 접속하여 견적서 확인 및 PDF 다운로드

## 주요 페이지

| 경로            | 설명                       | 인증          |
| --------------- | -------------------------- | ------------- |
| `/invoice/[id]` | 견적서 상세 + PDF 다운로드 | 불필요 (공개) |
| `/admin`        | 견적서 목록 + URL 복사     | 어드민 필요   |
| `/admin/login`  | 어드민 패스워드 로그인     | -             |

## 핵심 기능

- **견적서 조회 (F001)**: Notion API로 특정 페이지 ID의 견적서 데이터 조회
- **견적서 렌더링 (F002)**: 발행일, 수신자, 항목별 금액, 합계 등 시각적 레이아웃
- **PDF 다운로드 (F003)**: html2canvas + jspdf로 브라우저에서 PDF 생성
- **공유 URL 복사 (F004)**: 어드민이 클라이언트에게 전달할 URL 클립보드 복사
- **견적서 목록 (F005)**: Notion 데이터베이스 전체 견적서 목록 조회
- **어드민 인증 (F010)**: 환경변수 패스워드 기반 httpOnly 쿠키 인증

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (new-york style) + Lucide Icons
- **Forms**: React Hook Form + Zod + Server Actions
- **Data**: @notionhq/client (Notion API)
- **PDF**: html2canvas + jspdf
- **Auth**: httpOnly 쿠키 (별도 라이브러리 없음)
- **Deploy**: Vercel

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 아래 항목을 설정합니다.

```bash
NOTION_API_KEY=secret_xxxx
NOTION_DATABASE_ID=xxxx
ADMIN_NAME=홍길동
ADMIN_EMAIL=hello@example.com
ADMIN_PHONE=010-0000-0000
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### 3. 추가 패키지 설치 (구현 단계)

```bash
# Notion API 클라이언트
npm install @notionhq/client

# PDF 생성
npm install html2canvas jspdf
```

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 접속 시 `/admin`으로 자동 리다이렉트됩니다.

## 개발 상태

- [x] 기본 프로젝트 구조 스캐폴딩
- [x] TypeScript 타입 정의 (`Invoice`, `InvoiceItem`)
- [x] 페이지 구조 (invoice/[id], admin, admin/login)
- [x] 컴포넌트 구조 (invoice, admin)
- [x] 미들웨어 기반 어드민 인증
- [x] Server Actions (로그인/로그아웃)
- [x] API 라우트 구조
- [ ] Notion API 클라이언트 연동 (`@notionhq/client` 설치 후)
- [ ] PDF 생성 기능 (`html2canvas`, `jspdf` 설치 후)
- [ ] Notion 데이터 매핑 로직

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 로드맵](./docs/ROADMAP.md) - 개발 계획
- [개발 가이드](./CLAUDE.md) - Claude Code 개발 지침
