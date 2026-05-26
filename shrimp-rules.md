# Development Guidelines for invoice-web

## 1. 프로젝트 개요

- **목적**: Notion 데이터베이스의 견적서를 공유 URL로 클라이언트에게 전달하고 PDF 다운로드를 제공하는 웹앱
- **스택**: Next.js 15.5.3 (App Router) + React 19 + TypeScript 5 + TailwindCSS v4 + shadcn/ui (new-york)
- **데이터 소스**: Notion API (`@notionhq/client`) — 서버사이드 전용
- **PDF 생성**: html2canvas + jspdf — 클라이언트(브라우저) 전용
- **인증**: httpOnly 쿠키 기반 어드민 인증 (별도 인증 라이브러리 없음)

---

## 2. MVP 범위

### 구현 대상 기능 (MVP 필수)

| ID   | 기능명                          | 구현 위치                                                                |
| ---- | ------------------------------- | ------------------------------------------------------------------------ |
| F001 | 견적서 데이터 조회 (Notion API) | `src/lib/notion/get-invoice.ts`                                          |
| F002 | 견적서 웹 렌더링                | `src/components/invoice/invoice-view.tsx`                                |
| F003 | PDF 다운로드                    | `src/lib/pdf/generate-pdf.ts` + `pdf-download-button.tsx`                |
| F004 | 견적서 URL 생성 및 복사         | `src/components/admin/copy-url-button.tsx`                               |
| F005 | 견적서 목록 조회                | `src/lib/notion/get-invoices.ts` + `invoice-list-table.tsx`              |
| F010 | 어드민 인증 (쿠키 기반)         | `src/lib/auth/admin-auth.ts` + `middleware.ts` + `admin-auth-actions.ts` |
| F011 | 404 / 에러 처리                 | `src/app/invoice/[id]/not-found.tsx`                                     |

### MVP 이후 기능 (현재 구현 금지)

- 견적서 상태 관리 (발송됨 → 승인됨 → 거절됨 전환)
- 클라이언트 서명 기능
- 견적서 이메일 자동 발송
- 견적서 만료일 설정 및 접근 차단
- 다국어 지원
- 견적서 템플릿 관리

**MVP 이후 기능 요청이 들어오면 구현하지 않고 명시적으로 거절한다.**

---

## 3. 아키텍처 및 디렉토리 구조

```
src/
├── app/
│   ├── invoice/[id]/
│   │   ├── page.tsx          # 공개 견적서 상세 (SSR)
│   │   └── not-found.tsx     # 404
│   ├── admin/
│   │   ├── page.tsx          # 어드민 대시보드 (SSR + 미들웨어 보호)
│   │   └── login/page.tsx    # 어드민 로그인 (CSR)
│   └── api/
│       ├── invoice/[id]/route.ts       # 공개 API
│       └── admin/invoices/route.ts     # 어드민 전용 API
├── actions/
│   └── admin-auth-actions.ts  # Server Actions (로그인/로그아웃)
├── components/
│   ├── invoice/               # 견적서 전용 컴포넌트
│   ├── admin/                 # 어드민 전용 컴포넌트
│   ├── layout/                # 레이아웃 컴포넌트
│   ├── providers/             # Context 프로바이더
│   └── ui/                    # shadcn/ui 컴포넌트 (자동 생성, 수동 편집 금지)
├── lib/
│   ├── notion/                # Notion API 유틸 (서버 전용)
│   ├── pdf/                   # PDF 생성 유틸 (클라이언트 전용)
│   ├── auth/admin-auth.ts     # 쿠키 검증 유틸
│   ├── types/invoice.ts       # 모든 Invoice 타입 정의 위치
│   ├── env.ts                 # 환경변수 검증
│   └── utils.ts               # 공통 유틸 (cn 함수 등)
└── middleware.ts               # /admin/* 경로 인증 게이트
```

---

## 4. 데이터 흐름

```
Notion Database
    ↓ (서버사이드: @notionhq/client)
src/lib/notion/get-invoice.ts (단건 조회)
src/lib/notion/get-invoices.ts (목록 조회)
    ↓
src/app/api/invoice/[id]/route.ts      (공개 API)
src/app/api/admin/invoices/route.ts    (어드민 API)
    ↓
src/app/invoice/[id]/page.tsx          (SSR 렌더링)
src/app/admin/page.tsx                 (SSR 렌더링)
    ↓
src/components/invoice/invoice-view.tsx
src/components/admin/invoice-list-table.tsx
    ↓ (브라우저)
src/lib/pdf/generate-pdf.ts            (PDF 생성, 클라이언트 전용)
```

---

