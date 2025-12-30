---
sidebar_position: 1
---

# Организация игры

Различные способы организации игры в ДНД.

## Удалённая игра

Для организации удалённой игры с использованием Foundry VTT можно настроить удалённый сервер, который будет предоставлять доступ к вашему локальному инстансу Foundry через интернет с поддержкой SSL.

### Архитектура решения

Архитектура использует WireGuard туннель через Pangolin для безопасного соединения между локальной машиной и удалённым сервером:

- **Локальная машина**: Запускает Foundry VTT и Pangolin клиент, создающий туннель до удалённого сервера
- **Удалённый сервер**: Запускает Caddy (reverse proxy с SSL) и Pangolin сервер, принимающий соединения и проксирующий трафик на локальную машину через туннель

**Преимущества:**
- Foundry VTT работает локально, все данные остаются на вашем компьютере
- Доступ через удалённый домен с автоматическим SSL-сертификатом
- Безопасное соединение через WireGuard туннель

**Схема работы:**

```text
[Игроки] 
    ↓ HTTPS
[Удалённый сервер: Caddy :443] 
    ↓ HTTP через туннель
[Удалённый сервер: Pangolin Server] 
    ↓ WireGuard туннель
[Интернет] 
    ↓ WireGuard туннель
[Локальная машина: Pangolin Client] 
    ↓ Локальная сеть
[Локальная машина: Foundry VTT :30000]
```

### Настройка удалённого сервера

Для начала необходимо арендовать виртуальный сервер (VPS) и настроить его.

#### Создание VPS сервера

