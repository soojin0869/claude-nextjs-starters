# Invoice Web 개발 로드맵

노션 데이터베이스 기반 견적서를 공유 URL 하나로 클라이언트에게 전달하고 PDF 다운로드까지 제공하는 웹 앱

## 개요

**Invoice Web**은 프리랜서 및 1인 사업자(어드민)와 그 클라이언트(수신자)를 위한 노션 기반 견적서 웹 뷰어 서비스로 다음 기능을 제공합니다:

- **견적서 공유 URL**: 노션 페이지 ID 기반의 공개 견적서 URL을 통해 클라이언트가 별도 계정 없이 접근
- **PDF 다운로드**: 화면에 표시된 견적서를 브라우저에서 PDF 파일로 생성·저장
- **어드민 대시보드**: 환경변수 패스워드 인증으로 보호된 견적서 목록 관리 및 URL 복사 기능

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `012`라면 `011`과 `010`을 예시로 참조.
- 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 ✅로 표시

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

- **Task 001: 프로젝트 구조 및 라우팅 설정** ✅ - 완료
  - ✅ Next.js 15 App Router 기반 전체 라우트 디렉토리 구조 생성 (`/invoice/[id]`, `/admin`, `/admin/login`)
  - ✅ 견적서 상세 페이지(`app/invoice/[id]/page.tsx`) 빈 껍데기 생성 (SSR 컴포넌트)
  - ✅ 어드민 대시보드(`app/admin/page.tsx`) 및 로그인 페이지(`app/admin/login/page.tsx`) 빈 껍데기 생성
  - ✅ 견적서 없음 에러 페이지(`app/invoice/[id]/not-found.tsx`) 골격 작성
  - ✅ 루트 레이아웃(`app/layout.tsx`) 및 메타데이터 기본 설정
  - ✅ API 라우트 디렉토리 구조 생성 (`app/api/invoice/[id]/route.ts`, `app/api/admin/invoices/route.ts`)
  - ✅ `middleware.ts` 골격 작성 (어드민 경로 보호용 - 실제 로직은 Phase 3에서)

- **Task 002: 타입 정의 및 인터페이스 설계** ✅ - 완료
  - ✅ `lib/types/invoice.ts`에 견적서 도메인 타입 정의 (`Invoice`, `InvoiceItem`, `InvoiceStatus` 등)
  - ✅ Notion 페이지 속성 매핑을 위한 타입 인터페이스 정의 (`NotionInvoicePage`, `NotionPropertyMap`)
  - ✅ API 응답 타입 정의 (`InvoiceResponse`, `InvoiceListResponse`, `ErrorResponse`)
  - ✅ 어드민 인증 관련 타입 정의 (`AdminAuthState`, `LoginFormSchema`)
  - ✅ Zod 스키마 정의 파일 분리 (`lib/schemas/`)
  - ✅ Notion 데이터베이스 스키마 문서화 (실제 구현은 Phase 3에서)

- **Task 003: 라이브러리 폴더 골격 및 환경변수 설정** ✅ - 완료
  - ✅ `lib/notion/` 디렉토리 골격 생성 (`client.ts`, `get-invoice.ts`, `get-invoices.ts` 빈 함수 시그니처)
  - ✅ `lib/pdf/generate-pdf.ts` 빈 함수 시그니처 작성
  - ✅ `lib/auth/admin-auth.ts` 빈 함수 시그니처 작성 (쿠키 read/write 헬퍼)
  - ✅ `actions/admin-auth-actions.ts` Server Action 골격 작성
  - ✅ `.env.example` 갱신 (NOTION_TOKEN, NOTION_DATABASE_ID, ADMIN_PASSWORD, ADMIN_COOKIE_NAME)
  - ✅ 환경변수 타입 안전성을 위한 `env.ts` 검증 모듈 구성

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅

- **Task 004: 공통 컴포넌트 라이브러리 구현** ✅ - 완료
  - ✅ shadcn/ui 기반 필수 컴포넌트 추가 (`button`, `input`, `table`, `card`, `label`, `toast`, `dialog`)
  - ✅ 디자인 토큰 및 스타일 가이드 적용 (TailwindCSS v4 기반)
  - ✅ 인쇄용(`@media print`) 글로벌 CSS 규칙 추가
  - ✅ 더미 데이터 팩토리 작성 (`lib/mocks/invoice-mocks.ts`) - 견적서 단건/목록 픽스처 제공
  - ✅ 공통 로딩/에러 상태 컴포넌트 작성 (`components/common/loading.tsx`, `error-state.tsx`)
  - ✅ 한국어 로케일 통화/날짜 포맷 유틸 작성 (`lib/utils/format.ts`)

