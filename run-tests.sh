#!/bin/bash
set -e

echo "=========================================="
echo "INICIANDO APPIUM"
echo "=========================================="
npx appium --port 4723 --log-level info > appium.log 2>&1 &
APPIUM_PID=$!

echo "Aguardando Appium iniciar..."
sleep 8

echo "=========================================="
echo "EXECUTANDO TESTES"
echo "=========================================="
npm test
TEST_EXIT=$?

echo "=========================================="
echo "FINALIZANDO"
echo "=========================================="
kill $APPIUM_PID 2>/dev/null || true

exit $TEST_EXIT