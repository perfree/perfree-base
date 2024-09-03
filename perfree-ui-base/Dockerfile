FROM registry.cn-hangzhou.aliyuncs.com/perfree/perfree-nginx:1.19.1
# 创建必要的目录和设置时区
RUN mkdir /usr/share/nginx/dist \
    && rm -rf /etc/nginx/nginx.conf \
    && /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone

# 复制 Nginx 配置模板和静态文件
COPY ./nginx.conf /etc/nginx/nginx.conf.template
COPY ./dist/ /usr/share/nginx/dist
# 将命令设置为替换环境变量并启动 Nginx
CMD envsubst '$SERVER_ADDR_IP $SERVER_ADDR_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
EXPOSE 80