1. Зарегистрируйтесь на [Timeweb](https://timeweb.com) и создайте новый облачный сервер
2. Следуйте инструкции: [Создание нового сервера в Timeweb](https://timeweb.cloud/docs/cloud-servers/manage-servers/create-server)
3. Рекомендуется выбрать Ubuntu 20.04 или новее в качестве операционной системы

#### Оформление статического IP-адреса

После создания сервера необходимо добавить статический IP-адрес:

1. В панели управления Timeweb перейдите в раздел "Сеть"
2. Добавьте выделенный IP-адрес к вашему серверу
3. Подробнее: [Настройка статического IP в Timeweb](https://timeweb.cloud/docs/unix-guides/setting-static-IP)

#### Покупка домена и создание поддомена

1. Приобретите домен через Timeweb или другого регистратора
2. Создайте поддомен (например, `foundry.yourdomain.ru`) в панели управления доменами
3. Настройте A-запись поддомена на IP-адрес вашего VPS сервера
4. Инструкция: [Как подключить домен к VDS в Timeweb](https://timeweb.com/ru/blog/authors/constant/articles/kak-podklyuchit-domen-k-vds/)

### Подключение к удалённому серверу

Для подключения к серверу по SSH используйте следующие ресурсы:

- **Linux**: Используйте встроенную команду `ssh` в терминале
- **macOS**: Используйте встроенную команду `ssh` в Terminal.app
- **Windows**: Используйте PuTTY или встроенный OpenSSH клиент (Windows 10+)

Подробные инструкции:
- [Подключение по SSH в Linux](https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh)
- [Подключение по SSH в macOS](https://support.apple.com/ru-ru/guide/terminal/tn24571/mac)
- [Подключение по SSH в Windows](https://www.ssh.com/academy/ssh/putty)

### Установка зависимостей на сервере

После подключения к серверу по SSH выполните установку необходимых зависимостей.

Создайте файл `install-deps.sh` на сервере:

```bash
nano ~/install-deps.sh
```

Скопируйте и вставьте следующий скрипт:

```bash title="install-deps.sh"
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
```

Сделайте скрипт исполняемым и запустите:

```bash
chmod +x ~/install-deps.sh
~/install-deps.sh
```

### Установка Docker и Caddy через Ansible

Для автоматической установки Docker и Caddy используйте Ansible playbook.

Создайте файл `install-docker-caddy.yml` на сервере:

```bash
nano ~/install-docker-caddy.yml
```

Скопируйте и вставьте следующий Ansible playbook (все пути используют относительные пути от домашней директории `~`):

```yaml title="install-docker-caddy.yml"
---
# Ansible playbook для установки Docker и Caddy на удалённом сервере
# Все пути используют относительные пути от домашней директории пользователя (~)

- hosts: localhost
  become: true
  vars:
    user_home: "{{ ansible_env.HOME }}"
    
  tasks:
    - name: Обновление списка пакетов
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Установка необходимых пакетов для Docker
      apt:
        name:
          - apt-transport-https
          - ca-certificates
          - curl
          - gnupg
          - lsb-release
          - software-properties-common
        state: present

    - name: Добавление GPG-ключа Docker
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        state: present

    - name: Определение кодового имени дистрибутива
      shell: lsb_release -cs
      register: release_codename
      changed_when: false

    - name: Добавление репозитория Docker
      apt_repository:
        repo: "deb [arch=amd64] https://download.docker.com/linux/ubuntu {{ release_codename.stdout }} stable"
        state: present

    - name: Установка Docker
      apt:
        name:
          - docker-ce
          - docker-ce-cli
          - containerd.io
          - docker-buildx-plugin
          - docker-compose-plugin
        state: present
        update_cache: yes

    - name: Добавление текущего пользователя в группу docker
      user:
        name: "{{ ansible_user }}"
        groups: docker
        append: true

    - name: Запуск и включение Docker
      systemd:
        name: docker
        enabled: true
        state: started

    - name: Установка зависимостей для Caddy
      apt:
        name:
          - debian-keyring
          - debian-archive-keyring
          - apt-transport-https
        state: present

    - name: Добавление GPG-ключа Caddy
      shell: |
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
      args:
        creates: /usr/share/keyrings/caddy-stable-archive-keyring.gpg

    - name: Добавление репозитория Caddy
      shell: |
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
      args:
        creates: /etc/apt/sources.list.d/caddy-stable.list

    - name: Обновление списка пакетов после добавления репозитория Caddy
      apt:
        update_cache: yes

    - name: Установка Caddy
      apt:
        name: caddy
        state: present

    - name: Проверка установки Docker
      command: docker --version
      register: docker_version
      changed_when: false

    - name: Проверка установки Docker Compose
      command: docker compose version
      register: docker_compose_version
      changed_when: false

    - name: Проверка установки Caddy
      command: caddy version
      register: caddy_version
      changed_when: false

    - name: Вывод информации об установленных версиях
      debug:
        msg:
          - "Docker установлен: {{ docker_version.stdout }}"
          - "Docker Compose установлен: {{ docker_compose_version.stdout }}"
          - "Caddy установлен: {{ caddy_version.stdout }}"
          - ""
          - "ВАЖНО: Перезайдите в систему или выполните 'newgrp docker' для применения изменений группы пользователя"
```

Затем выполните:

```bash
ansible-playbook ~/install-docker-caddy.yml
```

После выполнения playbook перезайдите в систему (или выполните `newgrp docker`) для применения изменений группы пользователя.

### Настройка Docker Compose

#### Удалённый сервер

На удалённом сервере создайте файл `docker-compose.yml` в домашней директории:

```bash
nano ~/docker-compose.yml
```

Скопируйте и вставьте следующую конфигурацию:

```yaml title="docker-compose.yml (удалённый сервер)"
version: '3.8'

# Docker Compose конфигурация для удалённого сервера
# Содержит Caddy (reverse proxy с SSL) и Pangolin сервер (WireGuard)

services:
  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - foundry-network
    healthcheck:
      test: ["CMD", "caddy", "version"]
      interval: 30s
      timeout: 10s
      retries: 3

  pangolin:
    # ВАЖНО: Замените на актуальный образ Pangolin из Docker Hub
    # Проверьте документацию Pangolin для правильного названия образа
    # Пример: pangolin/pangolin:latest или fosrl/pangolin:latest
    image: pangolin/pangolin:latest
    container_name: pangolin-server
    restart: unless-stopped
    # Порты WireGuard (51820 - стандартный порт WireGuard)
    ports:
      - "51820:51820/udp"
    volumes:
      - ./pangolin-config:/config
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.ip_forward=1
    networks:
      - foundry-network
    environment:
      # Настройте переменные окружения согласно документации Pangolin
      - PANGOLIN_MODE=server
    healthcheck:
      test: ["CMD", "wg", "show"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  caddy_data:
  caddy_config:

networks:
  foundry-network:
    driver: bridge
```

**Что нужно изменить:**
- Замените `pangolin/pangolin:latest` на правильное название образа Pangolin из Docker Hub (проверьте документацию на [pangolin.net](https://pangolin.net))
- Настройте переменные окружения `PANGOLIN_MODE` и другие согласно документации Pangolin

#### Локальная машина

На локальной машине создайте директорию и файл `docker-compose.yml`:

```bash
mkdir -p ~/foundry-remote
cd ~/foundry-remote
nano docker-compose.yml
```

Скопируйте и вставьте следующую конфигурацию:

```yaml title="docker-compose.yml (локальная машина)"
version: '3.8'

# Docker Compose конфигурация для локальной машины
# Содержит Foundry VTT и Pangolin клиент (WireGuard)
# Volume с данными Foundry позволяет видеть изменения файлов в реальном времени

services:
  foundry:
    image: felddy/foundryvtt:latest
    container_name: foundry
    restart: unless-stopped
    ports:
      - "30000:30000"
    volumes:
      # Volume с данными Foundry - все файлы доступны локально
      - ./foundry-data:/data
    environment:
      # ВАЖНО: Замените на ваши реальные значения
      # Получите FOUNDRY_LICENSE_KEY из вашей учётной записи Foundry
      - FOUNDRY_LICENSE_KEY=${FOUNDRY_LICENSE_KEY}
      - FOUNDRY_USERNAME=${FOUNDRY_USERNAME:-admin}
      - FOUNDRY_PASSWORD=${FOUNDRY_PASSWORD}
      - FOUNDRY_ADMIN_KEY=${FOUNDRY_ADMIN_KEY}
    networks:
      - foundry-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:30000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  pangolin:
    # ВАЖНО: Замените на актуальный образ Pangolin из Docker Hub
    # Проверьте документацию Pangolin для правильного названия образа
    # Пример: pangolin/pangolin:latest или fosrl/pangolin:latest
    image: pangolin/pangolin:latest
    container_name: pangolin-client
    restart: unless-stopped
    volumes:
      - ./pangolin-config:/config
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.ip_forward=1
    networks:
      - foundry-network
    environment:
      # Настройте переменные окружения согласно документации Pangolin
      - PANGOLIN_MODE=client
      # Укажите адрес удалённого сервера Pangolin
      - PANGOLIN_SERVER=${PANGOLIN_SERVER}
    depends_on:
      - foundry
    healthcheck:
      test: ["CMD", "wg", "show"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  foundry-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ./foundry-data

networks:
  foundry-network:
    driver: bridge
```

**Что нужно изменить:**
- Создайте файл `.env` в той же директории с переменными окружения:
  ```bash
  nano ~/foundry-remote/.env
  ```
  Добавьте:
  ```
  FOUNDRY_LICENSE_KEY=ваш_лицензионный_ключ
  FOUNDRY_USERNAME=admin
  FOUNDRY_PASSWORD=ваш_пароль
  FOUNDRY_ADMIN_KEY=ваш_админ_ключ
  PANGOLIN_SERVER=адрес_удалённого_сервера_pangolin
  ```
- Замените `pangolin/pangolin:latest` на правильное название образа Pangolin из Docker Hub
- Настройте переменные окружения `PANGOLIN_MODE` и `PANGOLIN_SERVER` согласно документации Pangolin

### Настройка Caddy

Создайте файл `Caddyfile` на удалённом сервере в той же директории, где находится `docker-compose.yml`:

```bash
nano ~/Caddyfile
```

Скопируйте и вставьте следующую конфигурацию:

```caddyfile title="Caddyfile"
# Конфигурация Caddy для reverse proxy Foundry VTT
# 
# ИНСТРУКЦИИ ПО НАСТРОЙКЕ:
# 1. Замените foundry.yourdomain.ru на ваш поддомен
# 2. Замените your_email@example.com на ваш email для получения SSL-сертификата
# 3. Замените 10.0.0.2 на IP-адрес Foundry VTT в WireGuard туннеле
#    (этот IP будет доступен после настройки Pangolin туннеля)
#
# Для определения IP-адреса Foundry в туннеле:
# - На локальной машине выполните: docker exec pangolin-client wg show
# - Найдите IP-адрес интерфейса WireGuard (обычно начинается с 10.0.0.x)
# - Используйте этот IP в строке reverse_proxy ниже

foundry.yourdomain.ru {
    # Reverse proxy на Foundry VTT через WireGuard туннель
    # IP-адрес должен быть IP-адресом контейнера foundry в туннеле Pangolin
    reverse_proxy 10.0.0.2:30000 {
        # Настройки для WebSocket (необходимо для Foundry VTT)
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
        
        # Таймауты для длительных соединений
        transport http {
            dial_timeout 10s
            response_header_timeout 30s
        }
    }
    
    # Автоматическое получение SSL-сертификата от Let's Encrypt
    tls your_email@example.com {
        # Использование DNS-проверки (опционально, если порты 80/443 недоступны)
        # dns cloudflare {env.CLOUDFLARE_API_TOKEN}
    }
    
    # Логирование
    log {
        output file /var/log/caddy/foundry.log
        format json
    }
    
    # Сжатие для улучшения производительности
    encode gzip zstd
}

# Дополнительные настройки (опционально)
# Можно добавить другие поддомены или настройки безопасности
```

**Что нужно изменить:**
1. Замените `foundry.yourdomain.ru` на ваш реальный поддомен
2. Замените `your_email@example.com` на ваш email для получения SSL-сертификата от Let's Encrypt
3. Замените `10.0.0.2` на IP-адрес Foundry VTT в WireGuard туннеле (этот IP будет известен после настройки Pangolin туннеля)

**Как узнать IP-адрес Foundry в туннеле:**
После настройки Pangolin туннеля на локальной машине выполните:
```bash
docker exec pangolin-client wg show
```
Найдите IP-адрес интерфейса WireGuard (обычно начинается с `10.0.0.x`) и используйте его в строке `reverse_proxy` в Caddyfile.

### Настройка Pangolin

Pangolin — это сервис для создания WireGuard туннелей. Подробная документация доступна на [pangolin.net](https://pangolin.net).

#### На удалённом сервере (Pangolin сервер)

1. Запустите Docker Compose с Pangolin сервером
2. Следуйте инструкциям Pangolin для настройки сервера
3. Запишите IP-адрес в туннеле, который будет использоваться для reverse proxy

#### На локальной машине (Pangolin клиент)

1. Запустите Docker Compose с Pangolin клиентом
2. Настройте подключение к удалённому серверу через Pangolin
3. Убедитесь, что туннель установлен и работает

### Порядок запуска

1. **На удалённом сервере:**
   - Установите зависимости (`install-deps.sh`)
   - Установите Docker и Caddy (`install-docker-caddy.yml`)
   - Настройте `Caddyfile` с вашим доменом
   - Запустите `docker-compose up -d` с конфигурацией для удалённого сервера
   - Настройте Pangolin сервер

2. **На локальной машине:**
   - Установите Docker и Docker Compose (если ещё не установлены)
   - Настройте `docker-compose.yml` с конфигурацией для локальной машины
   - Запустите `docker-compose up -d`
   - Настройте Pangolin клиент для подключения к удалённому серверу

3. **Проверка:**
   - Убедитесь, что WireGuard туннель установлен
   - Проверьте доступность Foundry VTT через ваш домен
   - Убедитесь, что SSL-сертификат получен автоматически

### Troubleshooting

#### Проблема: Caddy не получает SSL-сертификат

**Симптомы:** В логах Caddy ошибки о невозможности получить сертификат Let's Encrypt

**Решения:**
1. Проверьте, что домен правильно настроен и указывает на IP сервера:
   ```bash
   dig foundry.yourdomain.ru
   # или
   nslookup foundry.yourdomain.ru
   ```
2. Убедитесь, что порты 80 и 443 открыты в firewall:
   ```bash
   sudo ufw status
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```
3. Проверьте логи Caddy:
   ```bash
   docker-compose logs caddy
   ```
4. Убедитесь, что домен доступен из интернета (не только локально)

#### Проблема: Не удаётся подключиться через WireGuard туннель

**Симптомы:** Туннель не устанавливается, нет связи между клиентом и сервером

**Решения:**
1. Проверьте логи Pangolin на обеих сторонах:
   ```bash
   # На локальной машине
   docker-compose logs pangolin-client
   
   # На удалённом сервере
   docker-compose logs pangolin-server
   ```
2. Убедитесь, что порт WireGuard (51820/udp) открыт на удалённом сервере:
   ```bash
   sudo ufw allow 51820/udp
   ```
3. Проверьте статус туннеля:
   ```bash
   # На локальной машине
   docker exec pangolin-client wg show
   ```
4. Проверьте конфигурацию Pangolin - убедитесь, что ключи и настройки совпадают

#### Проблема: Foundry недоступен через домен

**Симптомы:** Домен открывается, но Foundry VTT не загружается или показывает ошибку

**Решения:**
1. Проверьте, что туннель установлен и работает:
   ```bash
   docker exec pangolin-client wg show
   # Должен показать активный интерфейс с IP-адресом
   ```
2. Проверьте логи Caddy:
   ```bash
   docker-compose logs caddy
   ```
3. Убедитесь, что в Caddyfile указан правильный IP-адрес Foundry в туннеле:
   - Найдите IP-адрес интерфейса WireGuard (обычно начинается с 10.0.0.x)
   - Обновите Caddyfile с правильным IP
   - Перезапустите Caddy: `docker-compose restart caddy`
4. Проверьте, что Foundry доступен локально:
   ```bash
   curl http://localhost:30000
   # или
   docker exec foundry curl http://localhost:30000
   ```
5. Проверьте сетевую связность через туннель:
   ```bash
   # На удалённом сервере, попробуйте подключиться к Foundry через туннель
   ping 10.0.0.2  # замените на IP Foundry в туннеле
   curl http://10.0.0.2:30000  # замените на IP Foundry в туннеле
   ```

#### Проблема: Docker не запускается или контейнеры падают

**Решения:**
1. Проверьте статус Docker:
   ```bash
   sudo systemctl status docker
   ```
2. Проверьте логи контейнеров:
   ```bash
   docker-compose logs
   ```
3. Убедитесь, что у пользователя есть права на Docker:
   ```bash
   groups  # должен содержать docker
   # Если нет, выполните: sudo usermod -aG docker $USER
   # Затем перезайдите в систему
   ```
4. Проверьте доступное место на диске:
   ```bash
   df -h
   ```

#### Проблема: Медленная работа или таймауты

**Решения:**
1. Проверьте загрузку сети и CPU:
   ```bash
   htop
   iftop  # если установлен
   ```
2. Увеличьте таймауты в Caddyfile (уже включены в пример)
3. Проверьте качество интернет-соединения на локальной машине
4. Убедитесь, что удалённый сервер имеет достаточные ресурсы

#### Полезные команды для диагностики

```bash
# Проверка статуса всех контейнеров
docker-compose ps

# Просмотр логов всех сервисов
docker-compose logs -f

# Проверка сетевых подключений
docker network inspect foundry-network

# Проверка портов
sudo netstat -tulpn | grep -E '80|443|30000|51820'

# Проверка firewall
sudo ufw status verbose
```
 