## 5. 핵심 파일 상호작용 규칙

### 인증 시스템 변경 시 반드시 동시 수정

| 변경 내용                 | 수정 파일                                                          |
| ------------------------- | ------------------------------------------------------------------ |
| 쿠키 이름 변경            | `src/lib/auth/admin-auth.ts` + `src/middleware.ts`                 |
| 쿠키 값/검증 로직 변경    | `src/lib/auth/admin-auth.ts` + `src/middleware.ts`                 |
| 로그인/로그아웃 흐름 변경 | `src/actions/admin-auth-actions.ts` + `src/lib/auth/admin-auth.ts` |

- 쿠키 이름 상수: `ADMIN_COOKIE_NAME = 'admin_session'` (`src/lib/auth/admin-auth.ts`)
- 쿠키 값: `'authenticated'` (isAdminAuthenticated 검증 기준)

### 환경변수 추가 시 반드시 동시 수정

- `src/lib/env.ts` (검증 로직 추가)
- `.env.example` (예시값 추가)

### Invoice 타입 변경 시

- `src/lib/types/invoice.ts` 수정
- Notion 매핑 함수 (`src/lib/notion/get-invoice.ts`, `get-invoices.ts`) 동시 업데이트

---

## 6. 서버/클라이언트 경계 규칙

### 서버 전용 (절대 클라이언트 컴포넌트에서 import 금지)

- `src/lib/notion/*.ts` — @notionhq/client 포함
- `src/lib/auth/admin-auth.ts` — next/headers 사용
- `src/actions/*.ts` — 'use server' 선언

### 클라이언트 전용 ('use client' 필수)

- `src/lib/pdf/generate-pdf.ts` — html2canvas, jspdf (브라우저 API 필요)
- `src/components/invoice/pdf-download-button.tsx`
- `src/components/admin/copy-url-button.tsx`
- `src/app/admin/login/page.tsx` — React Hook Form 사용

### 판단 기준

- DOM 직접 조작, window/document 접근 → 클라이언트 전용
- Notion API 호출, 쿠키 읽기/쓰기, 환경변수(서버 전용) 접근 → 서버 전용
- SSR 페이지에서 클라이언트 전용 로직이 필요한 경우 → 별도 클라이언트 컴포넌트로 분리

---

## 7. 인증 시스템 규칙

- `/admin/login`은 미들웨어 검사 제외 (무한 리다이렉트 방지)
- `/admin/*` 전체는 미들웨어(`src/middleware.ts`)가 쿠키 검증
- Route Handler에서 어드민 API를 보호할 때: `isAdminAuthenticated()` 호출 필수
- `GET /api/invoice/[id]` — 인증 불필요 (공개)
- `GET /api/admin/invoices` — `isAdminAuthenticated()` 검증 후 401 반환 필수

### Server Action 응답 타입

```typescript
// src/actions/admin-auth-actions.ts의 ActionResult 타입 재사용
export interface ActionResult {
  success: boolean
  error?: string
}
```

---

## 8. Notion API 통합 규칙

### Notion 데이터베이스 프로퍼티 → TypeScript 필드 매핑

| Notion 프로퍼티 (snake_case) | TypeScript 필드 (camelCase) | 타입                             |
| ---------------------------- | --------------------------- | -------------------------------- |
| `title`                      | `title`                     | Title 블록                       |
| `client_name`                | `clientName`                | Rich Text                        |
| `client_email`               | `clientEmail`               | Email                            |
| `issue_date`                 | `issueDate`                 | Date                             |
| `due_date`                   | `dueDate`                   | Date                             |
| `status`                     | `status`                    | Select: '초안'/'발송됨'/'확정됨' |
| `currency`                   | `currency`                  | Select: 'KRW'/'USD'              |
| `note`                       | `note`                      | Rich Text                        |

- 견적 항목(InvoiceItem)은 Notion 페이지 본문의 **Simple Table 블록**에서 추출
- 테이블 첫 행은 헤더(항목명/수량/단가/금액), 두 번째 행부터 데이터
- Notion 클라이언트 초기화: `src/lib/notion/client.ts`에서만 수행

### 현재 미구현 항목 (구현 시 TODO 주석 제거)

- `src/lib/notion/get-invoice.ts` — Notion API 연동 로직
- `src/lib/notion/get-invoices.ts` — Notion API 연동 로직
- `src/lib/pdf/generate-pdf.ts` — html2canvas + jspdf 구현
- `src/components/invoice/pdf-download-button.tsx` — PDF 다운로드 버튼 로직

---

## 9. 컴포넌트 배치 규칙