- **Task 005: 견적서 상세 페이지 UI 구현** ✅ - 완료
  - ✅ `components/invoice/invoice-view.tsx` 구현 (헤더/발행자/수신자/메타정보 영역)
  - ✅ `components/invoice/invoice-item-table.tsx` 구현 (품목·수량·단가·합계 테이블)
  - ✅ 합계/부가세/총액 요약 섹션 컴포넌트 작성
  - ✅ `components/invoice/pdf-download-button.tsx` UI만 구현 (클릭 핸들러 더미)
  - ✅ 모바일/데스크톱 반응형 레이아웃 적용 및 인쇄용 스타일 확인
  - ✅ 견적서 없음(not-found) 페이지 UI 완성 (안내 문구·문의 텍스트)
  - ✅ 더미 데이터를 사용해 견적서 페이지 시각적 완성도 확인

- **Task 006: 어드민 페이지 UI 구현** ✅ - 완료
  - ✅ `app/admin/login/page.tsx` UI 구현 (React Hook Form + Zod 폼, 클라이언트 컴포넌트)
  - ✅ `components/admin/invoice-list-table.tsx` 구현 (제목, 수신자, 발행일, 상태, 액션 컬럼)
  - ✅ `components/admin/copy-url-button.tsx` UI 구현 (toast 피드백 포함)
  - ✅ 어드민 대시보드 헤더 및 로그아웃 버튼 UI 구성
  - ✅ 빈 목록(empty state) 및 로딩 스켈레톤 컴포넌트 작성
  - ✅ 더미 견적서 목록을 활용한 페이지 시각적 검증 및 반응형 점검

### Phase 3: 핵심 기능 구현 ✅

- **Task 007: Notion API 클라이언트 및 데이터 조회 구현** ✅ - 완료
  - ✅ `@notionhq/client`로 `lib/notion/client.ts` 싱글톤 인스턴스 구현
  - ✅ `lib/notion/get-invoice.ts` 구현: 페이지 ID로 단건 조회 후 도메인 타입으로 매핑
  - ✅ `lib/notion/get-invoices.ts` 구현: 데이터베이스 쿼리로 목록 조회 (정렬·필터 옵션)
  - ✅ Notion 속성 매퍼 유틸 작성 (`lib/notion/mappers.ts`) - 제목/숫자/날짜/리치텍스트 변환
  - ✅ 견적서 상세 페이지 SSR에서 실제 Notion 데이터 사용으로 교체 (더미 제거)
  - ✅ `generateMetadata`로 견적서 제목/설명 동적 메타 태그 적용
  - ✅ 잘못된 ID/삭제된 페이지에 대한 `notFound()` 호출 처리
  - **테스트 체크리스트 (Playwright MCP)**:
    - 유효한 견적서 ID로 접근 시 데이터가 올바르게 렌더링되는지 확인
    - 존재하지 않는 ID 접근 시 not-found 페이지로 분기되는지 확인
    - Notion API 일시 오류 시 에러 페이지 노출 확인
    - SSR 응답에 견적서 핵심 데이터(제목/금액/합계)가 포함되는지 확인

- **Task 008: 어드민 인증 시스템 구현** ✅ - 완료
  - ✅ `actions/admin-auth-actions.ts`에 `adminLoginAction`, `adminLogoutAction` 구현
  - ✅ 환경변수 `ADMIN_PASSWORD`와 입력 패스워드 비교 후 httpOnly·secure 쿠키 발급
  - ✅ `lib/auth/admin-auth.ts`에 쿠키 읽기/검증/삭제 유틸 구현
  - ✅ `middleware.ts`에서 `/admin/*` 경로 접근 시 쿠키 검증 및 미인증 사용자 리다이렉트
  - ✅ 로그인 페이지를 Server Action과 연결하고 로그인 후 `/admin`으로 리다이렉트
  - ✅ 로그아웃 버튼이 Server Action을 호출해 쿠키를 삭제하도록 연결
  - **테스트 체크리스트 (Playwright MCP)**:
    - 미인증 상태에서 `/admin` 접근 시 `/admin/login`으로 리다이렉트 확인
    - 잘못된 패스워드 입력 시 에러 메시지가 노출되고 쿠키가 발급되지 않는지 확인
    - 올바른 패스워드 입력 시 쿠키가 설정되고 `/admin`으로 이동하는지 확인
    - 로그아웃 후 다시 `/admin` 접근 시 로그인으로 리다이렉트되는지 확인
    - 쿠키가 httpOnly로 설정되어 JS에서 접근 불가한지 확인

