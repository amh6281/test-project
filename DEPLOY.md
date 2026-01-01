# 배포 가이드

MoneySnap 프로젝트 배포 방법을 안내합니다.

## 배포 옵션

### 1. Vercel 배포 (권장)

#### 방법 A: Vercel CLI 사용

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 프로덕션 배포
npm run deploy

# 또는 프리뷰 배포
npm run deploy:preview
```

#### 방법 B: Vercel 웹 UI 사용

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결 또는 수동 업로드
4. 자동으로 빌드 및 배포

#### 방법 C: 배포 스크립트 사용

```bash
# 프로덕션 배포
./scripts/deploy.sh vercel

# 프리뷰 배포
./scripts/deploy.sh preview
```

### 2. GitHub Actions 자동 배포

1. Vercel에서 프로젝트 생성 후 다음 정보 확인:
   - `VERCEL_TOKEN`: Vercel 대시보드 → Settings → Tokens
   - `ORG_ID`: Vercel 프로젝트 설정에서 확인
   - `PROJECT_ID`: Vercel 프로젝트 설정에서 확인

2. GitHub 저장소에 Secrets 추가:
   - Settings → Secrets and variables → Actions
   - 위 세 가지 값을 추가

3. `main` 또는 `master` 브랜치에 푸시하면 자동 배포

### 3. 로컬 빌드 테스트

```bash
# 프로덕션 빌드 및 로컬 실행
npm run deploy:local
```

### 4. 환경 변수

현재 프로젝트는 서버가 없으므로 환경 변수가 필요하지 않습니다.

## 배포 체크리스트

배포 전 확인사항:

- [ ] 코드 린터 통과 (`npm run lint`)
- [ ] 프로덕션 빌드 성공 (`npm run build`)
- [ ] 로컬에서 정상 작동 확인 (`npm run start`)
- [ ] 모든 기능 테스트 완료

## 빌드 최적화

- Next.js가 자동으로 최적화 수행
- 이미지 최적화는 현재 사용하지 않음
- 정적 자산은 자동으로 CDN에 배포

## 트러블슈팅

### 빌드 실패 시

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 클리어
rm -rf .next
npm run build
```

### Vercel 배포 실패 시

- Vercel 대시보드의 Build Logs 확인
- 로컬에서 `npm run build` 성공 여부 확인
- Node.js 버전 확인 (package.json의 engines 필드)

