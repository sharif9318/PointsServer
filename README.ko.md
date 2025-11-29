[English](README.md) | [한국어](README.ko.md)

사용자 포인트 관리, 잔액 추적 및 거래 내역을 관리하는 안전하고 가벼운 RESTful API입니다. NestJS, JWT 인증 및 포괄적인 Swagger 문서로 구축되었습니다.

## 🚀 주요 기능

- **JWT 인증** - 안전한 토큰 기반 인증
- **포인트 관리** - 상세한 내역과 함께 포인트 적립 및 추적
- **잔액 추적** - 실시간 잔액 모니터링
- **거래 내역** - 모든 포인트 활동에 대한 완전한 감사 추적
- **인터랙티브 API 문서** - 내장된 Swagger UI
- **입력 유효성 검사** - class-validator를 사용한 강력한 요청 검증
- **타입 안정성** - 완전한 TypeScript 지원

## 📋 목차

- [시작하기](#시작하기)
- [설치](#설치)
- [구성](#구성)
- [애플리케이션 실행](#애플리케이션-실행)
- [API 문서](#api-문서)
- [API 엔드포인트](#api-엔드포인트)
- [인증](#인증)
- [프로젝트 구조](#프로젝트-구조)
- [테스트](#테스트)
- [기술 스택](#기술-스택)

## 🏁 시작하기

### 사전 요구사항

- Node.js (v16 이상)
- npm 또는 yarn

### 설치

1. 저장소 클론:

```bash
git clone <repository-url>
cd prismx-points-api
```

2. 의존성 설치:

```bash
npm install
```

3. 환경 변수 구성 (선택사항):

```bash
cp .env.example .env
```

## ⚙️ 구성

### 환경 변수

루트 디렉토리에 `.env` 파일 생성:

```env
# 애플리케이션
PORT=3000
NODE_ENV=development

# JWT 구성
JWT_SECRET=OqBuQoraQoraBuOqBolsachi
JWT_EXPIRES_IN=8h

# API 문서
SWAGGER_PATH=/api
```

### JWT 시크릿

**중요:** 프로덕션 환경에서는 기본 JWT 시크릿을 변경하세요. `src/auth/constants.ts`에서 시크릿을 업데이트하세요:

```typescript
export const jwtConstants = {
  secret: '여기에-안전한-비밀키-입력',
};
```

## 🎯 애플리케이션 실행

### 개발 모드

```bash
npm run start:dev
```

API는 `http://localhost:3000`에서 사용할 수 있습니다.

### 프로덕션 모드

```bash
# 애플리케이션 빌드
npm run build

# 프로덕션 서버 시작
npm run start:prod
```

### 감시 모드

```bash
npm run start:dev
```

## 📚 API 문서

### Swagger UI

다음 주소에서 인터랙티브 API 문서에 접근하세요:

```
http://localhost:3000/api
```

Swagger UI는 다음을 제공합니다:

- 완전한 API 레퍼런스
- 인터랙티브 요청 테스트
- 스키마 정의
- 예제 요청 및 응답
- 인증 테스트

### OpenAPI 명세

OpenAPI 명세 다운로드:

```
http://localhost:3000/api-json
```

## 🔌 API 엔드포인트

### 인증

#### POST /auth/login

사용자를 인증하고 JWT 토큰을 받습니다.

**요청:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**응답:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 28800
}
```

### 포인트 관리

모든 포인트 엔드포인트는 JWT 인증이 필요합니다. Authorization 헤더에 토큰을 포함하세요:

```
Authorization: Bearer <your_jwt_token>
```

#### POST /api/earn

사용자의 잔액에 포인트를 추가합니다.

**요청:**

```json
{
  "amount": 100,
  "note": "온보딩 튜토리얼 완료"
}
```

**응답:**

```json
{
  "message": "Points earned successfully",
  "newBalance": 1250
}
```

#### GET /api/balance

현재 포인트 잔액을 조회합니다.

**응답:**

```json
{
  "balance": 1250
}
```

#### GET /api/history

거래 내역을 조회합니다.

**응답:**

```json
{
  "transactions": [
    {
      "type": "earn",
      "amount": 100,
      "note": "온보딩 튜토리얼 완료",
      "date": "2025-11-30T10:30:00.000Z"
    }
  ]
}
```

## 🔐 인증

### 토큰 받기

1. 유효한 자격 증명으로 `/auth/login` 엔드포인트 호출
2. 응답에서 JWT 토큰 수신
3. 후속 요청에 토큰 포함

### 토큰 사용하기

Authorization 헤더에 JWT 토큰을 포함하세요:

```bash
curl -H "Authorization: Bearer <your_token>" \
  http://localhost:3000/api/balance
```

### Swagger UI에서

1. "Authorize" 버튼(🔒) 클릭
2. JWT 토큰 입력
3. "Authorize" 클릭
4. 이제 모든 요청에 토큰이 포함됩니다

### 데모 자격 증명

테스트 목적으로 다음을 사용하세요:

- **사용자명:** demo
- **비밀번호:** (임의의 값)

**참고:** 이것은 데모 구현입니다. 프로덕션에서는 적절한 사용자 데이터베이스와 통합하세요.

## 📁 프로젝트 구조

```
src/
├── auth/                   # 인증 모듈
│   ├── dto/               # 데이터 전송 객체
│   │   ├── login.dto.ts
│   │   ├── login-response.dto.ts
│   │   └── error-response.dto.ts
│   ├── auth.controller.ts # 인증 엔드포인트
│   ├── auth.service.ts    # 인증 로직
│   ├── auth.module.ts     # 인증 모듈 구성
│   ├── jwt.strategy.ts    # JWT 전략
│   ├── jwt-auth.guard.ts  # JWT 가드
│   └── constants.ts       # JWT 상수
├── points/                 # 포인트 관리 모듈
│   ├── dto/               # 데이터 전송 객체
│   │   ├── earn.dto.ts
│   │   ├── earn-response.dto.ts
│   │   ├── balance-response.dto.ts
│   │   ├── transaction.dto.ts
│   │   └── history-response.dto.ts
│   ├── points.controller.ts
│   ├── points.service.ts
│   └── points.module.ts
├── app.module.ts          # 루트 모듈
└── main.ts                # 애플리케이션 진입점
```

## 🧪 테스트

### 테스트 실행

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

### cURL을 사용한 수동 테스트

**로그인:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

**포인트 적립:**

```bash
curl -X POST http://localhost:3000/api/earn \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"amount":100,"note":"테스트 거래"}'
```

**잔액 조회:**

```bash
curl http://localhost:3000/api/balance \
  -H "Authorization: Bearer <your_token>"
```

## 🛠️ 기술 스택

- **프레임워크:** NestJS 10.x
- **언어:** TypeScript 5.x
- **인증:** Passport JWT
- **유효성 검사:** class-validator, class-transformer
- **문서:** Swagger/OpenAPI 3.0
- **런타임:** Node.js 16+

### 주요 의존성

```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/jwt": "^10.0.0",
  "@nestjs/passport": "^10.0.0",
  "@nestjs/swagger": "^7.0.0",
  "passport-jwt": "^4.0.1",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1"
}
```

## 🔒 보안 고려사항

### 프로덕션 배포 시

1. **JWT 시크릿 변경**
   - 강력하고 무작위로 생성된 시크릿 사용
   - 환경 변수에 저장
   - 버전 관리 시스템에 시크릿을 커밋하지 마세요

2. **CORS 활성화**

   ```typescript
   app.enableCors({
     origin: 'https://your-frontend-domain.com',
     credentials: true,
   });
   ```

3. **속도 제한**

   ```bash
   npm install @nestjs/throttler
   ```

4. **보안 헤더를 위한 Helmet**

   ```bash
   npm install helmet
   ```

5. **입력 살균**
   - class-validator를 통해 이미 구현됨
   - 사용자 입력에 대한 추가 살균 고려

6. **HTTPS**
   - 프로덕션에서는 항상 HTTPS 사용
   - HTTPS 리다이렉트 강제

## 📝 API 응답 코드

| 코드 | 의미                  | 설명                           |
| ---- | --------------------- | ------------------------------ |
| 200  | OK                    | 요청 성공                      |
| 201  | Created               | 리소스가 성공적으로 생성됨     |
| 400  | Bad Request           | 잘못된 요청 형식 또는 매개변수 |
| 401  | Unauthorized          | 인증 누락 또는 유효하지 않음   |
| 403  | Forbidden             | 권한 불충분                    |
| 404  | Not Found             | 리소스를 찾을 수 없음          |
| 500  | Internal Server Error | 서버 측 오류                   |

## 🤝 기여하기

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

## 🙏 감사의 말

- 놀라운 프레임워크를 제공한 NestJS 팀
- 인증을 위한 Passport.js
- API 문서를 위한 Swagger UI
