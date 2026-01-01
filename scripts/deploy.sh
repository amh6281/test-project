#!/bin/bash

# MoneySnap 배포 스크립트

set -e  # 에러 발생 시 스크립트 중단

echo "🚀 MoneySnap 배포를 시작합니다..."

# 1. 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# 2. 린터 실행
echo "🔍 코드 검사 중..."
npm run lint

# 3. 빌드
echo "🔨 프로덕션 빌드 중..."
npm run build

# 4. 배포 타입 확인
DEPLOY_TYPE=${1:-vercel}

if [ "$DEPLOY_TYPE" = "vercel" ]; then
    echo "🌐 Vercel로 배포 중..."
    if command -v vercel &> /dev/null; then
        vercel --prod
    else
        echo "❌ Vercel CLI가 설치되지 않았습니다."
        echo "설치: npm i -g vercel"
        exit 1
    fi
elif [ "$DEPLOY_TYPE" = "preview" ]; then
    echo "👀 프리뷰 배포 중..."
    if command -v vercel &> /dev/null; then
        vercel
    else
        echo "❌ Vercel CLI가 설치되지 않았습니다."
        echo "설치: npm i -g vercel"
        exit 1
    fi
else
    echo "❌ 알 수 없는 배포 타입: $DEPLOY_TYPE"
    echo "사용법: ./scripts/deploy.sh [vercel|preview]"
    exit 1
fi

echo "✅ 배포가 완료되었습니다!"