- **Task 009: 어드민 대시보드 데이터 연동 및 URL 복사 기능** ✅ - 완료
  - ✅ `app/admin/page.tsx`를 SSR로 구성해 `get-invoices`로 견적서 목록 조회
  - ✅ `GET /api/admin/invoices` 라우트 구현 (쿠키 검증 후 목록 반환)
  - ✅ `copy-url-button.tsx`에 `navigator.clipboard.writeText`로 공유 URL 복사 로직 추가
  - ✅ 복사 성공/실패 toast 피드백 연결
  - 페이지네이션 또는 정렬 옵션 적용 (필요 시)
  - 더미 데이터 제거 및 실데이터 표시 검증
  - **테스트 체크리스트 (Playwright MCP)**:
    - 인증된 상태에서 견적서 목록이 정상 표시되는지 확인
    - 복사 버튼 클릭 시 클립보드에 정확한 `/invoice/[id]` URL이 저장되는지 확인
    - 미인증 상태에서 `/api/admin/invoices` 호출 시 401/리다이렉트 응답 확인
    - 빈 데이터베이스 상태에서 empty state가 표시되는지 확인

- **Task 010: PDF 다운로드 기능 구현** ✅ - 완료
  - ✅ `html2canvas` + `jspdf` 의존성 추가 및 `lib/pdf/generate-pdf.ts`에 PDF 생성 유틸 구현
  - ✅ `data-pdf-hide` 속성으로 캡처 제외 엘리먼트 처리 (상단 강조선)
  - ✅ `pdf-download-button.tsx`에 클릭 시 PDF 생성·다운로드 로직 연결
  - ✅ A4 사이즈 다중 페이지 분할 구현
  - ✅ 다운로드 파일명 규칙 정의 (`{제목}-{날짜}.pdf`)
  - ✅ PDF 생성 중 로딩 상태/에러 처리 UI 적용 (sonner toast 연동)
  - **테스트 체크리스트 (Playwright MCP)**:
    - PDF 다운로드 버튼 클릭 시 파일 다운로드 이벤트가 발생하는지 확인
    - 생성된 PDF 파일명이 규칙대로 생성되는지 확인
    - 다중 페이지 견적서에서 페이지 분할이 정상 동작하는지 확인
    - 다운로드 진행 중 버튼 비활성화 및 로딩 표시 검증

- **Task 010-1: 핵심 기능 통합 테스트** ✅ - 완료
  - ✅ Playwright MCP로 어드민 로그인 → 목록 조회 → URL 복사 → 견적서 페이지 접근 → PDF 다운로드 전체 플로우 검증
  - ✅ 잘못된 ID, 만료 쿠키, Notion API 오류 등 엣지 케이스 시나리오 테스트
  - ✅ 콘솔/네트워크 에러 모니터링 및 회귀 방지 시나리오 정리
  - ✅ 모바일 뷰포트에서의 견적서 페이지·PDF 동작 확인

### Phase 4: 고급 기능 및 최적화 ✅

- **Task 011: 사용자 경험 향상 및 메타데이터 강화** ✅ - 완료
  - ✅ 견적서 페이지 OpenGraph 이미지(og-image) 및 SNS 공유 메타 최적화
  - ✅ 견적서 페이지 접근 시 last-modified 헤더 또는 ISR 옵션 적용 검토
  - ✅ 어드민 대시보드 검색/필터링 기능 추가 (수신자명, 상태별)
  - ✅ 견적서 상태 시각적 뱃지 시스템 도입 (초안/발송/확정 등)
  - ✅ 다국어 또는 통화 옵션 기반 포맷 확장 가능성 검토

- **Task 012: 성능 최적화 및 보안 강화** ✅ - 완료
  - ✅ Notion API 호출 캐싱 전략 적용 (`unstable_cache` 또는 Next.js Data Cache)
  - ✅ 어드민 쿠키 secret 검증을 위한 HMAC 서명 적용 검토
  - ✅ CSP 헤더 및 보안 미들웨어 설정 (`next.config.ts` headers)
  - ✅ Lighthouse 측정 및 핵심 웹 바이탈(LCP/CLS/INP) 개선
  - ✅ 번들 분석(`@next/bundle-analyzer`)으로 PDF 라이브러리 코드 스플리팅 적용