| 컴포넌트 유형                              | 위치                        |
| ------------------------------------------ | --------------------------- |
| 견적서 렌더링/PDF/항목 테이블              | `src/components/invoice/`   |
| 어드민 목록 테이블/URL 복사 버튼/로그인 폼 | `src/components/admin/`     |
| 페이지 레이아웃, 컨테이너                  | `src/components/layout/`    |
| shadcn/ui 기본 컴포넌트                    | `src/components/ui/`        |
| Context Provider                           | `src/components/providers/` |

### 네이밍

- 파일명: kebab-case (`invoice-item-table.tsx`)
- 컴포넌트명: PascalCase (`InvoiceItemTable`)
- 클라이언트 컴포넌트 파일명 패턴: `*-button.tsx`, `*-form.tsx`

---

## 10. 타입 시스템 규칙

- 모든 Invoice 관련 타입은 `src/lib/types/invoice.ts` 한 곳에만 정의
- 새 타입 추가 시 이 파일에만 추가 (분산 금지)
- 핵심 타입:
  - `Invoice` — 견적서 전체 (items 포함)
  - `InvoiceSummary` — 목록용 요약 (items, note 제외)
  - `InvoiceItem` — 견적 항목 단건
  - `InvoiceStatus` — `'초안' | '발송됨' | '확정됨'`
  - `InvoiceCurrency` — `'KRW' | 'USD'`

---

## 11. 환경변수 관리

| 변수명                 | 용도                    | 서버/클라이언트      |
| ---------------------- | ----------------------- | -------------------- |
| `NOTION_API_KEY`       | Notion Integration 토큰 | 서버 전용            |
| `NOTION_DATABASE_ID`   | 견적서 DB ID            | 서버 전용            |
| `ADMIN_NAME`           | 견적서 발행자 이름      | 서버 전용            |
| `ADMIN_EMAIL`          | 발행자 이메일           | 서버 전용            |
| `ADMIN_PHONE`          | 발행자 연락처           | 서버 전용            |
| `ADMIN_PASSWORD`       | 어드민 로그인 패스워드  | 서버 전용            |
| `NEXT_PUBLIC_BASE_URL` | 배포 도메인             | 클라이언트 접근 가능 |

- `NEXT_PUBLIC_` 접두사 없는 변수는 클라이언트 컴포넌트에서 접근 불가
- 환경변수 검증은 `src/lib/env.ts`에서 수행

---

## 12. AI 결정 기준

### 새 기능 추가 위치 판단 트리

```
새 기능 필요
├── Notion 데이터 읽기/쓰기?
│   └── → src/lib/notion/ 에 함수 추가 (서버 전용)
├── 어드민 전용?
│   ├── UI 컴포넌트 → src/components/admin/
│   └── API → src/app/api/admin/ (isAdminAuthenticated 필수)
├── 클라이언트 데이터 가공?
│   └── → src/lib/ 하위에 유틸 파일 추가
└── 페이지 추가?
    ├── 공개 → src/app/ (인증 불필요)
    └── 어드민 → src/app/admin/ (미들웨어 자동 적용)
```

### 폼 처리 방식 선택

- 어드민 로그인 폼 → React Hook Form + Zod + Server Action (기존 패턴 유지)
- 새 폼 추가 시 동일 패턴 적용

### 에러 처리 위치

- Notion API 오류 → `getInvoice()` 내부에서 null 반환 → 페이지에서 `notFound()` 호출
- 어드민 API 인증 실패 → 401 Response 반환

---

## 13. 금지 사항

- `src/components/ui/` 파일 직접 수동 편집 금지 — shadcn/ui CLI로만 추가/업데이트
- `@notionhq/client`를 클라이언트 컴포넌트에서 import 금지
- `html2canvas`, `jspdf`를 서버 컴포넌트/Server Action에서 import 금지
- `src/lib/auth/admin-auth.ts`의 `ADMIN_COOKIE_NAME` 상수를 파일 외부에서 직접 문자열로 하드코딩 금지 — 반드시 import해서 사용
- `/admin/login`을 미들웨어 matcher에 포함 금지 (무한 리다이렉트 발생)
- `cookies()` 함수를 클라이언트 컴포넌트에서 사용 금지
- 상대 경로 import 사용 금지 — 반드시 `@/` 경로 별칭 사용
- 새 Invoice 관련 타입을 `src/lib/types/invoice.ts` 외부에 정의 금지
- `ADMIN_PASSWORD` 환경변수를 클라이언트 번들에 노출 금지 (`NEXT_PUBLIC_` 접두사 추가 금지)
- Server Action 파일(`src/actions/*.ts`)에서 `'use server'` 선언 제거 금지
