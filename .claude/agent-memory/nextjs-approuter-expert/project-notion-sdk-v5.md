---
name: project-notion-sdk-v5
description: @notionhq/client v5에서 databases.query가 dataSources.query로 변경된 사실 — 목록 조회 시 반드시 dataSources.query 사용
metadata:
  type: project
---

@notionhq/client v5.22.0이 설치되어 있으며, 기존 `databases.query` API가 제거되었습니다.

- `databases` 네임스페이스: `retrieve`, `create`, `update`만 존재
- 페이지 목록 조회(구 databases.query): `dataSources.query({ data_source_id: NOTION_DATABASE_ID, sorts: [...] })`로 대체
- `isFullPage`, `isFullBlock` 헬퍼로 PartialResponse 필터링 필수
- 삭제 여부 확인: `page.archived` deprecated → `page.in_trash` 사용

**Why:** v5 이전 코드나 공식 문서의 v4 예제를 그대로 쓰면 TypeScript 에러 발생.

**How to apply:** `getInvoices` 등 목록 조회 구현 시 `notion.dataSources.query` 사용. [[project-notion-mappers]]