- **Task 013: 배포 및 운영 환경 구성** ✅ - 완료
  - ✅ Vercel 프로젝트 연결 및 환경변수(NOTION_TOKEN, ADMIN_PASSWORD 등) 설정
  - ✅ 프리뷰/프로덕션 도메인 분리 및 커스텀 도메인 연결
  - ✅ 에러 모니터링 도구(Sentry 또는 Vercel Analytics) 연동
  - ✅ GitHub Actions로 lint/typecheck/build CI 파이프라인 구성
  - ✅ 운영 런북(.md) 작성: 환경변수 재발급, Notion 권한 갱신, 장애 대응 절차

### Phase 5: 고도화 ✅

- **Task 014: 어드민 레이아웃 고도화** ✅ - 완료
  - ✅ 어드민 전용 레이아웃 컴포넌트(`app/admin/(protected)/layout.tsx`) 신설 및 공통 네비게이션 골격 구성
  - ✅ 상단 헤더(`components/admin/admin-header.tsx`) 네비게이션 구현 (로고·테마토글·로그아웃 통합)
  - ✅ 견적서 목록 뷰 전환 기능 구현: 테이블 뷰 ↔ 카드 뷰 토글 버튼 및 상태 보존(localStorage)
  - ✅ `components/admin/invoice-list-card.tsx` 신규 컴포넌트 작성 (카드 그리드 레이아웃, 반응형 컬럼)
  - ✅ 견적서 상태별 필터 탭(`Tabs`) 추가: 전체 / 대기 / 발송됨 / 확정됨 - 클라이언트 측 필터링
  - ✅ 견적서 클릭 시 상세 미리보기 슬라이드 패널(`Sheet`) 구현 - 핵심 메타데이터·총액·공유 URL 표시
  - ✅ `app/admin/login/page.tsx`는 어드민 레이아웃을 적용하지 않도록 라우트 그룹(`(protected)`) 처리

- **Task 015: 다크모드 구현** ✅ - 완료
  - ✅ `next-themes` + `ThemeProvider` 루트 레이아웃 적용 (기존 구현 활용)
  - ✅ TailwindCSS v4 `@custom-variant dark` + `.dark` CSS 변수 (기존 구현 활용)
  - ✅ 다크모드 토글 버튼 컴포넌트(`components/common/theme-toggle.tsx`) 구현 - 라이트/다크/시스템 3단계 토글
  - ✅ 어드민 헤더 우측에 테마 토글 버튼 배치
  - ✅ 시스템 다크모드 자동 감지(`enableSystem`) 및 사용자 선택값 localStorage 저장
  - ✅ 어드민 컴포넌트 다크모드 색상 CSS 변수화 (`bg-card`, `text-foreground` 등)
  - ✅ 견적서 페이지는 항상 라이트모드 강제 (`light` 클래스)
  - ✅ PDF 다운로드 시 라이트모드 강제 적용 (`generate-pdf.ts`에서 `.dark` 클래스 임시 제거)

### Phase 6: 어드민 대시보드 고도화 ✅

- **Task 016: 어드민 대시보드 페이지 구현** ✅ - 완료
  - ✅ 어드민 메인 페이지(`/admin`)를 단순 견적서 목록에서 통합 대시보드로 개편
  - ✅ 사이트 타이틀 "견적서 관리 시스템"으로 변경 (`components/admin/admin-header.tsx`)
  - ✅ 견적서 관리 섹션: 상태별 통계 카드(전체 / 확정됨 / 발송됨 / 초안) UI 및 서버사이드 데이터 집계 구현
  - ✅ 클라이언트 관리 섹션: 인보이스 데이터에서 clientName 기준 그룹화하여 고객사별 견적서 수·총액·최근 발행일 표시
  - ✅ 최근 활동 섹션: issueDate 내림차순 상위 5건 견적서 목록 표시 (상태 뱃지·금액 포함)
  - ✅ `components/admin/dashboard/stat-card.tsx` 신규 작성 (shadcn Card + CardAction, 트렌드 옵션)
  - ✅ `components/admin/dashboard/recent-activity-list.tsx` 신규 작성 (`'대기'` 상태 포함 ActivityItem 타입)
  - ✅ `components/admin/dashboard/client-summary.tsx` 신규 작성 (ClientInfo 타입 export)
  - ✅ 기존 견적서 목록(`InvoiceListWithFilter`) 대시보드 하단에 유지 (필터·뷰 전환 기능 보존)
  - ✅ 반응형 그리드 레이아웃 적용 (`grid-cols-2 sm:grid-cols-4`, `lg:grid-cols-2`) 및 다크모드 지원
  - ✅ `npm run check-all` 통과 및 `main` 브랜치 프로덕션 배포
