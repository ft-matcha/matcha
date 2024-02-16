#!/bin/bash

# 실행 명령어
command="openssl s_client -connect elasticsearch:9200 -servername elasticsearch -showcerts -quiet | openssl x509 -fingerprint -sha256 -noout -in /dev/stdin"

# 명령어 실행 및 결과 저장
result=$($command)

# 결과를 환경 변수에 저장
export ELASTICSEARCH_CERT_FINGERPRINT="$result"

# 결과 출력 (선택 사항)
echo "Elasticsearch Certificate Fingerprint: $ELASTICSEARCH_CERT_FINGERPRINT"
