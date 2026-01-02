#!/bin/bash
# Скрипт установки зависимостей для настройки удалённого сервера
# Устанавливает Ansible, Git и Python3

set -e

echo "Обновление списка пакетов..."
sudo apt update

echo "Установка зависимостей..."
sudo apt install -y ansible git python3 python3-pip

echo "Проверка установленных версий..."
echo "Ansible: $(ansible --version | head -n 1)"
echo "Git: $(git --version)"
echo "Python: $(python3 --version)"

echo "Установка завершена успешно!"



