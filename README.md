крч всё что может вам понадобится из команд в терминале:

1. npm install
2. npm run dev
ну и по ссылке http://localhost:3000/
;

это если какие-то траблы:
# Очистка кэша
npm cache clean --force
rm -rf node_modules package-lock.json

# Переустановка
npm install

# Если есть проблемы с типами
npm install --save-dev @types/node @types/react @types/react-dom