FROM registry.cn-hangzhou.aliyuncs.com/perfree/perfree-jre:21-jre
MAINTAINER perfree <perfree@126.com>

ADD target/perfree-server.zip perfree-server.zip
RUN unzip perfree-server.zip -d /
RUN rm perfree-server.zip
ENV TZ=Asia/Shanghai

## 设置 JAVA_OPTS 环境变量，可通过 docker run -e "JAVA_OPTS=" 进行覆盖
ENV JAVA_OPTS="-Xms512m -Xmx512m -Djava.security.egd=file:/dev/./urandom"
## 应用参数
ENV ARGS=""
CMD cd perfree-server && java ${JAVA_OPTS} -jar perfree-server.jar $ARGS