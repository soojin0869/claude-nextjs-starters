---
description: 'ROADMAP.md에서 완료된 작업을 체크하고 진행 상황을 업데이트합니다'
allowed-tools: ['Read', 'Edit', 'Bash']
---

# /update-roadmap

`docs/ROADMAP.md`의 완료된 Task를 ✅로 마킹하고 Phase 진행 상황을 업데이트합니다.

## 실행 절차

### Step 1 — ROADMAP.md 현재 상태 파악

`docs/ROADMAP.md`를 읽고 미완료 Task 목록을 출력합니다.

미완료 Task는 제목에 ✅가 **없는** 항목입니다:
```
- **Task XXX: 작업명** - 우선순위   ← 미완료
- **Task XXX: 작업명** ✅ - 완료    ← 완료됨 (건너뜀)
```

### Step 2 — 완료할 Task 확인

사용자에게 완료된 Task 번호를 확인합니다. 인자로 전달된 경우 그대로 사용합니다.

```
/update-roadmap 004,005,006
```

인자가 없으면 미완료 Task 목록을 보여주고 질문합니다:
> 어떤 Task를 완료 처리할까요? (예: 004 또는 004,005,006)

### Step 3 — Task 마킹

각 완료 Task에 대해 `docs/ROADMAP.md`를 Edit 도구로 수정합니다.

**Task 제목 패턴 변환:**
```
Before: - **Task 004: 공통 컴포넌트 라이브러리 구현** - 우선순위
After:  - **Task 004: 공통 컴포넌트 라이브러리 구현** ✅ - 완료

Before: - **Task 004: 공통 컴포넌트 라이브러리 구현**
After:  - **Task 004: 공통 컴포넌트 라이브러리 구현** ✅ - 완료
```

**하위 항목 패턴 변환:**
```
Before:   - 항목 설명 텍스트
After:    - ✅ 항목 설명 텍스트
```

이미 ✅가 있는 항목은 건너뜁니다.

### Step 4 — Phase 완료 여부 자동 확인

해당 Task가 속한 Phase의 모든 Task가 완료되었으면 Phase 헤더에도 ✅를 추가합니다:

```
Before: ### Phase 2: UI/UX 완성 (더미 데이터 활용)
After:  ### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅
```

Phase 내 Task 중 하나라도 미완료이면 Phase 헤더는 수정하지 않습니다.

### Step 5 — 완료 메시지 출력

```
✅ Task 004, 005, 006 완료 처리됨
📊 진행 상황: 6/12 Tasks 완료 (Phase 1 ✅, Phase 2 ✅, Phase 3 대기 중)
```

---

## 마킹 규칙 요약

| 항목 | Before | After |
|------|--------|-------|
| Task 제목 (우선순위) | `**Task NNN: 제목** - 우선순위` | `**Task NNN: 제목** ✅ - 완료` |
| Task 제목 (표시 없음) | `**Task NNN: 제목**` | `**Task NNN: 제목** ✅ - 완료` |
| 하위 항목 | `  - 설명` | `  - ✅ 설명` |
| Phase 헤더 (전체 완료 시) | `### Phase N: 제목` | `### Phase N: 제목 ✅` |

## 주의사항

- Task 번호는 3자리 숫자 형식 (004, 005, 006...)
- 이미 ✅ 처리된 Task와 항목은 건너뜀
- 하위 항목 범위: 해당 Task 제목 다음 줄부터 다음 Task 제목 전까지
- 파일 경로: `docs/ROADMAP.md` (프로젝트 루트 기준)
