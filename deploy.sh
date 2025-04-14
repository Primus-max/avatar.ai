#!/usr/bin/env sh

# Прерывать при ошибках
set -e

# Сборка проекта с пометкой, что это для GitHub Pages
GITHUB_PAGES=true npm run build

# Переход в папку сборки
cd dist

# Копирование файла .nojekyll
touch .nojekyll

# Если вы деплоите на пользовательский домен
# echo 'www.example.com' > CNAME

# Инициализация Git и пуш
git init
git add -A
git commit -m 'deploy: github pages'

# Если вы деплоите в https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# Если вы деплоите в https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/avatar.ai.git main:gh-pages

cd - 